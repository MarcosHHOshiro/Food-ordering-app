import Stripe from "stripe";
import { Request, Response } from "express";
import Restaurant, { MenuItemType } from "../models/restaurant";
import Order from "../models/order";

const STRIPE = new Stripe(process.env.STRIPE_API_KEY as string, {
    apiVersion: "2025-12-15.clover",
});

const FRONTEND_URL = process.env.FRONTEND_URL as string;
const STRIPE_ENDPOINT_SECRET = process.env.STRIPE_WEBHOOK_SECRET as string;

const getMyOrders = async (req: Request, res: Response) => {
    try {
        const orders = await Order.find({ user: req.userId })
            .populate("restaurant")
            .populate("user");

        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "something went wrong" });
    }
};

type CheckoutSessionRequest = {
    cartItems: {
        menuItemId: string;
        name: string;
        quantity: string;
    }[];
    deliveryDetails: {
        email: string;
        name: string;
        addressLine1: string;
        city: string;
    };
    restaurantId: string;
};

const stripeWebhookHandler = async (req: Request, res: Response) => {
    let event: Stripe.Event;

    try {
        const sig = req.headers["stripe-signature"] as string;
        event = STRIPE.webhooks.constructEvent(req.body, sig, STRIPE_ENDPOINT_SECRET);
    } catch (error: any) {
        console.log(error);
        return res.status(400).send(`Webhook error: ${error.message}`);
    }

    // ✅ Só tratamos o que interessa pro pedido
    if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;

        const orderId = session.metadata?.orderId;
        if (!orderId) {
            console.log("checkout.session.completed without metadata.orderId");
            return res.status(200).send(); // ✅ nunca 404 (Stripe vai re-tentar)
        }

        const order = await Order.findById(orderId);
        if (!order) {
            console.log("Order not found yet:", orderId);
            return res.status(200).send(); // ✅ pode chegar antes, então só aceita
        }

        order.totalAmount = session.amount_total ?? 0;
        order.status = "paid";
        await order.save();

        console.log("Order updated to paid:", orderId);
    }

    return res.status(200).send();
};

const createCheckoutSession = async (req: Request, res: Response) => {
    try {
        const checkoutSessionRequest: CheckoutSessionRequest = req.body;

        // Basic validation of incoming payload
        if (!checkoutSessionRequest?.restaurantId) {
            return res.status(400).json({ message: "restaurantId is required" });
        }
        if (!Array.isArray(checkoutSessionRequest.cartItems) || !checkoutSessionRequest.cartItems.length) {
            return res.status(400).json({ message: "cartItems is required" });
        }

        const restaurant = await Restaurant.findById(checkoutSessionRequest.restaurantId);
        if (!restaurant) {
            throw new Error("Restaurant not found");
        }

        const newOrder = new Order({
            restaurant: restaurant,
            user: req.userId,
            status: "pending_payment", // ✅ melhor que "placed" antes do pagamento
            deliveryDetails: checkoutSessionRequest.deliveryDetails,
            cartItems: checkoutSessionRequest.cartItems,
            createdAt: new Date(),
        });

        const lineItems = createLineItems(checkoutSessionRequest, restaurant.menuItems);

        // save order before creating session (prevents webhook arriving before order exists)
        await newOrder.save();

        let session;
        try {
            session = await createSession(
                lineItems,
                newOrder._id.toString(),
                restaurant.deliveryPrice,
                restaurant._id.toString()
            );
        } catch (stripeErr: any) {
            console.error("Stripe create session error:", stripeErr?.message ?? stripeErr);
            // include stripe raw message when available but avoid leaking secrets
            const errMessage = stripeErr?.raw?.message ?? stripeErr?.message ?? "Error creating stripe session";
            return res.status(502).json({ message: errMessage });
        }

        if (!session || !session.url) {
            console.error("Stripe session missing url", { session });
            return res.status(500).json({ message: "Error creating stripe session" });
        }

        return res.json({ url: session.url });
    } catch (error: any) {
        console.error("createCheckoutSession error:", error?.message ?? error);
        return res.status(500).json({ message: error?.raw?.message ?? error.message ?? "Internal server error" });
    }
};

const createLineItems = (
    checkoutSessionRequest: CheckoutSessionRequest,
    menuItems: MenuItemType[]
) => {
    const lineItems = checkoutSessionRequest.cartItems.map((cartItem) => {
        const menuItem = menuItems.find(
            (item) => item._id.toString() === cartItem.menuItemId.toString()
        );

        if (!menuItem) {
            throw new Error(`Menu item not found: ${cartItem.menuItemId}`);
        }

        const line_item: Stripe.Checkout.SessionCreateParams.LineItem = {
            price_data: {
                currency: "usd",
                unit_amount: menuItem.price,
                product_data: {
                    name: menuItem.name,
                },
            },
            quantity: parseInt(cartItem.quantity, 10),
        };

        return line_item;
    });

    return lineItems;
};

const createSession = async (
    lineItems: Stripe.Checkout.SessionCreateParams.LineItem[],
    orderId: string,
    deliveryPrice: number,
    restaurantId: string
) => {
    const sessionData = await STRIPE.checkout.sessions.create({
        line_items: lineItems,
        shipping_options: [
            {
                shipping_rate_data: {
                    display_name: "Delivery",
                    type: "fixed_amount",
                    fixed_amount: {
                        amount: deliveryPrice,
                        currency: "usd",
                    },
                },
            },
        ],
        mode: "payment",

        // ✅ redundância boa: ajuda a rastrear (e fallback se metadata sumir)
        client_reference_id: orderId,

        // ✅ metadata na session
        metadata: {
            orderId,
            restaurantId,
        },

        // ✅ metadata no payment_intent também (backup)
        payment_intent_data: {
            metadata: {
                orderId,
                restaurantId,
            },
        },

        success_url: `${FRONTEND_URL}/order-status?success=true`,
        cancel_url: `${FRONTEND_URL}/detail/${restaurantId}?cancelled=true`,
    });

    return sessionData;
};

export default {
    getMyOrders,
    createCheckoutSession,
    stripeWebhookHandler,
};

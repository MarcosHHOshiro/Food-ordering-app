import type { Order } from "@/types/types";
import { Separator } from "./ui/separator";

type Props = {
    order: Order
}

const OrderStatusDetail = ({ order }: Props) => {
    return <div className="space-y-5">
        <div className="flex flex-col ">
            <span className="font-bold">Delivery to:</span>
            <span>{order.deliveryDetails.name}</span>
            <span>{order.deliveryDetails.addressLine1}, {order.deliveryDetails.city}</span>
        </div>
        <div className="flex flex-col">
            <span className="font-bold">Items:</span>
            <ul>
                {order.cartItems.map((item) => (
                    <li key={item.menuItemId} className="flex justify-between">
                        <span>{item.name} x {item.quantity}</span>
                        <span>${(item.quantity * (order.restaurant.menuItems.find(mi => mi._id === item.menuItemId)?.price || 0)).toFixed(2)}</span>
                    </li>
                ))}
            </ul>
        </div>
        <Separator />
        <div className="flex flex-col">
            <span className="font-bold">Total</span>
            <span>${(order.totalAmount / 100).toFixed(2)}</span>
        </div>
    </div>
}

export default OrderStatusDetail;
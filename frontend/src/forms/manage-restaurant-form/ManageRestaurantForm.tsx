import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import LoadingButton from "@/components/LoadingButton";
import { z } from "zod";
import DetailsSection from "./DetailsSection";
import { Separator } from "@radix-ui/react-separator";
import CuisinesSection from "./CuisinesSection";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import type { Restaurant } from "@/types/types";
import { useEffect } from "react";

const formSchema = z.object({
    restaurantName: z.string().min(1, "Restaurant name is required"),
    city: z.string().min(1, "City is required"),
    country: z.string().min(1, "Country is required"),
    deliveryPrice: z
        .coerce
        .number()
        .positive("delivery price must be greater than 0"),
    estimatedDeliveryTime: z
        .coerce
        .number()
        .positive("estimated delivery time must be greater than 0"),
    cuisines: z.array(z.string()).min(1, "At least one cuisine is required"),
    menuItems: z.array(z.object({
        name: z.string().min(1, "Menu item name is required"),
        description: z.string().optional(),
        price: z.coerce.number().positive("Price must be greater than 0"),
    })),
    imageFile: z.instanceof(File, { message: "Image file is required" }),
});

type RestaurantFormValues = z.input<typeof formSchema>;
type RestaurantFormData = z.output<typeof formSchema>;

type Props = {
    restaurant?: Restaurant;
    onSave?: (restaurantFormData: FormData) => void;
    isLoading?: boolean;
}

const ManageRestaurantForm = ({ onSave, isLoading, restaurant }: Props) => {
    const form = useForm<RestaurantFormValues, any, RestaurantFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            restaurantName: "",
            city: "",
            country: "",
            deliveryPrice: 0,
            estimatedDeliveryTime: 0,
            cuisines: [],
            menuItems: [{ name: "", price: 0 }],
            imageFile: undefined,
        }
    });

    useEffect(() => {
        if (!restaurant) return;

        const deliveryPriceFormatted = parseInt((restaurant.deliveryPrice / 100).toFixed(2));

        const menuItemsFormatted = restaurant.menuItems.map((item) => ({
            ...item,
            price: parseInt((item.price / 100).toFixed(2)),
        }));

        const updatedRestaurant = {
            ...restaurant,
            deliveryPrice: deliveryPriceFormatted,
            menuItems: menuItemsFormatted,
        }

        form.reset(updatedRestaurant);

    }, [form, restaurant]);

    const onSubmit = (formDataJson: RestaurantFormData) => {
        const formData = new FormData();

        formData.append("restaurantName", formDataJson.restaurantName);
        formData.append("city", formDataJson.city);
        formData.append("country", formDataJson.country);

        formData.append("deliveryPrice", (formDataJson.deliveryPrice * 100).toString());
        formData.append("estimatedDeliveryTime", formDataJson.estimatedDeliveryTime.toString());
        formDataJson.cuisines.forEach((cuisine, index) => {
            formData.append(`cuisines[${index}]`, cuisine);
        });
        formDataJson.menuItems.forEach((menuItem, index) => {
            formData.append(`menuItems[${index}][name]`, menuItem.name);
            // formData.append(`menuItems[${index}][description]`, menuItem.description || "");
            formData.append(`menuItems[${index}][price]`, (menuItem.price * 100).toString());
        });

        formData.append("imageFile", formDataJson.imageFile);

        // onSave(formData);
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 bg-gray-50 p-10 rounded-lg"
            >
                <DetailsSection />
                <Separator />
                <CuisinesSection />
                <Separator />
                <MenuSection />
                <Separator />
                <ImageSection />

                {isLoading ? (
                    <LoadingButton />
                ) : (
                    <Button type="submit" className="bg-orange-500">
                        Save Restaurant
                    </Button>
                )}
            </form>
        </Form>
    )
}

export default ManageRestaurantForm
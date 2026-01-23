import type { MenuItem as MenuItemType } from "@/types/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type Pros = {
    menuItem: MenuItemType
    addToCart: () => void
}

const MenuItem = ({ menuItem, addToCart }: Pros) => {
    return (
        <Card className="cursor-pointer" onClick={addToCart}>
            <CardHeader>
                <CardTitle>{menuItem.name}</CardTitle>
            </CardHeader>
            <CardContent className="font-bold">
                ${(menuItem.price / 100).toFixed(2)}
            </CardContent>
        </Card>
    )
}

export default MenuItem;
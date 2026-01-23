import type { MenuItem } from "@/types/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type Pros = {
    menuItem: MenuItem
}

const MenuItem = ({ menuItem }: Pros) => {
    return (
        <Card className="cursor-pointer">
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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Button } from "./ui/button";

type Props = {
    onChange: (value: string) => void;
    sortOption?: string;
}

const SORT_OPTIONS = [
    { value: 'lastUpdate', label: 'Best match' },
    { value: 'deliveryPrice', label: 'Delivery price' },
    { value: 'estimatedDeliveryTime', label: 'Estimated delivery time' },
];

const SortOptionDropDown = ({ onChange, sortOption }: Props) => {
    const selected = SORT_OPTIONS.find((opt) => opt.value === sortOption);
    const displayLabel = selected ? selected.label : SORT_OPTIONS[0].label;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button variant="outline" className="w-full">
                    Sort by: {displayLabel}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {SORT_OPTIONS.map((option) => (
                    <DropdownMenuItem
                        key={option.value}
                        className="cursor-pointer"
                        onClick={() => onChange(option.value)}
                    >
                        {option.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default SortOptionDropDown;
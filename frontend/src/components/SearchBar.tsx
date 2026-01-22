import { zodResolver } from "@hookform/resolvers/zod";
import { Search, X } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect } from "react";

const formSchema = z.object({
    searchQuery: z.string().min(1, "Search query is required"),
});

export type SearchForm = z.infer<typeof formSchema>;

type Props = {
    onSubmit: (FormData: SearchForm) => void;
    placeHolder?: string;
    onReset?: () => void;
    transparent?: boolean;
    searchQuery?: string;
    className?: string;
}

const SearchBar = ({ onSubmit, placeHolder, onReset, transparent = false, searchQuery, className }: Props) => {
    const form = useForm<SearchForm>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            searchQuery: searchQuery || '',
        },
    });

    useEffect(() => {
        form.reset({ searchQuery })
    }, [form, searchQuery])

    const handleReset = () => {
        form.reset({
            searchQuery: '',
        });

        if (onReset) {
            onReset();
        }
    }

    const wrapperBase = className ?? 'max-w-3xl mx-auto';
    const borderClass = form.formState.errors.searchQuery ? 'border-red-200' : (transparent ? 'border-white/20' : 'border-gray-100');
    const bgClass = transparent ? 'bg-white/10' : 'bg-white/90';
    const shadowClass = transparent ? 'shadow-sm text-white' : 'shadow-md';

    const containerClass = `${wrapperBase} flex items-center gap-3 px-4 py-3 rounded-full ${bgClass} border ${borderClass} ${shadowClass}`;

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} onReset={handleReset} className="w-full">
                <div className={containerClass}>
                    <div className={`flex-shrink-0 ${transparent ? 'text-white/90' : 'text-orange-500'}`}>
                        <Search size={20} />
                    </div>

                    <FormField
                        control={form.control}
                        name="searchQuery"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder={placeHolder || 'Search restaurants, dishes or city...'}
                                        className={transparent ? "border-0 bg-transparent text-lg placeholder-white/70 px-0 text-white" : "border-0 bg-transparent text-lg placeholder-gray-400 px-0"}
                                        aria-label="search"
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <button
                        type="button"
                        onClick={handleReset}
                        className={transparent ? "flex items-center justify-center w-8 h-8 rounded-full text-white/80 hover:bg-white/10" : "flex items-center justify-center w-8 h-8 rounded-full text-gray-500 hover:bg-gray-100"}>
                        <X size={16}
                        />
                        Reset
                    </button>
                    <Button type="submit" className={transparent ? "ml-1 rounded-full bg-orange-500/90 hover:translate-y-[-2px] text-white px-4 py-2" : "ml-1 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-4 py-2"}>Search</Button>
                </div>
            </form>
        </Form>
    )
}

export default SearchBar;
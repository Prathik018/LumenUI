"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { componentsList } from "@/lib/components";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import useDebounce from "@/hooks/use-debounce";

export function ComponentSearch() {
    const [query, setQuery] = React.useState("");
    const [isOpen, setIsOpen] = React.useState(false);
    const debouncedQuery = useDebounce(query, 300);
    const router = useRouter();
    const searchRef = React.useRef<HTMLDivElement>(null);

    const filteredComponents = React.useMemo(() => {
        if (!debouncedQuery) return [];
        return componentsList.filter((component) =>
            component.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
            component.category.toLowerCase().includes(debouncedQuery.toLowerCase())
        ).slice(0, 8);
    }, [debouncedQuery]);

    React.useEffect(() => {
        setIsOpen(filteredComponents.length > 0 && query.length > 0);
    }, [filteredComponents, query]);

    React.useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (slug: string) => {
        router.push(`/docs/components/${slug}`);
        setQuery("");
        setIsOpen(false);
    };

    return (
        <div ref={searchRef} className="relative w-full max-w-md">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    type="text"
                    placeholder="Search components..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => query && setIsOpen(true)}
                    className="pl-9"
                />
            </div>
            {isOpen && (
                <div className="absolute top-full mt-2 w-full rounded-lg border bg-white dark:bg-black shadow-lg z-50 max-h-80 overflow-auto">
                    {filteredComponents.map((component) => (
                        <button
                            key={component.slug}
                            onClick={() => handleSelect(component.slug)}
                            className={cn(
                                "w-full px-4 py-3 text-left hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors",
                                "border-b last:border-b-0 flex flex-col gap-1"
                            )}
                        >
                            <span className="font-medium">{component.name}</span>
                            <span className="text-xs text-muted-foreground">{component.category}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

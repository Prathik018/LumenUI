
"use client";

import * as React from "react";
import { Check, Copy, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ComponentPreviewProps {
    children: React.ReactNode;
    code: string;
}

export default function ComponentPreview({ children, code }: ComponentPreviewProps) {
    const [hasCopied, setHasCopied] = React.useState(false);
    const [refreshKey, setRefreshKey] = React.useState(0);

    const onCopy = () => {
        navigator.clipboard.writeText(code);
        setHasCopied(true);
        setTimeout(() => setHasCopied(false), 2000);
    };

    const onRefresh = () => {
        setRefreshKey((prev) => prev + 1);
    };

    return (
        <div className="relative my-4">
            <div className="relative rounded-lg border bg-zinc-50 dark:bg-zinc-900/50 p-10 min-h-[400px] flex items-center justify-center">
                <div className="absolute right-4 top-4 z-10 flex items-center gap-2">
                    <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 hover:bg-zinc-200 dark:hover:bg-zinc-800"
                        onClick={onRefresh}
                        title="Refresh component"
                    >
                        <RotateCw className="h-4 w-4" />
                        <span className="sr-only">Refresh</span>
                    </Button>
                    <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 hover:bg-zinc-200 dark:hover:bg-zinc-800"
                        onClick={onCopy}
                    >
                        {hasCopied ? (
                            <Check className="h-4 w-4" />
                        ) : (
                            <Copy className="h-4 w-4" />
                        )}
                        <span className="sr-only">Copy code</span>
                    </Button>
                </div>
                <div key={refreshKey} className="flex items-center justify-center w-full overflow-hidden">
                    {children}
                </div>
            </div>
        </div>
    );
}


"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ComponentPreviewProps {
    children: React.ReactNode;
    code: string;
}

export default function ComponentPreview({ children, code }: ComponentPreviewProps) {
    const [hasCopied, setHasCopied] = React.useState(false);

    const onCopy = () => {
        navigator.clipboard.writeText(code);
        setHasCopied(true);
        setTimeout(() => setHasCopied(false), 2000);
    };

    return (
        <div className="relative my-4">
            <div className="relative rounded-lg border bg-zinc-50 dark:bg-zinc-900/50 p-10 min-h-[400px] flex items-center justify-center">
                <Button
                    size="icon"
                    variant="ghost"
                    className="absolute right-4 top-4 z-10 h-8 w-8 hover:bg-zinc-200 dark:hover:bg-zinc-800"
                    onClick={onCopy}
                >
                    {hasCopied ? (
                        <Check className="h-4 w-4" />
                    ) : (
                        <Copy className="h-4 w-4" />
                    )}
                    <span className="sr-only">Copy code</span>
                </Button>
                <div className="flex items-center justify-center w-full overflow-hidden">
                    {children}
                </div>
            </div>
        </div>
    );
}

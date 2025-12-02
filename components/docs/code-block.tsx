"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CodeBlockProps {
    code: string;
    language?: string;
}

export default function CodeBlock({ code, language = "tsx" }: CodeBlockProps) {
    const [hasCopied, setHasCopied] = React.useState(false);

    const onCopy = () => {
        navigator.clipboard.writeText(code);
        setHasCopied(true);
        setTimeout(() => setHasCopied(false), 2000);
    };

    return (
        <div className="relative my-4 overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center justify-between bg-zinc-100 px-4 py-2 dark:bg-zinc-800/50">
                <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">{language}</span>
                <Button
                    size="icon"
                    variant="ghost"
                    className="h-6 w-6 text-zinc-500 hover:bg-zinc-200 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                    onClick={onCopy}
                >
                    {hasCopied ? (
                        <Check className="h-3 w-3" />
                    ) : (
                        <Copy className="h-3 w-3" />
                    )}
                    <span className="sr-only">Copy code</span>
                </Button>
            </div>
            <div className="overflow-x-auto p-4">
                <pre className="text-sm font-mono text-zinc-800 dark:text-zinc-100">
                    <code>{code}</code>
                </pre>
            </div>
        </div>
    );
}

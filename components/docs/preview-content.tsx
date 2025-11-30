"use client";

import {
    useEffect,
    useState,
    useRef,
    type RefObject,
} from "react";
import { Code, CheckCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "@/components/ui/button";

function SuccessParticles({
    buttonRef,
}: {
    buttonRef: React.RefObject<HTMLButtonElement>;
}) {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return null;

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const particles = Array.from({ length: 6 }, (_, index) => ({
        id: `particle-${index}-${Math.random().toString(36).substr(2, 9)}`,
        index,
    }));

    return (
        <AnimatePresence>
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="fixed w-1 h-1 bg-black dark:bg-white rounded-full z-50"
                    style={{ left: centerX, top: centerY }}
                    initial={{
                        scale: 0,
                        x: 0,
                        y: 0,
                    }}
                    animate={{
                        scale: [0, 1, 0],
                        x: [
                            0,
                            (particle.index % 2 ? 1 : -1) *
                            (Math.random() * 50 + 20),
                        ],
                        y: [0, -Math.random() * 50 - 20],
                    }}
                    transition={{
                        duration: 0.6,
                        delay: particle.index * 0.1,
                        ease: "easeOut",
                    }}
                />
            ))}
        </AnimatePresence>
    );
}

export default function PreviewContent({
    link,
    prePath,
    isBlock = false,
}: {
    link: string;
    prePath: string;
    isBlock?: boolean;
}) {
    const [isCopied, setIsCopied] = useState(false);
    const [selectedTab, setSelectedTab] = useState<"npm" | "pnpm" | "bun">("npm");
    const copyButtonRef = useRef<HTMLButtonElement>(null);

    const getFileName = () => {
        const parts = link.split("/");
        return parts[parts.length - 1] || parts[0];
    };

    const getInstallCommand = () => {
        const componentName = getFileName();

        switch (selectedTab) {
            case "pnpm":
                return `pnpm dlx shadcn@latest add ${prePath}/${componentName}`;
            case "bun":
                return `bunx --bun shadcn@latest add ${prePath}/${componentName}`;
            default:
                return `npx shadcn@latest add ${prePath}/${componentName}`;
        }
    };

    const handleCopyCommand = async () => {
        const command = getInstallCommand();
        await navigator.clipboard.writeText(command);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    const handleCopyCode = async () => {
        try {
            // Read the component file
            const response = await fetch(`/api/component/${link}`);
            if (response.ok) {
                const code = await response.text();
                await navigator.clipboard.writeText(code);
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 2000);
            }
        } catch (error) {
            console.error("Failed to copy code:", error);
        }
    };

    return (
        <>
            {isCopied && (
                <SuccessParticles
                    buttonRef={copyButtonRef as RefObject<HTMLButtonElement>}
                />
            )}
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-2 mb-4">
                {/* Package Manager Tabs */}
                <div className="flex items-center gap-1 bg-muted rounded-md p-1">
                    {(["npm", "pnpm", "bun"] as const).map((pm) => (
                        <button
                            key={pm}
                            onClick={() => setSelectedTab(pm)}
                            className={cn(
                                "px-3 py-1 text-xs font-medium rounded transition-colors",
                                selectedTab === pm
                                    ? "bg-background text-foreground shadow-sm"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            {pm}
                        </button>
                    ))}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCopyCommand}
                        className="h-7 text-xs"
                    >
                        {isCopied ? (
                            <CheckCheck className="h-3.5 w-3.5 mr-1" />
                        ) : (
                            <Code className="h-3.5 w-3.5 mr-1" />
                        )}
                        {isCopied ? "Copied!" : "Copy Install"}
                    </Button>

                    {!isBlock && (
                        <Button
                            ref={copyButtonRef}
                            variant="default"
                            size="sm"
                            onClick={handleCopyCode}
                            className="h-7 text-xs"
                        >
                            {isCopied ? (
                                <CheckCheck className="h-3.5 w-3.5 mr-1" />
                            ) : (
                                <Code className="h-3.5 w-3.5 mr-1" />
                            )}
                            Copy Code
                        </Button>
                    )}
                </div>
            </div>

            {/* Install Command Display */}
            <div className="mb-4 rounded-md bg-muted p-3 font-mono text-xs">
                <code className="text-foreground">{getInstallCommand()}</code>
            </div>
        </>
    );
}

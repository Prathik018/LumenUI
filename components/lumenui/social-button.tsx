"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Twitter, Instagram, Linkedin, Link, Share2 } from "lucide-react";
import { motion, Variants } from "framer-motion";

const getShareUrl = (platform: string, url: string, title: string) => {
    switch (platform) {
        case "Twitter":
            return `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
        case "Instagram":
            return "https://www.instagram.com/";
        case "Linkedin":
            return `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
        case "Copy link":
            navigator.clipboard.writeText(url).then(() => {
                alert("Link copied to clipboard!");
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
            return null;
        default:
            return "#";
    }
};

export default function SocialButton({
    className,
    ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const currentUrl = "";
    const currentTitle = "";

    const shareButtons = [
        {
            icon: Twitter,
            label: "Share on Twitter",
            platform: "Twitter",
            color: "hover:text-[#1DA1F2] dark:hover:text-[#1DA1F2]"
        },
        {
            icon: Instagram,
            label: "Share on Instagram",
            platform: "Instagram",
            color: "hover:text-[#E4405F] dark:hover:text-[#E4405F]"
        },
        {
            icon: Linkedin,
            label: "Share on LinkedIn",
            platform: "Linkedin",
            color: "hover:text-[#0A66C2] dark:hover:text-[#0A66C2]"
        },
        {
            icon: Link,
            label: "Copy link",
            platform: "Copy link",
            color: "hover:text-gray-500 dark:hover:text-gray-400"
        },
    ];

    const handleShare = (platform: string) => {
        const url = getShareUrl(platform, currentUrl, currentTitle);

        if (url && platform !== "Copy link") {
            window.open(url, '_blank');
        }

        const index = shareButtons.findIndex(b => b.platform === platform);
        if (index !== -1) {
            setActiveIndex(index);
            setTimeout(() => setActiveIndex(null), 300);
        }
    };

    const containerVariants: Variants = {
        closed: {
            width: 50,
            height: 50,
            transition: { type: "spring", damping: 20, stiffness: 300 },
        },
        open: {
            width: 50 + shareButtons.length * 50 + (shareButtons.length - 1) * 8,
            height: 50,
            transition: { type: "spring", damping: 20, stiffness: 300 },
        },
    };

    const iconVariants: Variants = {
        closed: {
            opacity: 0,
            x: -20,
            scale: 0.8,
            transition: { duration: 0.1 },
        },
        open: (i: number) => ({
            opacity: 1,
            x: 0,
            scale: 1,
            transition: {
                type: "spring",
                damping: 15,
                stiffness: 400,
                delay: i * 0.05 + 0.1,
            },
        }),
    };

    return (
        <motion.div
            className={cn(
                "relative flex items-center p-1 bg-white dark:bg-black rounded-full border border-black/20 dark:border-white/10",
                className
            )}
            variants={containerVariants}
            initial="closed"
            animate={isOpen ? "open" : "closed"}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            role="group"
            aria-label="Social Share Buttons"
        >
            {/* Main Toggle Button */}
            <Button
                className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center p-0",
                    "bg-black dark:bg-white text-white dark:text-black",
                    "hover:scale-[0.98] transition-transform duration-100",
                    "flex-shrink-0"
                )}
                aria-label="Toggle Share Buttons"
                onClick={() => setIsOpen(!isOpen)}
                {...props}
            >
                <Share2 className="w-5 h-5" />
            </Button>

            {/* Social Icons */}
            <div className="flex items-center space-x-2 ml-2">
                {shareButtons.map((button, i) => (
                    <motion.button
                        type="button"
                        key={`share-${button.label}`}
                        aria-label={button.label}
                        onClick={() => handleShare(button.platform)}
                        className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center relative overflow-hidden",
                            "text-gray-400 dark:text-gray-600",
                            "transition-colors duration-200",
                            button.color
                        )}
                        variants={iconVariants}
                        custom={i}
                    >
                        {/* Icon Scale Feedback */}
                        <motion.div
                            className="relative z-10"
                            animate={{ scale: activeIndex === i ? 0.8 : 1 }}
                            transition={{ duration: 0.1, ease: "easeInOut" }}
                        >
                            <button.icon className="w-5 h-5" />
                        </motion.div>

                        {/* Flash effect */}
                        <motion.div
                            className="absolute inset-0 bg-blue-500/50 dark:bg-blue-500/70 rounded-full"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: activeIndex === i ? 1 : 0 }}
                            transition={{ duration: 0.1 }}
                        />
                    </motion.button>
                ))}
            </div>
        </motion.div>
    );
}

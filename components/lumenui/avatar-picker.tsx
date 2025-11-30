"use client";



import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Crown, ChevronRight, User2 } from "lucide-react";

interface Avatar {
    id: number;
    svg: React.ReactNode;
    alt: string;
}

const avatars: Avatar[] = [
    {
        id: 1,
        svg: (
            <svg
                viewBox="0 0 36 36"
                fill="none"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                aria-label="Avatar 1"
            >
                <title>Avatar 1</title>
                <mask
                    id=":r111:"
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="36"
                    height="36"
                >
                    <rect width="36" height="36" rx="72" fill="#FFFFFF" />
                </mask>
                <g mask="url(#:r111:)">
                    <rect width="36" height="36" fill="#ff005b" />
                    <rect
                        x="0"
                        y="0"
                        width="36"
                        height="36"
                        transform="translate(9 -5) rotate(219 18 18) scale(1)"
                        fill="#ffb238"
                        rx="6"
                    />
                    <g transform="translate(4.5 -4) rotate(9 18 18)">
                        <path
                            d="M15 19c2 1 4 1 6 0"
                            stroke="#000000"
                            fill="none"
                            strokeLinecap="round"
                        />
                        <rect
                            x="10"
                            y="14"
                            width="1.5"
                            height="2"
                            rx="1"
                            stroke="none"
                            fill="#000000"
                        />
                        <rect
                            x="24"
                            y="14"
                            width="1.5"
                            height="2"
                            rx="1"
                            stroke="none"
                            fill="#000000"
                        />
                    </g>
                </g>
            </svg>
        ),
        alt: "Avatar 1",
    },
    {
        id: 2,
        svg: (
            <svg
                viewBox="0 0 36 36"
                fill="none"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                aria-label="Avatar 4"
            >
                <title>Avatar 4</title>
                <mask
                    id=":R4mrttb:"
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="36"
                    height="36"
                >
                    <rect width="36" height="36" rx="72" fill="#FFFFFF" />
                </mask>
                <g mask="url(#:R4mrttb:)">
                    <rect width="36" height="36" fill="#ff7d10" />
                    <rect
                        x="0"
                        y="0"
                        width="36"
                        height="36"
                        transform="translate(5 -1) rotate(55 18 18) scale(1.1)"
                        fill="#0a0310"
                        rx="6"
                    />
                    <g transform="translate(7 -6) rotate(-5 18 18)">
                        <path
                            d="M15 20c2 1 4 1 6 0"
                            stroke="#FFFFFF"
                            fill="none"
                            strokeLinecap="round"
                        />
                        <rect
                            x="14"
                            y="14"
                            width="1.5"
                            height="2"
                            rx="1"
                            stroke="none"
                            fill="#FFFFFF"
                        />
                        <rect
                            x="20"
                            y="14"
                            width="1.5"
                            height="2"
                            rx="1"
                            stroke="none"
                            fill="#FFFFFF"
                        />
                    </g>
                </g>
            </svg>
        ),
        alt: "Avatar 4",
    },
    {
        id: 3,
        svg: (
            <svg
                viewBox="0 0 36 36"
                fill="none"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                aria-label="Avatar 2"
            >
                <title>Avatar 2</title>
                <mask
                    id=":r11c:"
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="36"
                    height="36"
                >
                    <rect width="36" height="36" rx="72" fill="#FFFFFF" />
                </mask>
                <g mask="url(#:r11c:)">
                    <rect width="36" height="36" fill="#0a0310" />
                    <rect
                        x="0"
                        y="0"
                        width="36"
                        height="36"
                        transform="translate(-3 7) rotate(227 18 18) scale(1.2)"
                        fill="#ff005b"
                        rx="36"
                    />
                    <g transform="translate(-3 3.5) rotate(7 18 18)">
                        <path d="M13,21 a1,0.75 0 0,0 10,0" fill="#FFFFFF" />
                        <rect
                            x="12"
                            y="14"
                            width="1.5"
                            height="2"
                            rx="1"
                            stroke="none"
                            fill="#FFFFFF"
                        />
                        <rect
                            x="22"
                            y="14"
                            width="1.5"
                            height="2"
                            rx="1"
                            stroke="none"
                            fill="#FFFFFF"
                        />
                    </g>
                </g>
            </svg>
        ),
        alt: "Avatar 2",
    },
    {
        id: 4,
        svg: (
            <svg
                viewBox="0 0 36 36"
                fill="none"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                aria-label="Avatar 3"
            >
                <title>Avatar 3</title>
                <mask
                    id=":r1gg:"
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="36"
                    height="36"
                >
                    <rect width="36" height="36" rx="72" fill="#FFFFFF" />
                </mask>
                <g mask="url(#:r1gg:)">
                    <rect width="36" height="36" fill="#d8fcb3" />
                    <rect
                        x="0"
                        y="0"
                        width="36"
                        height="36"
                        transform="translate(9 -5) rotate(219 18 18) scale(1)"
                        fill="#89fcb3"
                        rx="6"
                    />
                    <g transform="translate(4.5 -4) rotate(9 18 18)">
                        <path
                            d="M15 19c2 1 4 1 6 0"
                            stroke="#000000"
                            fill="none"
                            strokeLinecap="round"
                        />
                        <rect
                            x="10"
                            y="14"
                            width="1.5"
                            height="2"
                            rx="1"
                            stroke="none"
                            fill="#000000"
                        />
                        <rect
                            x="24"
                            y="14"
                            width="1.5"
                            height="2"
                            rx="1"
                            stroke="none"
                            fill="#000000"
                        />
                    </g>
                </g>
            </svg>
        ),
        alt: "Avatar 3",
    },
];

interface ProfileSetupProps {
    onComplete?: (data: { username: string; avatarId: number }) => void;
    className?: string;
}

const mainAvatarVariants = {
    initial: { scale: 0.9, opacity: 0 },
    animate: {
        scale: 1,
        opacity: 1,
        transition: { type: "spring", stiffness: 300, damping: 25 },
    },
    exit: {
        scale: 0.9,
        opacity: 0,
        transition: { duration: 0.2 },
    },
};

const pickerVariants = {
    container: {
        initial: { opacity: 0 },
        animate: {
            opacity: 1,
            transition: { staggerChildren: 0.05, delayChildren: 0.1 },
        },
    },
    item: {
        initial: { scale: 0.8, opacity: 0 },
        animate: {
            scale: 1,
            opacity: 1,
            transition: { type: "spring", stiffness: 400, damping: 25 },
        },
    },
};

const DetailRing = () => (
    <div className="absolute inset-0 rounded-full">
        <svg
            className="absolute inset-0 w-full h-full animate-[spin_30s_linear_infinite]"
            viewBox="0 0 100 100"
            aria-label="Decorative outer ring animation"
        >
            <title>Decorative outer spinning ring</title>
            <defs>
                <linearGradient
                    id="gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                >
                    <stop
                        offset="0%"
                        stopColor="hsl(var(--primary))"
                        stopOpacity="0.3"
                    />
                    <stop
                        offset="50%"
                        stopColor="hsl(var(--primary))"
                        stopOpacity="0.1"
                    />
                    <stop
                        offset="100%"
                        stopColor="hsl(var(--primary))"
                        stopOpacity="0.3"
                    />
                </linearGradient>
            </defs>
            <circle
                cx="50"
                cy="50"
                r="48"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="0.5"
                strokeDasharray="1,3"
            />
        </svg>
        <svg
            className="absolute inset-0 w-full h-full animate-[spin_20s_linear_infinite_reverse]"
            viewBox="0 0 100 100"
            aria-label="Decorative inner ring animation"
        >
            <title>Decorative inner spinning ring</title>
            <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="0.25"
                strokeDasharray="1,2"
            />
        </svg>
    </div>
);

export default function ProfileSetup({
    onComplete,
    className,
}: ProfileSetupProps) {
    const [selectedAvatar, setSelectedAvatar] = useState<Avatar>(avatars[0]);
    const [username, setUsername] = useState("");
    const [rotationCount, setRotationCount] = useState(0);
    const [isHovering, setIsHovering] = useState<number | null>(null);
    const [isFocused, setIsFocused] = useState(false);

    const handleAvatarSelect = (avatar: Avatar) => {
        if (avatar.id === selectedAvatar.id) return;
        setRotationCount((prev) => prev + 720);
        setSelectedAvatar(avatar);
    };

    const handleSubmit = () => {
        if (username.trim() && onComplete) {
            onComplete({
                username: username.trim(),
                avatarId: selectedAvatar.id,
            });
        }
    };

    const isValid = username.trim().length >= 3;
    const showError = username.trim().length > 0 && username.trim().length < 3;

    return (
        <Card
            className={cn(
                "relative w-full max-w-[400px] mx-auto overflow-hidden bg-gradient-to-b from-background/80 to-background/40 backdrop-blur-sm border-primary/10",
                className
            )}
        >
            <div className="absolute inset-x-0 -top-px h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

            <CardContent className="p-8">
                <div className="space-y-8">
                    {/* Header */}
                    <div className="text-center space-y-2">
                        <h2 className="text-2xl font-bold bg-gradient-to-br from-primary/90 to-primary/60 bg-clip-text text-transparent">
                            Create Your Profile
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Choose an avatar and enter your username to begin
                        </p>
                    </div>

                    {/* Avatar Section */}
                    <div className="relative flex flex-col items-center">
                        {/* Main Avatar */}
                        <motion.div
                            className="relative w-28 h-28"
                            variants={mainAvatarVariants as any}
                            initial="initial"
                            animate="animate"
                        >
                            <DetailRing />

                            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-primary/10 to-transparent blur-md opacity-50" />

                            <div className="relative w-full h-full rounded-full overflow-hidden border border-primary/20 bg-gradient-to-b from-background/80 to-background shadow-lg shadow-primary/5">
                                <motion.div
                                    className="absolute inset-0 flex items-center justify-center"
                                    animate={{ rotate: rotationCount }}
                                    transition={{
                                        duration: 0.7,
                                        ease: [0.4, 0, 0.2, 1],
                                    }}
                                >
                                    <div className="transform scale-[2.8]">
                                        {selectedAvatar.svg}
                                    </div>
                                </motion.div>
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/20" />
                            </div>

                            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 flex items-center justify-center">
                                <Crown className="w-4 h-4 text-primary" />
                            </div>
                        </motion.div>

                        {/* Avatar Grid */}
                        <motion.div
                            className="grid grid-cols-4 gap-3 mt-6 w-full max-w-[240px]"
                            variants={pickerVariants.container}
                            initial="initial"
                            animate="animate"
                        >
                            {avatars.map((avatar) => (
                                <motion.button
                                    key={avatar.id}
                                    onClick={() => handleAvatarSelect(avatar)}
                                    onMouseEnter={() =>
                                        setIsHovering(avatar.id)
                                    }
                                    onMouseLeave={() => setIsHovering(null)}
                                    className={cn(
                                        "relative w-12 h-12 rounded-full group/avatar",
                                        "transition-all duration-300",
                                        selectedAvatar.id === avatar.id
                                            ? "ring-2 ring-primary/30 ring-offset-2 ring-offset-background"
                                            : "hover:ring-2 hover:ring-primary/20 hover:ring-offset-2 hover:ring-offset-background"
                                    )}
                                    variants={pickerVariants.item as any}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    aria-label={`Select ${avatar.alt}`}
                                    aria-pressed={
                                        selectedAvatar.id === avatar.id
                                    }
                                >
                                    <AnimatePresence>
                                        {isHovering === avatar.id && (
                                            <motion.div
                                                className="absolute inset-0 rounded-full bg-primary/10"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                            />
                                        )}
                                    </AnimatePresence>

                                    <div className="relative w-full h-full rounded-full overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-300" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="transform scale-[2.2]">
                                                {avatar.svg}
                                            </div>
                                        </div>
                                    </div>

                                    {selectedAvatar.id === avatar.id && (
                                        <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-primary/10 backdrop-blur-sm flex items-center justify-center">
                                            <Check className="w-3 h-3 text-primary" />
                                        </div>
                                    )}
                                </motion.button>
                            ))}
                        </motion.div>
                    </div>

                    {/* Username Input */}
                    <div className="space-y-6">
                        <div className="relative">
                            <div className="relative">
                                <Input
                                    type="text"
                                    placeholder="Enter your username"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                    onFocus={() => setIsFocused(true)}
                                    onBlur={() => setIsFocused(false)}
                                    className={cn(
                                        "pl-10 h-12 text-base transition-all duration-200",
                                        isFocused && "ring-2 ring-primary/20",
                                        showError &&
                                            "ring-2 ring-destructive/50 focus-visible:ring-destructive"
                                    )}
                                    maxLength={20}
                                />
                                <User2
                                    className={cn(
                                        "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-200",
                                        isFocused
                                            ? "text-primary"
                                            : "text-muted-foreground"
                                    )}
                                />
                            </div>
                            <AnimatePresence>
                                {showError && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="absolute text-xs text-destructive mt-2 ml-1"
                                    >
                                        Username must be at least 3 characters
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </div>

                        <Button
                            className="w-full relative group h-12 text-base"
                            onClick={handleSubmit}
                            disabled={!isValid}
                        >
                            <span className="relative z-10">
                                Start Adventure
                            </span>
                            <ChevronRight className="relative z-10 w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                            <div className="absolute inset-0 rounded-md bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

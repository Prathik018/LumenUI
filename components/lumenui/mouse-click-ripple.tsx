"use client";

import { motion } from "motion/react";
import { useState } from "react";

interface Ripple {
    id: number;
    x: number;
    y: number;
}

interface MouseClickRippleProps {
    children?: React.ReactNode;
    color?: string;        
    size?: number;         
    scale?: number;        
    duration?: number;     
    opacity?: number;      
    blur?: number;         
    className?: string;    
}

export default function MouseClickRipple({
    children,
    color = "rgba(0, 150, 255, 0.35)",
    size = 80,
    scale = 3,
    duration = 0.7,
    opacity = 1,
    blur = 8,
    className = ""
}: MouseClickRippleProps) {
    const [ripples, setRipples] = useState<Ripple[]>([]);

    const createRipple = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const newRipple: Ripple = {
            id: Date.now(),
            x,
            y
        };

        setRipples((prev) => [...prev, newRipple]);

        setTimeout(() => {
            setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
        }, duration * 1200);
    };

    return (
        <div
            onClick={createRipple}
            className={`relative overflow-hidden cursor-pointer w-full h-full ${className}`}
        >
            {children || (
                <div className="w-full h-full min-h-[400px] flex items-center justify-center">
                    <p className="text-lg text-gray-500 font-montserrat font-semibold dark:text-gray-400 pointer-events-none">
                        Click anywhere to see the ripple effect
                    </p>
                </div>
            )}

            {/* Ripple Effects */}
            {ripples.map((ripple) => (
                <motion.span
                    key={ripple.id}
                    initial={{
                        scale: 0,
                        opacity,
                    }}
                    animate={{
                        scale,
                        opacity: 0,
                    }}
                    transition={{
                        duration,
                        ease: "easeOut",
                    }}
                    style={{
                        position: "absolute",
                        left: ripple.x - size / 2,
                        top: ripple.y - size / 2,
                        width: size,
                        height: size,
                        borderRadius: "50%",
                        background: color,
                        filter: `blur(${blur}px)`,
                        pointerEvents: "none",
                    }}
                />
            ))}
        </div>
    );
}

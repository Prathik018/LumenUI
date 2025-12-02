"use client";

import React, { useEffect } from "react";
import { motion, useAnimation, useMotionValue, MotionValue, Transition } from "motion/react";

type HoverBehavior = "slowDown" | "speedUp" | "pause" | "goBonkers";

interface CircularTextProps {
    text?: string;
    spinDuration?: number;
    onHover?: HoverBehavior;
    className?: string;
    fontSize?: number;
    circleRadius?: number;
}

const createRotationConfig = (speed: number, currentAngle: number, shouldLoop: boolean = true) => ({
    from: currentAngle,
    to: currentAngle + 360,
    ease: "linear" as const,
    duration: speed,
    type: "tween" as const,
    repeat: shouldLoop ? Infinity : 0,
});

const createAnimationTransition = (speed: number, currentAngle: number) => ({
    rotate: createRotationConfig(speed, currentAngle),
    scale: {
        type: "spring" as const,
        damping: 20,
        stiffness: 300,
    },
});

const CircularText: React.FC<CircularTextProps> = ({
    text = "CIRCULAR * TEXT * EFFECT *",
    spinDuration = 30,
    onHover = "speedUp",
    className = "",
    fontSize = 22,
    circleRadius = 80,
    
}) => {
    const characters = Array.from(text);
    const animationControls = useAnimation();
    const currentRotation: MotionValue<number> = useMotionValue(0);

    useEffect(() => {
        const startAngle = currentRotation.get();
        animationControls.start({
            rotate: startAngle + 360,
            scale: 1,
            transition: createAnimationTransition(spinDuration, startAngle),
        });
    }, [spinDuration, text, onHover, animationControls, currentRotation]);

    const onMouseEnterHandler = () => {
        const startAngle = currentRotation.get();

        if (!onHover) return;

        let animationConfig: ReturnType<typeof createAnimationTransition> | Transition;
        let targetScale = 1;

        switch (onHover) {
            case "slowDown":
                animationConfig = createAnimationTransition(spinDuration * 2, startAngle);
                break;
            case "speedUp":
                animationConfig = createAnimationTransition(spinDuration / 4, startAngle);
                break;
            case "pause":
                animationConfig = {
                    rotate: { type: "spring", damping: 20, stiffness: 300 },
                    scale: { type: "spring", damping: 20, stiffness: 300 },
                };
                break;
            case "goBonkers":
                animationConfig = createAnimationTransition(spinDuration / 20, startAngle);
                targetScale = 0.8;
                break;
            default:
                animationConfig = createAnimationTransition(spinDuration, startAngle);
        }

        animationControls.start({
            rotate: startAngle + 360,
            scale: targetScale,
            transition: animationConfig,
        });
    };

    const onMouseLeaveHandler = () => {
        const startAngle = currentRotation.get();
        animationControls.start({
            rotate: startAngle + 360,
            scale: 1,
            transition: createAnimationTransition(spinDuration, startAngle),
        });
    };

    const containerSize = circleRadius * 2 + fontSize * 2;

    return (
        <motion.div
            className={`relative mx-auto flex items-center font-montserrat font-semibold justify-center rounded-full cursor-pointer ${className}`}
            style={{
                width: containerSize,
                height: containerSize,
                rotate: currentRotation,
            }}
            initial={{ rotate: 0, scale: 1 }}
            animate={animationControls}
            onMouseEnter={onMouseEnterHandler}
            onMouseLeave={onMouseLeaveHandler}
            role="text"
            aria-label={text}
        >
            <div className="relative w-full h-full">
                {characters.map((char, index) => {
                    const angleInDegrees = (360 / characters.length) * index;
                    const transformStyle = `translate(-50%, -50%) rotate(${angleInDegrees}deg) translate(0, -${circleRadius}px)`;

                    return (
                        <span
                            key={`char-${index}-${char}`}
                            className="absolute left-1/2 top-1/2 inline-block text-center font-semibold text-foreground font-mono"
                            style={
                                {
                                    transform: transformStyle,
                                    WebkitTransform: transformStyle,
                                    transformOrigin: "center center",
                                    fontSize: fontSize,
                                    lineHeight: 1,
                                    whiteSpace: "pre",
                                } as React.CSSProperties
                            }
                            aria-hidden
                        >
                            {char === " " ? "\u00A0" : char}
                        </span>
                    );
                })}
            </div>
        </motion.div>
    );
};

export default CircularText;

import { useEffect, useRef } from "react";

interface UseAutoResizeTextareaProps {
    minHeight: number;
    maxHeight: number;
}

export function useAutoResizeTextarea({
    minHeight,
    maxHeight,
}: UseAutoResizeTextareaProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const adjustHeight = (reset?: boolean) => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        if (reset) {
            textarea.style.height = `${minHeight}px`;
            return;
        }

        // Reset height to allow shrinking
        textarea.style.height = `${minHeight}px`;

        // Calculate new height
        const newHeight = Math.min(textarea.scrollHeight, maxHeight);

        textarea.style.height = `${newHeight}px`;
    };

    useEffect(() => {
        // Set initial height
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = `${minHeight}px`;
        }
    }, [minHeight]);

    return {
        textareaRef,
        adjustHeight,
    };
}

"use client";

import {
  Globe,
  Paperclip,
  Send,
  Image as ImageIcon,
  Bot,
  ChevronDown,
  Mic,
  MicOff,
  Waves,
} from "lucide-react";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { useAutoResizeTextarea } from "@/hooks/use-auto-resize-textarea";

const MODELS = ["GPT-5.1", "GPT-4.1", "Claude 3.5", "Llama 3.1"];

export default function AI_Input_Search() {
  const [value, setValue] = useState("");
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 52,
    maxHeight: 200,
  });

  const [showSearch, setShowSearch] = useState(true);
  const [isFocused, setIsFocused] = useState(false);

  const [isImageMode, setIsImageMode] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string>(MODELS[0]);
  const [showModelMenu, setShowModelMenu] = useState(false);

  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const handleSubmit = () => {
    // here you can branch on modes:
    // showSearch, isImageMode, isVoiceMode, selectedModel, etc.
    setValue("");
    adjustHeight(true);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    // delay closing model menu so clicks work
    setTimeout(() => setShowModelMenu(false), 120);
  };

  const handleContainerClick = () => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const placeholder = isImageMode
    ? "Describe the image you want to create..."
    : showSearch
    ? "Search the web..."
    : "Ask anything...";

  return (
    <div className="w-full py-4">
      <div className="relative max-w-xl w-full mx-auto">
        <div
          role="textbox"
          tabIndex={0}
          aria-label="AI assistant input container"
          className={cn(
            "relative flex flex-col rounded-2xl transition-all duration-200 w-full text-left cursor-text",
            "ring-1 ring-black/10 dark:ring-white/10 bg-black/5 dark:bg-white/5",
            isFocused && "ring-black/20 dark:ring-white/20"
          )}
          onClick={handleContainerClick}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleContainerClick();
            }
          }}
        >
          <div className="overflow-y-auto max-h-[200px] rounded-t-2xl">
            <Textarea
              id="ai-input-advanced"
              value={value}
              placeholder={placeholder}
              className="w-full rounded-2xl rounded-b-none px-4 py-3 bg-transparent border-none dark:text-white placeholder:text-black/70 dark:placeholder:text-white/70 resize-none focus-visible:ring-0 leading-[1.2]"
              ref={textareaRef}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
              onChange={(e) => {
                setValue(e.target.value);
                adjustHeight();
              }}
            />
          </div>

          <div className="h-14 rounded-b-2xl border-t border-black/5 dark:border-white/10 bg-black/5/80 dark:bg-white/5/80 backdrop-blur-sm relative">
            {/* Left tools */}
            <div className="absolute left-3 bottom-2.5 flex items-center gap-2">
              {/* Attach */}
              <label className="cursor-pointer rounded-lg p-2 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
                <input type="file" className="hidden" />
                <Paperclip className="w-4 h-4 text-black/40 dark:text-white/40" />
              </label>

              {/* Web search toggle */}
              <button
                type="button"
                onClick={() => setShowSearch((prev) => !prev)}
                className={cn(
                  "rounded-full transition-all flex items-center gap-2 px-1.5 py-1 border h-8 cursor-pointer text-xs",
                  showSearch
                    ? "bg-sky-500/15 border-sky-400 text-sky-500"
                    : "bg-black/5 dark:bg-white/5 border-transparent text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white"
                )}
              >
                <div className="w-4 h-4 flex items-center justify-center shrink-0">
                  <motion.div
                    animate={{
                      rotate: showSearch ? 180 : 0,
                      scale: showSearch ? 1.05 : 1,
                    }}
                    whileHover={{
                      rotate: showSearch ? 180 : 15,
                      scale: 1.1,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                    }}
                  >
                    <Globe
                      className={cn(
                        "w-4 h-4",
                        showSearch ? "text-sky-500" : "text-inherit"
                      )}
                    />
                  </motion.div>
                </div>
                <AnimatePresence>
                  {showSearch && (
                    <motion.span
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: "auto", opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden whitespace-nowrap shrink-0"
                    >
                      Search
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* Image mode toggle */}
              <button
                type="button"
                onClick={() => setIsImageMode((prev) => !prev)}
                className={cn(
                  "rounded-full transition-all flex items-center gap-2 px-1.5 py-1 border h-8 cursor-pointer text-xs",
                  isImageMode
                    ? "bg-purple-500/15 border-purple-400 text-purple-400"
                    : "bg-black/5 dark:bg-white/5 border-transparent text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white"
                )}
              >
                <div className="w-4 h-4 flex items-center justify-center shrink-0">
                  <motion.div
                    animate={{
                      scale: isImageMode ? [1, 1.1, 1] : 1,
                    }}
                    transition={
                      isImageMode
                        ? { duration: 0.7, repeat: Infinity }
                        : { duration: 0.2 }
                    }
                  >
                    <ImageIcon className="w-4 h-4" />
                  </motion.div>
                </div>
                <AnimatePresence>
                  {isImageMode && (
                    <motion.span
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: "auto", opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden whitespace-nowrap shrink-0"
                    >
                      Image
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>

            {/* Right tools */}
            <div className="absolute right-3 bottom-2.5 flex items-center gap-2">
              {/* Model selector */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowModelMenu((prev) => !prev)}
                  className="flex items-center gap-1 h-8 rounded-full border border-black/8 dark:border-white/10 bg-black/5 dark:bg-white/5 px-2 text-[11px] text-black/70 dark:text-white/70 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                >
                  <Bot className="w-3.5 h-3.5" />
                  <span className="max-w-[80px] truncate">{selectedModel}</span>
                  <motion.span
                    animate={{ rotate: showModelMenu ? 180 : 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <ChevronDown className="w-3 h-3" />
                  </motion.span>
                </button>

                <AnimatePresence>
                  {showModelMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 bottom-10 z-20 w-40 rounded-lg border border-black/10 dark:border-white/10 bg-black/90 dark:bg-zinc-900/95 text-xs shadow-lg backdrop-blur-md overflow-hidden"
                    >
                      {MODELS.map((model) => (
                        <button
                          key={model}
                          type="button"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => {
                            setSelectedModel(model);
                            setShowModelMenu(false);
                          }}
                          className={cn(
                            "w-full text-left px-3 py-1.5 hover:bg-white/10 dark:hover:bg-white/10 transition-colors",
                            selectedModel === model &&
                              "bg-white/10 dark:bg-white/10 text-white"
                          )}
                        >
                          {model}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Voice mode toggle */}
              <button
                type="button"
                onClick={() => setIsVoiceMode((prev) => !prev)}
                className={cn(
                  "flex items-center gap-1 h-8 rounded-full border px-2 text-[11px] transition-all",
                  isVoiceMode
                    ? "bg-emerald-500/15 border-emerald-400 text-emerald-400"
                    : "border-transparent bg-black/5 dark:bg-white/5 text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white"
                )}
              >
                <Waves className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Voice</span>
              </button>

              {/* Voice typing / mic */}
              <motion.button
                type="button"
                onClick={() => setIsListening((prev) => !prev)}
                className={cn(
                  "rounded-full p-2 flex items-center justify-center transition-colors",
                  isListening
                    ? "bg-rose-500/20 text-rose-400"
                    : "bg-black/5 dark:bg-white/5 text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white"
                )}
                animate={
                  isListening
                    ? {
                        scale: [1, 1.08, 1],
                        boxShadow: [
                          "0 0 0 0 rgba(244,63,94,0.5)",
                          "0 0 0 6px rgba(244,63,94,0)",
                          "0 0 0 0 rgba(244,63,94,0.0)",
                        ],
                      }
                    : { scale: 1, boxShadow: "0 0 0 0 rgba(0,0,0,0)" }
                }
                transition={
                  isListening
                    ? { duration: 1.1, repeat: Infinity }
                    : { duration: 0.2 }
                }
                aria-pressed={isListening}
                aria-label="Voice typing"
              >
                {isListening ? (
                  <MicOff className="w-4 h-4" />
                ) : (
                  <Mic className="w-4 h-4" />
                )}
              </motion.button>

              {/* Send */}
              <button
                type="button"
                onClick={handleSubmit}
                className={cn(
                  "rounded-xl p-2 transition-colors flex items-center justify-center",
                  value
                    ? "bg-sky-500/15 text-sky-500"
                    : "bg-black/5 dark:bg-white/5 text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white cursor-pointer"
                )}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

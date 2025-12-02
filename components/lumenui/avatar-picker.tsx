"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "motion/react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, ChevronRight, User2, Sparkles } from "lucide-react";

interface Avatar {
  id: number;
  svg: React.ReactNode;
  alt: string;
}

const avatars: Avatar[] = [/* ...your avatars unchanged... */];

interface ProfileSetupProps {
  onComplete?: (data: { username: string; avatarId: number }) => void;
  className?: string;
}

// ✅ Explicitly type as Variants and cast ease to a 4-tuple
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.25,
      ease: [0.3, 0, 0.2, 1] as [number, number, number, number],
    },
  },
};

const avatarPreviewVariants: Variants = {
  initial: { scale: 0.9, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 260, damping: 20 },
  },
};

const avatarListItem: Variants = {
  initial: { opacity: 0, y: 6, scale: 0.95 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 320, damping: 24 },
  },
};

export default function ProfileSetup({ onComplete, className }: ProfileSetupProps) {
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar>(avatars[0]);
  const [username, setUsername] = useState("");
  const [flip, setFlip] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const isValid = username.trim().length >= 3;
  const showError = username.trim().length > 0 && username.trim().length < 3;

  const handleAvatarSelect = (avatar: Avatar) => {
    if (avatar.id === selectedAvatar.id) return;
    setSelectedAvatar(avatar);
    setFlip((prev) => !prev);
  };

  const handleSubmit = () => {
    if (!isValid || !onComplete) return;
    onComplete({ username: username.trim(), avatarId: selectedAvatar.id });
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="show"
      className={cn("relative w-full max-w-[420px] mx-auto", className)}
    >
      <Card className="relative overflow-hidden border-border/70 bg-gradient-to-br from-background/90 via-background/70 to-background/50 backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-x-0 -top-[1px] h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

        <CardContent className="relative p-6 sm:p-7">
          <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="flex items-center justify-between gap-2">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1 rounded-full bg-primary/5 px-2 py-0.5 text-[11px] font-medium text-primary">
                  <Sparkles className="h-3 w-3" />
                  <span>Profile setup</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
                  Make it <span className="text-primary">yours</span>
                </h2>
                <p className="text-xs text-muted-foreground max-w-[240px]">
                  Choose an avatar and a username. You can change them later.
                </p>
              </div>
              <div className="hidden sm:flex flex-col items-end gap-1 text-[11px] text-muted-foreground">
                <span className="font-medium">Step 1 of 2</span>
                <div className="flex gap-1">
                  <span className="h-1.5 w-6 rounded-full bg-primary" />
                  <span className="h-1.5 w-6 rounded-full bg-muted" />
                </div>
              </div>
            </div>

            {/* Label outside avatar window */}
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="font-medium">Select avatar</span>
              <span className="hidden sm:inline">
                Pick one that matches your vibe
              </span>
            </div>

            {/* Main layout */}
            <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,1.1fr)_minmax(0,1.9fr)] gap-6 items-center">
              {/* Avatar preview */}
              <div className="flex flex-col items-center gap-3">
                <motion.div
                  className="relative h-24 w-24 sm:h-28 sm:w-28"
                  variants={avatarPreviewVariants}
                  initial="initial"
                  animate="animate"
                >
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/25 via-primary/5 to-transparent blur-2 opacity-80" />
                  <motion.div
                    key={selectedAvatar.id + String(flip)}
                    initial={{ rotateY: flip ? 180 : -180, opacity: 0 }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    transition={{ duration: 0.45, ease: [0.33, 1, 0.68, 1] }}
                    className="relative flex h-full w-full items-center justify-center rounded-3xl border border-border/70 bg-background/80 shadow-sm shadow-primary/15"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <div className="scale-[1.9]">{selectedAvatar.svg}</div>
                  </motion.div>
                </motion.div>
                <span className="text-[11px] text-muted-foreground">
                  Preview
                </span>
              </div>

              {/* Avatar options + username */}
              <div className="flex flex-col gap-4">
                {/* Avatar grid – no scroll */}
                <motion.div
                  className="grid grid-cols-2 gap-3"
                  initial="initial"
                  animate="animate"
                >
                  {avatars.map((avatar) => {
                    const isActive = avatar.id === selectedAvatar.id;
                    return (
                      <motion.button
                        key={avatar.id}
                        type="button"
                        variants={avatarListItem}
                        whileHover={{ y: -2, scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => handleAvatarSelect(avatar)}
                        className={cn(
                          "relative flex h-14 w-full items-center justify-center rounded-2xl border bg-background/80 transition-all",
                          isActive
                            ? "border-primary/60 shadow-sm shadow-primary/20"
                            : "border-border hover:border-primary/40 hover:bg-primary/5"
                        )}
                        aria-label={`Select ${avatar.alt}`}
                        aria-pressed={isActive}
                      >
                        <div className="scale-[1.4]">{avatar.svg}</div>
                        <AnimatePresence>
                          {isActive && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.6 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.6 }}
                              className="absolute -right-1 -bottom-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-background"
                            >
                              <Check className="h-3 w-3" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.button>
                    );
                  })}
                </motion.div>

                {/* Username input */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="font-medium">Username</span>
                    <span>{username.length}/20</span>
                  </div>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="e.g. lumen_creator"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      maxLength={20}
                      className={cn(
                        "pl-9 h-11 text-sm transition-all duration-150",
                        "bg-background/80 border-border focus-visible:ring-primary/30",
                        isFocused && "border-primary/50",
                        showError &&
                          "border-destructive/60 focus-visible:ring-destructive/40"
                      )}
                    />
                    <User2
                      className={cn(
                        "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors",
                        isFocused || username
                          ? "text-primary"
                          : "text-muted-foreground"
                      )}
                    />
                  </div>
                  <AnimatePresence>
                    {showError && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className="text-[11px] text-destructive pl-0.5"
                      >
                        Username must be at least 3 characters long.
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Footer button */}
            <div className="pt-1">
              <Button
                className="group w-full h-11 text-sm font-medium"
                onClick={handleSubmit}
                disabled={!isValid}
              >
                <span className="flex items-center gap-1.5">
                  Continue
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-md bg-gradient-to-r from-primary/0 via-primary/15 to-primary/0"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.25 }}
                />
              </Button>
              <p className="mt-2 text-[11px] text-muted-foreground text-center">
                You can change this later in settings.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

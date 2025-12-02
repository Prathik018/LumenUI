"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import {
  CreditCard,
  Users,
  BarChart3,
  Settings,
} from "lucide-react";

type NavItemId = "billing" | "customers" | "analytics" | "settings";

interface NavItem {
  id: NavItemId;
  label: string;
  description: string;
  Icon: React.ElementType;
  badge?: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    id: "billing",
    label: "Billing",
    description: "Manage invoices, payouts, and subscriptions.",
    Icon: CreditCard,
    badge: "Live",
  },
  {
    id: "customers",
    label: "Customers",
    description: "View accounts, segments, and lifecycle.",
    Icon: Users,
  },
  {
    id: "analytics",
    label: "Analytics",
    description: "Monitor revenue, churn, and cohorts.",
    Icon: BarChart3,
    badge: "New",
  },
  {
    id: "settings",
    label: "Settings",
    description: "Configure workspace, roles, and security.",
    Icon: Settings,
  },
];

interface CardNavProps {
  className?: string;
  items?: NavItem[];
  defaultActiveId?: NavItemId;
  onChange?(id: NavItemId): void;
}

export default function CardNav({
  className,
  items = NAV_ITEMS,
  defaultActiveId = "billing",
  onChange,
}: CardNavProps) {
  const [activeId, setActiveId] = useState<NavItemId>(defaultActiveId);

  const activeItem = items.find((item) => item.id === activeId) ?? items[0];

  const handleSelect = (id: NavItemId) => {
    setActiveId(id);
    onChange?.(id);
  };

  return (
    <div className={cn("w-full max-w-3xl mx-auto space-y-4", className)}>
      {/* Card Nav Row */}
      <div className="flex flex-wrap gap-3">
        {items.map((item) => {
          const isActive = item.id === activeId;
          const Icon = item.Icon;

          return (
            <motion.button
              key={item.id}
              type="button"
              onClick={() => handleSelect(item.id)}
              whileHover={{ y: -1.5 }}
              whileTap={{ scale: 0.97 }}
              className={cn(
                "relative flex min-w-[150px] flex-1 items-start gap-3 overflow-hidden rounded-xl border bg-card px-4 py-3 text-left transition-colors",
                "border-border/70 hover:border-primary/40 hover:bg-accent/40",
                isActive && "border-primary/60"
              )}
            >
              {/* Shared animated background for active */}
              {isActive && (
                <motion.div
                  layoutId="card-nav-active-bg"
                  className="absolute inset-0 rounded-xl bg-primary/5"
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                />
              )}

              <div className="relative mt-0.5">
                <motion.div
                  animate={{ scale: isActive ? 1.05 : 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full border text-xs",
                    isActive
                      ? "border-primary/60 bg-primary/10 text-primary"
                      : "border-border bg-muted/60 text-muted-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                </motion.div>
              </div>

              <div className="relative flex flex-1 flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium leading-none">
                    {item.label}
                  </span>
                  <AnimatePresence>
                    {item.badge && isActive && (
                      <motion.span
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-primary"
                      >
                        {item.badge}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
                <p className="line-clamp-2 text-xs text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Active item detail / hint */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeItem.id}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.18 }}
          className="flex items-center justify-between rounded-xl border border-border/70 bg-card/70 px-4 py-3 text-xs text-muted-foreground"
        >
          <div className="flex flex-col gap-0.5">
            <span className="text-[11px] uppercase tracking-[0.18em] text-primary/70">
              {activeItem.label}
            </span>
            <span>{activeItem.description}</span>
          </div>
          <span className="hidden text-[11px] text-muted-foreground/80 sm:inline">
            Tip: Use this as a section switcher in a settings or dashboard page.
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

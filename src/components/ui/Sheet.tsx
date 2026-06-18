"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { cn } from "@/utils/cn";

interface SheetProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
} as const;

const sheetVariants = {
  hidden: { y: "100%" },
  visible: {
    y: 0,
    transition: { type: "spring" as const, damping: 28, stiffness: 300 },
  },
  exit: {
    y: "100%",
    transition: { type: "spring" as const, damping: 28, stiffness: 300 },
  },
} as const;

export function Sheet({ open, onClose, title, children, className }: SheetProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[var(--z-sheet)]">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Sheet */}
          <motion.div
            className={cn(
              "absolute bottom-0 left-0 right-0 max-h-[85dvh] overflow-y-auto",
              "rounded-t-[var(--radius-sheet)] glass-sheet",
              "pb-[env(safe-area-inset-bottom)]",
              className,
            )}
            variants={sheetVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-label={title ?? "Sheet"}
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="h-1 w-9 rounded-full bg-white/30" />
            </div>

            {/* Title */}
            {title && (
              <div className="flex items-center justify-between px-5 pb-3">
                <h2 className="text-headline text-white">{title}</h2>
                <button
                  onClick={onClose}
                  className="touch-target flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-caption text-[var(--color-text-secondary)] hover:bg-white/20"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Content */}
            <div className="px-5 pb-6">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

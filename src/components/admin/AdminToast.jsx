"use client";

import { createContext, useContext, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from "lucide-react";

const ToastContext = createContext(null);

const ICONS = {
  success: { Icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-500/10", border: "border-emerald-200 dark:border-emerald-500/20" },
  error:   { Icon: AlertCircle,  color: "text-red-500",     bg: "bg-red-50 dark:bg-red-500/10",         border: "border-red-200 dark:border-red-500/20"     },
  warning: { Icon: AlertTriangle,color: "text-amber-500",   bg: "bg-amber-50 dark:bg-amber-500/10",     border: "border-amber-200 dark:border-amber-500/20" },
  info:    { Icon: Info,         color: "text-blue-500",    bg: "bg-blue-50 dark:bg-blue-500/10",       border: "border-blue-200 dark:border-blue-500/20"   },
};

function Toast({ id, message, type = "success", onDismiss }) {
  const cfg = ICONS[type] ?? ICONS.info;
  const { Icon } = cfg;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 40, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={`flex items-start gap-3 w-full max-w-sm px-4 py-3.5 rounded-2xl border shadow-xl backdrop-blur-sm ${cfg.bg} ${cfg.border}`}
    >
      <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${cfg.color}`} />
      <p className="text-sm text-[#2F0147] dark:text-white flex-1 leading-snug">{message}</p>
      <button
        onClick={() => onDismiss(id)}
        className="flex-shrink-0 text-[#9C528B]/40 hover:text-[#9C528B] transition-colors ml-1"
        aria-label="Dismiss notification"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
}

export function AdminToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const counter = useRef(0);

  const dismiss = useCallback((id) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  const toast = useCallback(({ message, type = "success", duration = 4000 }) => {
    const id = ++counter.current;
    setToasts((t) => [...t, { id, message, type }]);
    if (duration > 0) setTimeout(() => dismiss(id), duration);
    return id;
  }, [dismiss]);

  return (
    <ToastContext.Provider value={toast}>
      {children}
      {/* Toast Container */}
      <div
        aria-live="polite"
        className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2 items-end pointer-events-none"
      >
        <AnimatePresence mode="popLayout">
          {toasts.map((t) => (
            <div key={t.id} className="pointer-events-auto w-full">
              <Toast {...t} onDismiss={dismiss} />
            </div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

/** useAdminToast — call inside any admin client component */
export function useAdminToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useAdminToast must be used within AdminToastProvider");

  return {
    success: (message, opts) => ctx({ message, type: "success", ...opts }),
    error:   (message, opts) => ctx({ message, type: "error",   ...opts }),
    warning: (message, opts) => ctx({ message, type: "warning", ...opts }),
    info:    (message, opts) => ctx({ message, type: "info",    ...opts }),
  };
}

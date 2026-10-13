'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ToastItem } from '@/types';
import { sound } from '@/lib/sound';

interface ToastContextType {
  showToast: (message: string, type?: 'default' | 'success' | 'alert' | 'secret' | 'warning', duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback((message: string, type: 'default' | 'success' | 'alert' | 'secret' | 'warning' = 'default', duration = 3200) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastItem = { id, message, type, duration };

    setToasts((prev) => [...prev.slice(-3), newToast]); // keep max 4 toasts

    if (type === 'success') {
      sound.playSuccess();
    } else if (type === 'secret') {
      sound.playGlitch();
    } else if (type === 'warning' || type === 'alert') {
      sound.playBoop(300);
    } else {
      sound.playPop();
    }

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div 
        role="region"
        aria-live="polite"
        className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none max-w-sm w-full px-4 sm:px-0"
      >
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => {
            const bgClass =
              toast.type === 'success'
                ? 'bg-[#D7FF64] text-[#171717]'
                : toast.type === 'alert'
                ? 'bg-[#FF5C35] text-white'
                : toast.type === 'warning'
                ? 'bg-[#FFE27D] text-[#171717]'
                : toast.type === 'secret'
                ? 'bg-[#7957FF] text-white'
                : 'bg-white text-[#171717]';

            const badgeIcon =
              toast.type === 'success'
                ? '✨'
                : toast.type === 'alert' || toast.type === 'warning'
                ? '⚠️'
                : toast.type === 'secret'
                ? '👾'
                : '💡';

            return (
              <motion.div
                key={toast.id}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className={`pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-xl border-2 border-[#171717] brutalist-shadow ${bgClass}`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl select-none">{badgeIcon}</span>
                  <p className="text-sm font-bold tracking-tight leading-snug">{toast.message}</p>
                </div>
                <button
                  type="button"
                  onClick={() => removeToast(toast.id)}
                  className="text-xs font-black px-1.5 py-0.5 border border-current rounded hover:opacity-75 transition-opacity"
                  aria-label="Dismiss toast"
                >
                  ✕
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

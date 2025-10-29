"use client";
import { ReactNode, useEffect } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ open, onClose, children }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-3xl mx-4 rounded-2xl bg-white shadow-xl">
        <button
          className="absolute right-3 top-3 rounded-lg px-2 py-1 text-sm bg-gray-100 hover:bg-gray-200"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

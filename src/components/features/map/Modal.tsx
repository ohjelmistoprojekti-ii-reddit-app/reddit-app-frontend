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
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      {/* Light background instead of dark */}
      <div className="absolute inset-0 bg-gray-100/95 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal content with rounded corners and shadow */}
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl bg-white shadow-2xl">
        {/* Close button - styled like on the image */}
        <button
          className="absolute right-4 top-4 z-10 rounded-full w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>
        
        {/* Scrollable content */}
        <div className="overflow-y-auto p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
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
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    document.addEventListener("keydown", onKey);
    
    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4"
      role="dialog"
      aria-modal="true"
    >
      {/* Light background instead of dark */}
      <div 
        className="absolute inset-0 bg-gray-100/95 backdrop-blur-sm" 
        onClick={onClose}
        aria-label="Close modal" 
      />
      
      {/* Modal content with rounded corners and shadow */}
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl sm:rounded-3xl bg-white shadow-2xl">
        {/* Close button - styled like on the image */}
        <button
          className="absolute right-3 top-3 sm:right-4 sm:top-4 z-10 rounded-full w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>
        
        {/* Scrollable content */}
        <div className="overflow-y-auto p-4 sm:p-6 md:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
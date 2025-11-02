import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isImageUrl(url: string) {
  return /\.(png|jpe?g|gif|webp|bmp|svg)$/i.test(url);
}

export function trimPostContent(text: string, limit = 240) {
  if (!text) return "";
  if (text.length <= limit) return text;
  return text.slice(0, limit).trimEnd() + "…";
}
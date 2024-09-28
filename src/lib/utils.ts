import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to combine Tailwind CSS classes with merging.
 * @param inputs - Class values to be combined.
 * @returns A merged string of class names.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function capitalizeWord(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function isValidImageURL(url: string): boolean {
  return (
    /^(https?:\/\/.*\.(?:jpg|jpeg|png|gif|bmp|webp|svg))$/.test(url) ||
    /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/.test(url)
  );
}

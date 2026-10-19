import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Production domain, configurable via env. Used for canonical URLs and OG tags. */
export const SITE_URL =
  (import.meta.env.VITE_SITE_URL as string | undefined) ?? "https://zyvo.example.com";

export const SITE_NAME = "Zyvo";

export function absoluteUrl(path: string): string {
  return `${SITE_URL.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;
}

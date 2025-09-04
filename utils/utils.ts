// src/lib/utils.ts
import clsx, { type ClassValue } from 'clsx'; // Use default import for clsx
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
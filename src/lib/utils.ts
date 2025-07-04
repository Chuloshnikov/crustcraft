import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatMemberSince(dateInput: string | Date): string {
  if (!dateInput) {
    return 'Member since Unknown'; 
  }
  const date = new Date(dateInput);
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long' };
  const formatted = date.toLocaleString('en-US', options);
  return `Member since ${formatted}`;
}

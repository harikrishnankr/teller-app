import { clsx, type ClassValue } from "clsx";
import { format, toDate } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function utcToLocal(date: string) {
  if (!date) {
    return "";
  }
  const localDate = toDate(new Date(date));
  return format(localDate, "PPP");
}

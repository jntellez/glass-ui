import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combina clases condicionales (clsx) y resuelve conflictos
 * de utilidades de Tailwind CSS (twMerge).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

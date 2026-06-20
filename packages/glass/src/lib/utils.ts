import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      rounded: [{ "rounded-glass": ["sm", "md", "lg", "xl"] }],
      shadow: [{ "shadow-glass": ["sm", "md", "lg"] }],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

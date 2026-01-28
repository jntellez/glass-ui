export const UTILS_CN = `import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`;

export const GLASS_TOKENS = `
@layer base {
  :root {
    /* --- GLASS UI TOKENS (Light) --- */
    --glass-surface: rgba(255, 255, 255, 0.4);
    --glass-border: rgba(255, 255, 255, 0.6);
    --glass-highlight: rgba(255, 255, 255, 0.5);
    --glass-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
    --glass-blur: 12px;
    --glass-saturation: 110%;
  }

  .dark {
    /* --- GLASS UI TOKENS (Dark) --- */
    --glass-surface: rgba(0, 0, 0, 0.3);
    --glass-border: rgba(255, 255, 255, 0.08);
    --glass-highlight: rgba(255, 255, 255, 0.03);
    --glass-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
    --glass-blur: 12px;
    --glass-saturation: 100%;
  }
}
`;

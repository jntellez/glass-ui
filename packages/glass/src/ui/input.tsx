import * as React from "react"
import { cn } from "../lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {

    const hasCustomSurface = typeof className === 'string' &&
      (className.includes("glass") || className.includes("bg-"));

    return (
      <input
        ref={ref}
        className={cn(
          "w-full rounded-glass-sm text-sm font-medium transition-all duration-200",
          "h-10 px-4 py-2",
          "placeholder:text-current/40",
          "text-current/70",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/15 dark:focus-visible:ring-white/40 focus-visible:ring-offset-1",
          "disabled:pointer-events-none disabled:opacity-50",
          !hasCustomSurface && [
            "bg-transparent border border-glass-border",
            "shadow-glass-md",
          ],
          !hasCustomSurface && [
            "hover:border-glass-border/80",
          ],
          className
        )}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }

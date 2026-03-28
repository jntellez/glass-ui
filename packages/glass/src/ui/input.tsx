import * as React from "react"
import { cn } from "../lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => {

    const hasCustomSurface = typeof className === 'string' &&
      (className.includes("glass") || className.includes("bg-"));

    const hasSizeClass = typeof className === 'string' &&
      /(^|\s)(input-sm|input-md|input-lg)(\s|$)/.test(className);

    return (
      <input
        type={type}
        className={cn(
          "flex w-full rounded-glass-sm transition-all duration-200",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          "text-foreground placeholder:text-muted-foreground",

          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50",
          "disabled:cursor-not-allowed disabled:opacity-50",

          !hasSizeClass && "input-md",

          !hasCustomSurface && [
            "bg-transparent",
            "border border-glass-border",
            "shadow-glass-sm",
          ],

          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
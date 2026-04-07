import * as React from "react"
import { cn } from "../../lib/utils"

const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => {
    const hasCustomSurface =
      typeof className === "string" && (className.includes("glass") || className.includes("bg-"))

    const hasSizeOrIconClass =
      typeof className === "string" && /(^|\s)(btn-sm|btn-md|btn-lg|btn-icon)(\s|$)/.test(className)

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-glass-sm font-medium transition-all duration-200",
          "transform-gpu will-change-transform antialiased",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:focus-visible:ring-white/50 focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",

          !hasSizeOrIconClass && "btn-md",

          !hasCustomSurface && ["border border-glass-border", "shadow-glass-sm"],
          "hover:scale-98 hover:shadow-glass-sm",
          !hasCustomSurface && ["hover:bg-glass-bg/80", "hover:border-glass-border/80"],
          "active:scale-95 active:duration-100",
          !hasCustomSurface && ["active:bg-glass-bg/60", "active:border-glass-border/60"],
          className,
        )}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

export { Button }

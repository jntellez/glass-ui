import * as React from "react"
import { cn } from "../../lib/utils"

const Badge = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => {
    const hasCustomSurface =
      typeof className === "string" && (className.includes("glass") || className.includes("bg-"))

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center h-fit rounded-full text-xs font-normal transition-all duration-200",
          "px-2.5 py-0.5",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:focus-visible:ring-white/50 focus-visible:ring-offset-2",
          !hasCustomSurface && ["border border-glass-border", "shadow-glass-md"],
          className,
        )}
        {...props}
      />
    )
  },
)
Badge.displayName = "Badge"

export { Badge }

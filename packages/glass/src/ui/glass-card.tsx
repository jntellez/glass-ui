import * as React from "react"
import { cn } from "../lib/utils"

const GlassCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative overflow-hidden rounded-xl border bg-glass-surface/50 p-6 text-card-foreground shadow-sm backdrop-blur-glass",
      "border-glass-border shadow-glass",
      className
    )}
    {...props}
  />
))
GlassCard.displayName = "GlassCard"

export { GlassCard }
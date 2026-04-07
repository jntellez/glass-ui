import * as React from "react"
import { cn } from "../../lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  const hasCustomSurface =
    typeof className === "string" && (className.includes("glass") || className.includes("bg-"))

  return (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-20 w-full rounded-glass-sm transition-colors duration-200",
        "px-3 py-2 text-sm leading-6",
        "text-foreground placeholder:text-muted-foreground",
        "resize-y",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50",
        "disabled:cursor-not-allowed disabled:opacity-50",
        !hasCustomSurface && ["bg-transparent", "border border-glass-border", "shadow-glass-sm"],
        className,
      )}
      {...props}
    />
  )
})

Textarea.displayName = "Textarea"

export { Textarea }

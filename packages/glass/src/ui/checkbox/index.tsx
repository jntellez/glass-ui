import * as React from "react"
import { cn } from "../../lib/utils"

const Checkbox = React.forwardRef<
  HTMLInputElement,
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">
>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      type="checkbox"
      style={{ accentColor: "var(--accent)", ...(props.style ?? {}) }}
      className={cn(
        "size-4 shrink-0 my-0.5 rounded-glass-sm border border-glass-border bg-transparent shadow-glass-sm transition-all duration-200 ease-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:focus-visible:ring-white/50 focus-visible:ring-offset-2",
        "hover:border-glass-border-strong",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  )
})

Checkbox.displayName = "Checkbox"

export { Checkbox }

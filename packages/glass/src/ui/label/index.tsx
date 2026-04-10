import * as React from "react"
import { cn } from "../../lib/utils"

const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          "inline-flex text-sm font-medium text-foreground transition-colors",
          "select-none",
          className,
        )}
        {...props}
      />
    )
  },
)

Label.displayName = "Label"

export { Label }

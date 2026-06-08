import * as React from "react"
import { cn } from "../../lib/utils"
import { useFieldContext } from "../field/context"

const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, htmlFor, ...props }, ref) => {
    const field = useFieldContext()

    return (
      <label
        ref={ref}
        htmlFor={htmlFor ?? field?.controlId ?? field?.defaultControlId}
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

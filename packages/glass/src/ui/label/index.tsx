import * as React from "react"
import { cn } from "../../lib/utils"
import { useFieldContext, useFieldRegistration } from "../field/context"

const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, htmlFor, id, ...props }, ref) => {
    const field = useFieldContext()
    const labelId = id ?? field?.defaultLabelId

    useFieldRegistration(field?.setLabelId, labelId)

    return (
      <label
        ref={ref}
        id={labelId}
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

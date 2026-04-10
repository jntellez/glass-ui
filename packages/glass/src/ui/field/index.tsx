import * as React from "react"
import { cn } from "../../lib/utils"

const Field = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn("space-y-1.5", className)} {...props} />
  },
)

Field.displayName = "Field"

const FieldDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return (
    <p ref={ref} className={cn("text-xs leading-5 text-muted-foreground", className)} {...props} />
  )
})

FieldDescription.displayName = "FieldDescription"

const FieldError = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, role = "alert", ...props }, ref) => {
  return (
    <p
      ref={ref}
      role={role}
      className={cn("text-xs font-medium leading-5 text-destructive", className)}
      {...props}
    />
  )
})

FieldError.displayName = "FieldError"

export { Field, FieldDescription, FieldError }

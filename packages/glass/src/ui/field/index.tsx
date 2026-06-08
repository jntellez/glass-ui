import * as React from "react"
import { cn } from "../../lib/utils"
import { FieldContext, sanitizeId, useFieldContext, useFieldRegistration } from "./context"

type FieldProps = React.HTMLAttributes<HTMLDivElement> & {
  invalid?: boolean
}

const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  ({ className, id, invalid = false, ...props }, ref) => {
    const generatedId = React.useId()
    const fieldId = id ?? `field-${sanitizeId(generatedId)}`
    const [controlId, setControlId] = React.useState<string | null>(null)
    const [descriptionId, setDescriptionId] = React.useState<string | null>(null)
    const [errorId, setErrorId] = React.useState<string | null>(null)

    const contextValue = React.useMemo(
      () => ({
        invalid,
        defaultControlId: `${fieldId}-control`,
        controlId,
        defaultDescriptionId: `${fieldId}-description`,
        descriptionId,
        defaultErrorId: `${fieldId}-error`,
        errorId,
        setControlId,
        setDescriptionId,
        setErrorId,
      }),
      [controlId, descriptionId, errorId, fieldId, invalid],
    )

    return (
      <FieldContext.Provider value={contextValue}>
        <div ref={ref} id={id} className={cn(className)} {...props} />
      </FieldContext.Provider>
    )
  },
)

Field.displayName = "Field"

const FieldDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const field = useFieldContext()
  const id = props.id ?? field?.defaultDescriptionId

  useFieldRegistration(field?.setDescriptionId, id)

  return (
    <p
      ref={ref}
      id={id}
      className={cn("text-xs leading-5 text-muted-foreground", className)}
      {...props}
    />
  )
})

FieldDescription.displayName = "FieldDescription"

const FieldError = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, role = "alert", ...props }, ref) => {
  const field = useFieldContext()
  const id = props.id ?? field?.defaultErrorId

  useFieldRegistration(field?.setErrorId, id)

  return (
    <p
      ref={ref}
      id={id}
      role={role}
      className={cn("text-xs font-medium leading-5 text-destructive", className)}
      {...props}
    />
  )
})

FieldError.displayName = "FieldError"

export { Field, FieldDescription, FieldError }

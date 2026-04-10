import { Field, FieldDescription, FieldError, Input, Label } from "@glass-ui-kit/glass"

export default function FieldErrorExample() {
  return (
    <Field className="w-full max-w-sm">
      <Label htmlFor="field-email">Email</Label>
      <Input
        id="field-email"
        type="email"
        defaultValue="invalid-email"
        placeholder="you@example.com"
        className="border-destructive/50 dark:border-destructive/80 focus-visible:ring-destructive/50"
      />
      <FieldDescription>We'll only use this for account notifications.</FieldDescription>
      <FieldError>Please enter a valid email address.</FieldError>
    </Field>
  )
}

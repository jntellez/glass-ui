import { Field, FieldDescription, FieldError, Input, Label } from "@glass-ui-kit/glass"

export default function FieldErrorExample() {
  return (
    <Field className="w-full max-w-sm">
      <Label htmlFor="field-email">Email</Label>
      <Input
        id="field-email"
        type="email"
        aria-invalid="true"
        defaultValue="invalid-email"
        placeholder="you@example.com"
      />
      <FieldDescription>We'll only use this for account notifications.</FieldDescription>
      <FieldError>Please enter a valid email address.</FieldError>
    </Field>
  )
}

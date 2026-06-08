import { Field, FieldDescription, FieldError, Input, Label } from "@glass-ui-kit/glass"

export default function FieldErrorExample() {
  return (
    <Field invalid className="w-full max-w-sm space-y-1.5">
      <Label>Email</Label>
      <Input type="email" defaultValue="invalid-email" placeholder="you@example.com" />
      <FieldDescription>We'll only use this for account notifications.</FieldDescription>
      <FieldError>Please enter a valid email address.</FieldError>
    </Field>
  )
}

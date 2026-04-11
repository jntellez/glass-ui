import { Field, FieldError, Input, Label } from "@glass-ui-kit/glass"

export default function InputError() {
  return (
    <Field className="w-full max-w-sm">
      <Label htmlFor="email_error">Email</Label>
      <Input
        id="email_error"
        type="email"
        aria-invalid="true"
        defaultValue="invalid-email"
        placeholder="you@example.com"
      />
      <FieldError>Please enter a valid email address.</FieldError>
    </Field>
  )
}

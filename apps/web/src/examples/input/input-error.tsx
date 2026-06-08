import { Field, FieldError, Input, Label } from "@glass-ui-kit/glass"

export default function InputError() {
  return (
    <Field invalid className="w-full max-w-sm space-y-1.5">
      <Label>Email</Label>
      <Input type="email" defaultValue="invalid-email" placeholder="you@example.com" />
      <FieldError>Please enter a valid email address.</FieldError>
    </Field>
  )
}

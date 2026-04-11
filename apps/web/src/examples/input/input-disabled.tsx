import { Field, Input, Label } from "@glass-ui-kit/glass"

export default function InputDisabled() {
  return (
    <Field className="w-full max-w-sm">
      <Label htmlFor="email_disabled">Disabled Input</Label>
      <Input id="email_disabled" type="email" placeholder="you@example.com" disabled />
    </Field>
  )
}

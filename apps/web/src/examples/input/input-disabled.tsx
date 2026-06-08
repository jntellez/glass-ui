import { Field, Input, Label } from "@glass-ui-kit/glass"

export default function InputDisabled() {
  return (
    <Field className="w-full max-w-sm space-y-1.5">
      <Label>Disabled Input</Label>
      <Input type="email" placeholder="you@example.com" disabled />
    </Field>
  )
}

import { Field, FieldDescription, Input, Label } from "@glass-ui-kit/glass"

export default function FieldDemo() {
  return (
    <Field className="w-full max-w-sm">
      <Label htmlFor="field-name">Full name</Label>
      <Input id="field-name" placeholder="Ada Lovelace" />
      <FieldDescription>Use the name people recognize in your workspace.</FieldDescription>
    </Field>
  )
}

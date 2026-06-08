import { Field, FieldDescription, Input, Label } from "@glass-ui-kit/glass"

export default function FieldDemo() {
  return (
    <Field className="w-full max-w-sm space-y-1.5">
      <Label>Full name</Label>
      <Input placeholder="Ada Lovelace" />
      <FieldDescription>Use the name people recognize in your workspace.</FieldDescription>
    </Field>
  )
}

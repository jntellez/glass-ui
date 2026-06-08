import { Card, Field, Input, Label } from "@glass-ui-kit/glass"

export default function LabelField() {
  return (
    <Card className="w-full max-w-sm space-y-4">
      <Field className="space-y-1.5">
        <Label>Full name</Label>
        <Input placeholder="Ada Lovelace" />
      </Field>
      <Field className="space-y-1.5">
        <Label>Email</Label>
        <Input type="email" placeholder="ada@example.com" />
      </Field>
    </Card>
  )
}

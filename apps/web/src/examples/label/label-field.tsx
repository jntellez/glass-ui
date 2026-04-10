import { Card, Field, Input, Label } from "@glass-ui-kit/glass"

export default function LabelField() {
  return (
    <Card className="w-full max-w-sm space-y-2">
      <Field>
        <Label htmlFor="label-demo-name">Full name</Label>
        <Input id="label-demo-name" placeholder="Ada Lovelace" />
      </Field>
      <Field>
        <Label htmlFor="label-demo-email">Email</Label>
        <Input id="label-demo-email" type="email" placeholder="ada@example.com" />
      </Field>
    </Card>
  )
}

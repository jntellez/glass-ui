import { Field, FieldDescription, Label, Textarea } from "@glass-ui-kit/glass"

export default function FieldTextarea() {
  return (
    <Field className="w-full max-w-sm space-y-1.5">
      <Label>Bio</Label>
      <Textarea rows={5} placeholder="A short bio about you" />
      <FieldDescription>Keep it concise. You can edit this later.</FieldDescription>
    </Field>
  )
}

import { Field, FieldDescription, Label, Textarea } from "@glass-ui-kit/glass"

export default function FieldTextarea() {
  return (
    <Field className="w-full max-w-sm">
      <Label htmlFor="field-bio">Bio</Label>
      <Textarea id="field-bio" rows={5} placeholder="A short bio about you" />
      <FieldDescription>Keep it concise. You can edit this later.</FieldDescription>
    </Field>
  )
}

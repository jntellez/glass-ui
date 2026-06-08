import { Field, FieldDescription, Label, Textarea } from "@glass-ui-kit/glass"

export default function TextareaComposition() {
  return (
    <Field className="w-full max-w-md mx-auto space-y-1.5">
      <Label>Bio</Label>
      <Textarea placeholder="A short description about you" rows={6} variant="soft" />
      <FieldDescription>Keep it brief. You can always edit this later.</FieldDescription>
    </Field>
  )
}

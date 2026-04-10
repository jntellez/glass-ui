import { Checkbox, Field, FieldDescription, Label } from "@glass-ui-kit/glass"

export default function CheckboxField() {
  return (
    <Field className="flex gap-2">
      <Checkbox id="checkbox-field" className="mt-0.5" />
      <div className="flex flex-col">
        <Label htmlFor="checkbox-field" className="leading-5">
          Enable notifications
        </Label>
        <FieldDescription>We only send messages when something important happens.</FieldDescription>
      </div>
    </Field>
  )
}

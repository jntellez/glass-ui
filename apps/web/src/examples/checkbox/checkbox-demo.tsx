import { Checkbox, Field, FieldDescription, Label } from "@glass-ui-kit/glass"

export default function CheckboxDemo() {
  return (
    <Field className="flex gap-2">
      <Checkbox id="checkbox-demo" defaultChecked />
      <div className="flex flex-col">
        <Label htmlFor="checkbox-demo">Email me product updates</Label>
        <FieldDescription>Release notes and occasional product updates.</FieldDescription>
      </div>
    </Field>
  )
}

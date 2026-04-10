import { Checkbox, Label } from "@glass-ui-kit/glass"

export default function LabelDefault() {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id="label-checkbox-example" />
      <Label htmlFor="label-checkbox-example">Accept terms</Label>
    </div>
  )
}

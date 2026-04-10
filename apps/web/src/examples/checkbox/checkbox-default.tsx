import { Checkbox, Label } from "@glass-ui-kit/glass"

export default function CheckboxDefault() {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id="checkbox-default" />
      <Label htmlFor="checkbox-default">Accept terms</Label>
    </div>
  )
}

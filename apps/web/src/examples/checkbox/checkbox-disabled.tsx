import { Checkbox, Label } from "@glass-ui-kit/glass"

export default function CheckboxDisabled() {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id="checkbox-disabled" disabled />
      <Label htmlFor="checkbox-disabled" className="cursor-not-allowed text-muted-foreground">
        Disabled option
      </Label>
    </div>
  )
}

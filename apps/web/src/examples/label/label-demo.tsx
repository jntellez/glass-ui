import { Input, Label } from "@glass-ui-kit/glass"

export default function LabelDemo() {
  return (
    <div className="w-full max-w-sm gap-2">
      <Label htmlFor="label-field-role">Role</Label>
      <Input id="label-field-role" placeholder="Product designer" />
    </div>
  )
}

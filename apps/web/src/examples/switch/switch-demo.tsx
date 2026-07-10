import { Field, FieldDescription, Label, Switch } from "@glass-ui-kit/glass"
import * as React from "react"

export default function SwitchDemo() {
  const [checked, setChecked] = React.useState(true)

  return (
    <Field className="mx-auto flex w-full max-w-sm items-start justify-between gap-4 rounded-glass-md border border-glass-border/60 glass p-4">
      <div className="space-y-1">
        <Label htmlFor="switch-demo">Reduce motion</Label>
        <FieldDescription>Soften large animations without changing layout.</FieldDescription>
      </div>
      <Switch id="switch-demo" checked={checked} onCheckedChange={setChecked} />
    </Field>
  )
}

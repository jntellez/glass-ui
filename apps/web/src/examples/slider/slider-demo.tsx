import { Field, Label, Slider } from "@glass-ui-kit/glass"
import * as React from "react"

export default function SliderDemo() {
  const [value, setValue] = React.useState([36])

  return (
    <Field className="mx-auto flex w-full max-w-sm flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <Label>Surface blur</Label>
        <span className="text-sm text-muted-foreground">{value[0]}px</span>
      </div>
      <Slider aria-label="Surface blur" value={value} onValueChange={setValue} variant="soft" />
    </Field>
  )
}

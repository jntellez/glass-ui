import * as React from "react"
import { Label, RadioGroup, RadioGroupItem } from "@glass-ui-kit/glass"

const options = [
  {
    value: "default",
    label: "Default",
  },
  {
    value: "comfortable",
    label: "Comfortable",
  },
  {
    value: "compact",
    label: "Compact",
  },
] as const

export default function RadioGroupDemo() {
  const [value, setValue] = React.useState<(typeof options)[number]["value"]>("comfortable")

  return (
    <RadioGroup
      value={value}
      onValueChange={(nextValue) => setValue(nextValue as (typeof options)[number]["value"])}
      aria-label="Density"
      className="mx-auto w-fit gap-2"
    >
      {options.map((option) => {
        const id = `radio-group-demo-${option.value}`

        return (
          <div key={option.value} className="flex items-center gap-3">
            <RadioGroupItem id={id} value={option.value} size="sm" />
            <Label htmlFor={id}>{option.label}</Label>
          </div>
        )
      })}
    </RadioGroup>
  )
}

import { Slider } from "@glass-ui-kit/glass"
import * as React from "react"

const sizes = [
  { label: "Small", size: "sm", defaultValue: [20] },
  { label: "Medium", size: "md", defaultValue: [45] },
  { label: "Large", size: "lg", defaultValue: [70] },
] as const

export default function SliderSizes() {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-4">
      {sizes.map(({ label, size, defaultValue }) => (
        <div key={size} className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>{label}</span>
            <span className="text-muted-foreground">{defaultValue[0]}%</span>
          </div>
          <Slider aria-label={label} size={size} defaultValue={[...defaultValue]} />
        </div>
      ))}
    </div>
  )
}

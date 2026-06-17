import { useState } from "react"
import { ColorPicker } from "@glass-ui-kit/glass"

export default function ColorPickerDemo() {
  const [value, setValue] = useState("#7c3aed")

  return (
    <div className="mx-auto w-full max-w-sm space-y-4 rounded-glass-md border border-glass-border/60 glass p-5 shadow-glass-sm">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <ColorPicker aria-label="Accent color" value={value} onValueChange={setValue} size="sm" />

          <div className="flex flex-col">
            <span className="text-sm font-medium text-foreground">Accent</span>
            <span className="text-xs text-muted-foreground">Brand token</span>
          </div>
        </div>

        <code className="rounded-glass-sm border border-glass-border/60 bg-white/5 px-2 py-1 font-mono text-xs text-muted-foreground">
          {value}
        </code>
      </div>
    </div>
  )
}

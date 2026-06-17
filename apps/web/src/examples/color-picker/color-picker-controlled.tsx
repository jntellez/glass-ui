import { useState } from "react"
import { ColorPicker, Input, normalizeHexColor } from "@glass-ui-kit/glass"

export default function ColorPickerControlled() {
  const [value, setValue] = useState("#0ea5e9")
  const [draftValue, setDraftValue] = useState(value)

  const commitDraftValue = () => {
    const normalized = normalizeHexColor(draftValue)

    if (!normalized) {
      setDraftValue(value)
      return
    }

    setValue(normalized)
    setDraftValue(normalized)
  }

  return (
    <div className="mx-auto w-full max-w-sm space-y-3 rounded-glass-md border border-glass-border/60 glass p-4 shadow-glass-sm">
      <div className="flex items-center gap-3">
        <ColorPicker
          aria-label="Surface tint"
          value={value}
          onValueChange={(nextValue) => {
            setValue(nextValue)
            setDraftValue(nextValue)
          }}
        />

        <Input
          aria-label="Surface tint hex value"
          value={draftValue}
          onChange={(event) => setDraftValue(event.target.value)}
          onBlur={commitDraftValue}
          onKeyDown={(event) => {
            if (event.key !== "Enter") {
              return
            }

            commitDraftValue()
          }}
          placeholder="#0ea5e9"
          className="flex-1 font-mono"
        />
      </div>

      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="font-medium text-foreground">Current token</span>
        <code className="rounded-glass-sm border border-glass-border/60 bg-white/5 px-2 py-1 text-xs text-muted-foreground">
          {value}
        </code>
      </div>
    </div>
  )
}

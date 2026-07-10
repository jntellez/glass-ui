import { Label, RadioGroup, RadioGroupItem } from "@glass-ui-kit/glass"

const shippingOptions: ReadonlyArray<{
  value: string
  label: string
  disabled?: boolean
}> = [
  { value: "standard", label: "Standard shipping" },
  { value: "express", label: "Express shipping", disabled: true },
  { value: "pickup", label: "Store pickup" },
]

export default function RadioGroupDisabled() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-4">
      <div className="space-y-3 rounded-glass-md border border-glass-border/60 bg-white/5 p-4 opacity-80">
        <p className="text-sm font-medium text-foreground">Group disabled</p>
        <RadioGroup defaultValue="team" disabled aria-label="Visibility" className="gap-3">
          {[
            { value: "team", label: "Visible to your team" },
            { value: "private", label: "Only visible to owners" },
          ].map((option) => {
            const id = `radio-disabled-group-${option.value}`

            return (
              <div key={option.value} className="flex items-center gap-3">
                <RadioGroupItem id={id} value={option.value} />
                <Label htmlFor={id}>{option.label}</Label>
              </div>
            )
          })}
        </RadioGroup>
      </div>

      <div className="space-y-3 rounded-glass-md border border-glass-border/60 bg-white/5 p-4">
        <p className="text-sm font-medium text-foreground">Item disabled</p>
        <RadioGroup defaultValue="standard" aria-label="Shipping speed" className="gap-3">
          {shippingOptions.map((option) => {
            const id = `radio-disabled-item-${option.value}`

            return (
              <div key={option.value} className="flex items-center gap-3">
                <RadioGroupItem id={id} value={option.value} disabled={option.disabled} />
                <Label htmlFor={id} className={option.disabled ? "opacity-60" : undefined}>
                  {option.label}
                </Label>
              </div>
            )
          })}
        </RadioGroup>
      </div>
    </div>
  )
}

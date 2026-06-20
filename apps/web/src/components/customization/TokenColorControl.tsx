import { cn } from "@/lib/utils"
import { ColorPicker, Input } from "@glass-ui-kit/glass"
import { canRenderColorSwatch, parseColorValue, updateColorValueWithPickerHex } from "./color-value"

interface TokenColorControlProps {
  className?: string
  contentClassName?: string
  id: string
  inputAriaLabel?: string
  inputClassName?: string
  label: string
  labelClassName?: string
  onChange: (value: string) => void
  pickerAriaLabel?: string
  pickerClassName?: string
  pickerSize?: "sm" | "md" | "lg"
  swatchClassName?: string
  swatchTestId?: string
  value: string
}

export function TokenColorControl({
  className,
  contentClassName,
  id,
  inputAriaLabel,
  inputClassName,
  label,
  labelClassName,
  onChange,
  pickerAriaLabel,
  pickerClassName,
  pickerSize = "sm",
  swatchClassName,
  swatchTestId,
  value,
}: TokenColorControlProps) {
  const parsedValue = parseColorValue(value)
  const showSwatch = !parsedValue && canRenderColorSwatch(value)

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className={cn("flex min-w-0 items-center gap-3", contentClassName)}>
        {parsedValue ? (
          <ColorPicker
            value={parsedValue.pickerHex}
            onValueChange={(nextPickerHex) => {
              const nextValue = updateColorValueWithPickerHex(value, nextPickerHex)

              if (nextValue) {
                onChange(nextValue)
              }
            }}
            swatchAriaLabel={pickerAriaLabel ?? `${label} color picker`}
            size={pickerSize}
            className={pickerClassName}
          />
        ) : null}

        {showSwatch ? (
          <span
            data-testid={swatchTestId}
            className={cn(
              "inline-block size-7 shrink-0 rounded-glass-sm border border-glass-border shadow-sm",
              swatchClassName,
            )}
            style={{ backgroundColor: value }}
            aria-hidden="true"
          />
        ) : null}

        <label htmlFor={id} className={cn("text-sm font-medium text-foreground", labelClassName)}>
          {label}
        </label>
      </div>

      <Input
        id={id}
        type="text"
        aria-label={inputAriaLabel}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        variant="transparent"
        className={inputClassName}
      />
    </div>
  )
}

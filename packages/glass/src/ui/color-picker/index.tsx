import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"
import { useFieldControlProps } from "../field/use-field-control-props"

const DEFAULT_COLOR = "#7c3aed"

const colorPickerVariants = cva(
  [
    "glass inline-block shrink-0 cursor-pointer appearance-none overflow-hidden rounded-glass-md border border-glass-border p-0 shadow-glass-sm transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50",
    "aria-[invalid=true]:border-destructive/50 aria-[invalid=true]:focus-visible:ring-destructive/50 dark:aria-[invalid=true]:border-destructive/80",
    "disabled:cursor-not-allowed disabled:opacity-60",
    "[&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:border-0 [&::-webkit-color-swatch]:rounded-[inherit] [&::-moz-color-swatch]:border-0 [&::-moz-color-swatch]:rounded-[inherit]",
  ],
  {
    variants: {
      size: {
        sm: "size-8 rounded-glass-sm",
        md: "size-10",
        lg: "size-12 rounded-glass-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

type ColorPickerProps = Omit<
  React.ComponentPropsWithoutRef<"input">,
  "type" | "size" | "value" | "defaultValue"
> &
  VariantProps<typeof colorPickerVariants> & {
    value?: string
    defaultValue?: string
    onValueChange?: (value: string) => void
    swatchAriaLabel?: string
  }

function normalizeHexColor(value: string | undefined | null) {
  if (!value) {
    return null
  }

  const normalized = value.trim().replace(/^#/, "")

  if (/^[0-9a-fA-F]{3}$/.test(normalized)) {
    return `#${normalized
      .split("")
      .map((character) => `${character}${character}`)
      .join("")
      .toLowerCase()}`
  }

  if (/^[0-9a-fA-F]{6}$/.test(normalized)) {
    return `#${normalized.toLowerCase()}`
  }

  return null
}

const ColorPicker = React.forwardRef<HTMLInputElement, ColorPickerProps>(
  (
    {
      className,
      defaultValue,
      disabled = false,
      onChange,
      onValueChange,
      size,
      swatchAriaLabel,
      value,
      ...props
    },
    ref,
  ) => {
    const initialValue = React.useMemo(
      () => normalizeHexColor(value ?? defaultValue) ?? DEFAULT_COLOR,
      [defaultValue, value],
    )
    const isControlled = value !== undefined
    const [uncontrolledValue, setUncontrolledValue] = React.useState(initialValue)
    const currentValue = isControlled
      ? (normalizeHexColor(value) ?? DEFAULT_COLOR)
      : uncontrolledValue
    const fieldControlProps = useFieldControlProps(props)
    const resolvedAriaLabel =
      props["aria-label"] ??
      (props["aria-labelledby"] ? undefined : (swatchAriaLabel ?? "Choose color"))

    return (
      <input
        {...props}
        {...fieldControlProps}
        ref={ref}
        type="color"
        value={currentValue}
        disabled={disabled}
        aria-label={resolvedAriaLabel}
        className={cn(colorPickerVariants({ size }), className)}
        onChange={(event) => {
          const normalized = normalizeHexColor(event.target.value) ?? DEFAULT_COLOR

          if (!isControlled) {
            setUncontrolledValue(normalized)
          }

          onValueChange?.(normalized)
          onChange?.(event)
        }}
      />
    )
  },
)

ColorPicker.displayName = "ColorPicker"

export { ColorPicker, colorPickerVariants, normalizeHexColor }

import { Input, Slider } from "@glass-ui-kit/glass"
import * as React from "react"
import { TokenColorControl } from "./TokenColorControl"
import type { TokenName } from "./customization-tokens"
import { TOKEN_LABELS } from "./customization-tokens"
import {
  clampShadowValue,
  formatShadowValue,
  parseShadowDraftNumber,
  parseShadowValue,
  updateShadowOpacity,
  updateShadowColor,
  type ParsedShadowValue,
} from "./token-shadow"

interface TokenShadowRowProps {
  token: TokenName
  value: string
  onChange: (value: string) => void
}

interface ShadowDraftState {
  blur: string
  color: string
  offsetX: string
  offsetY: string
  opacity: string
  spread: string
}

const FALLBACK_SHADOW_VALUE: ParsedShadowValue = {
  blur: 0,
  color: "rgba(0, 0, 0, 1)",
  colorChannels: { red: 0, green: 0, blue: 0 },
  offsetX: 0,
  offsetY: 0,
  opacity: 1,
  opacityText: "1",
  spread: 0,
}

const SHADOW_RANGE_CONTROLS = [
  { controlLabel: "Blur", key: "blur", min: 0, max: 80 },
  { controlLabel: "Spread", key: "spread", min: -40, max: 40 },
  { controlLabel: "Offset X", key: "offsetX", min: -80, max: 80 },
  { controlLabel: "Offset Y", key: "offsetY", min: -80, max: 80 },
] as const satisfies ReadonlyArray<{
  controlLabel: string
  key: Exclude<keyof ShadowDraftState, "color" | "opacity">
  min: number
  max: number
}>

export function TokenShadowRow({ token, value, onChange }: TokenShadowRowProps) {
  const label = TOKEN_LABELS[token]
  const parsedValue = React.useMemo(() => parseShadowValue(value), [value])

  const [drafts, setDrafts] = React.useState(() =>
    getDraftState(parsedValue ?? FALLBACK_SHADOW_VALUE),
  )
  const lastValidValueRef = React.useRef(parsedValue ?? FALLBACK_SHADOW_VALUE)

  React.useEffect(() => {
    if (!parsedValue) {
      return
    }

    setDrafts(getDraftState(parsedValue))
    lastValidValueRef.current = parsedValue
  }, [parsedValue])

  if (!parsedValue) {
    return null
  }

  return (
    <li className="rounded-glass-sm py-1.5">
      <div className="space-y-2">
        <p className="text-sm font-medium text-foreground">{label}</p>

        <TokenColorControl
          id={getInputId(token, "color")}
          label="Color"
          inputAriaLabel={`${label} color`}
          value={drafts.color}
          onChange={(nextColor) => {
            setDrafts((current) => ({ ...current, color: nextColor }))

            const nextValue = updateShadowColor(lastValidValueRef.current, nextColor)

            if (!nextValue) {
              return
            }

            syncShadowValue(nextValue, setDrafts, lastValidValueRef, onChange)
          }}
          pickerAriaLabel={`${label} color picker`}
          labelClassName="w-24 shrink-0"
          inputClassName="min-w-0 flex-1"
          pickerClassName="shrink-0"
          swatchClassName="size-8"
          swatchTestId="shadow-color-swatch"
        />

        <ShadowSliderControl
          token={token}
          groupLabel={label}
          controlLabel="Opacity"
          unit=""
          min={0}
          max={1}
          step={0.01}
          value={drafts.opacity}
          sliderValue={lastValidValueRef.current.opacity}
          inputMode="decimal"
          onInputChange={(nextValue) => {
            setDrafts((current) => ({ ...current, opacity: nextValue }))
            const parsedNumber = parseShadowDraftNumber(nextValue)

            if (parsedNumber === null) {
              return
            }

            syncShadowValue(
              updateShadowOpacity(lastValidValueRef.current, parsedNumber, nextValue),
              setDrafts,
              lastValidValueRef,
              onChange,
            )
          }}
          onSliderChange={(nextValue) => {
            syncShadowValue(
              updateShadowOpacity(lastValidValueRef.current, nextValue),
              setDrafts,
              lastValidValueRef,
              onChange,
            )
          }}
        />

        {SHADOW_RANGE_CONTROLS.map(({ controlLabel, key, min, max }) => (
          <ShadowSliderControl
            key={key}
            token={token}
            groupLabel={label}
            controlLabel={controlLabel}
            unit="px"
            min={min}
            max={max}
            step={1}
            value={drafts[key]}
            sliderValue={lastValidValueRef.current[key]}
            inputMode="decimal"
            onInputChange={(nextValue) => {
              setDrafts((current) => ({ ...current, [key]: nextValue }))
              const parsedNumber = parseShadowDraftNumber(nextValue)

              if (parsedNumber === null) {
                return
              }

              syncShadowValue(
                { ...lastValidValueRef.current, [key]: clampShadowValue(parsedNumber, min, max) },
                setDrafts,
                lastValidValueRef,
                onChange,
              )
            }}
            onSliderChange={(nextValue) => {
              syncShadowValue(
                { ...lastValidValueRef.current, [key]: clampShadowValue(nextValue, min, max) },
                setDrafts,
                lastValidValueRef,
                onChange,
              )
            }}
          />
        ))}
      </div>
    </li>
  )
}

interface ShadowSliderControlProps {
  controlLabel: string
  groupLabel: string
  inputMode: React.HTMLAttributes<HTMLInputElement>["inputMode"]
  max: number
  min: number
  onInputChange: (value: string) => void
  onSliderChange: (value: number) => void
  sliderValue: number
  step: number
  token: TokenName
  unit: string
  value: string
}

function ShadowSliderControl({
  controlLabel,
  groupLabel,
  inputMode,
  max,
  min,
  onInputChange,
  onSliderChange,
  sliderValue,
  step,
  token,
  unit,
  value,
}: ShadowSliderControlProps) {
  return (
    <div className="flex items-center gap-3">
      <label
        className="w-24 shrink-0 text-sm text-muted-foreground"
        htmlFor={getInputId(token, controlLabel)}
      >
        {controlLabel}
      </label>
      <Slider
        aria-label={`${groupLabel} ${controlLabel} slider`}
        min={min}
        max={max}
        step={step}
        value={[sliderValue]}
        onValueChange={([nextValue]) => onSliderChange(nextValue)}
        variant="soft"
        size="sm"
        className="min-w-0 flex-1"
      />
      <div className="flex shrink-0 items-center gap-1.5">
        <Input
          id={getInputId(token, controlLabel)}
          type="text"
          inputMode={inputMode}
          aria-label={`${groupLabel} ${controlLabel}`}
          value={value}
          onChange={(event) => onInputChange(event.target.value)}
          variant="transparent"
          className="w-16 text-right"
        />
        <span
          className="w-4 text-left text-xs text-muted-foreground"
          aria-hidden={unit ? undefined : "true"}
        >
          {unit}
        </span>
      </div>
    </div>
  )
}

function syncShadowValue(
  nextValue: ParsedShadowValue,
  setDrafts: React.Dispatch<React.SetStateAction<ShadowDraftState>>,
  lastValidValueRef: React.MutableRefObject<ParsedShadowValue>,
  onChange: (value: string) => void,
) {
  lastValidValueRef.current = nextValue
  setDrafts(getDraftState(nextValue))
  onChange(formatShadowValue(nextValue))
}

function getDraftState(value: ParsedShadowValue): ShadowDraftState {
  return {
    color: value.color,
    opacity: formatDraftValue(value.opacity),
    blur: formatDraftValue(value.blur),
    spread: formatDraftValue(value.spread),
    offsetX: formatDraftValue(value.offsetX),
    offsetY: formatDraftValue(value.offsetY),
  }
}

function formatDraftValue(value: number) {
  return value.toString()
}

function getInputId(token: TokenName, suffix: string) {
  return `token-shadow-row-${token.slice(2).replaceAll(/[^a-z0-9]+/gi, "-")}-${suffix
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/gi, "-")}`
}

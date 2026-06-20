import { Input, Slider } from "@glass-ui-kit/glass"
import * as React from "react"
import type { TokenName } from "./customization-tokens"
import { TOKEN_LABELS } from "./customization-tokens"
import {
  clampTokenSliderValue,
  formatTokenSliderValue,
  getTokenSliderDraftValue,
  type TokenSliderConfig,
  parseTokenSliderDraftValue,
  parseTokenSliderValue,
  stripTokenSliderUnit,
} from "./token-slider"

interface TokenSliderRowProps {
  config: TokenSliderConfig
  token: TokenName
  value: string
  onChange: (value: string) => void
}

function getTokenInputId(token: TokenName) {
  return `token-slider-row-${token.slice(2).replaceAll(/[^a-z0-9]+/gi, "-")}`
}

export function TokenSliderRow({ config, token, value, onChange }: TokenSliderRowProps) {
  const inputId = getTokenInputId(token)
  const label = TOKEN_LABELS[token]
  const [draftValue, setDraftValue] = React.useState(() =>
    getTokenSliderDraftValue(value, config.unit),
  )
  const lastValidValueRef = React.useRef(
    parseTokenSliderValue(value, config.unit)?.numericValue ?? config.min,
  )

  React.useEffect(() => {
    setDraftValue(getTokenSliderDraftValue(value, config.unit))

    const parsedValue = parseTokenSliderValue(value, config.unit)

    if (parsedValue) {
      lastValidValueRef.current = parsedValue.numericValue
    }
  }, [config, value])

  const parsedDraftValue = parseTokenSliderDraftValue(draftValue, config.unit)
  const sliderValue = clampTokenSliderValue(
    parsedDraftValue?.numericValue ?? lastValidValueRef.current,
    config,
  )

  return (
    <li className="rounded-glass-sm py-1.5">
      <div className="flex items-center gap-3">
        <label htmlFor={inputId} className="truncate text-sm font-medium text-foreground">
          {label}
        </label>
        <Slider
          aria-label={`${label} slider`}
          min={config.min}
          max={config.max}
          step={config.step}
          value={[sliderValue]}
          onValueChange={([nextValue]) => {
            const clampedValue = clampTokenSliderValue(nextValue, config)
            const formattedValue = formatTokenSliderValue(clampedValue, config)

            lastValidValueRef.current = clampedValue
            setDraftValue(stripTokenSliderUnit(formattedValue, config.unit))
            onChange(formattedValue)
          }}
          variant="soft"
          size="sm"
          className="min-w-0 flex-1"
        />
        <div className="flex shrink-0 items-center gap-1.5">
          <Input
            id={inputId}
            type="text"
            inputMode="decimal"
            value={draftValue}
            onChange={(event) => {
              const nextDraftValue = event.target.value
              setDraftValue(nextDraftValue)

              const parsedValue = parseTokenSliderDraftValue(nextDraftValue, config.unit)

              if (!parsedValue) {
                return
              }

              const clampedValue = clampTokenSliderValue(parsedValue.numericValue, config)
              const formattedValue = formatTokenSliderValue(clampedValue, config)
              lastValidValueRef.current = clampedValue
              onChange(formattedValue)
            }}
            variant="transparent"
            className="w-20 text-right"
          />
          <span className="text-xs text-muted-foreground">{config.unit}</span>
        </div>
      </div>
    </li>
  )
}

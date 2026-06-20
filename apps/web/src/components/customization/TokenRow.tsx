import { Input } from "@glass-ui-kit/glass"
import type { TokenName } from "./customization-tokens"
import { TOKEN_LABELS } from "./customization-tokens"
import { TokenColorControl } from "./TokenColorControl"

export { isHexColor } from "./color-value"

interface TokenRowProps {
  token: TokenName
  value: string
  kind: "color" | "text"
  onChange: (value: string) => void
}

function getTokenInputId(token: TokenName) {
  return `token-row-${token.slice(2).replaceAll(/[^a-z0-9]+/gi, "-")}`
}

export function TokenRow({ token, value, kind, onChange }: TokenRowProps) {
  const inputId = getTokenInputId(token)
  const label = TOKEN_LABELS[token]

  return (
    <li className="flex items-center justify-between gap-3 rounded-glass-sm py-1.5">
      {kind === "color" ? (
        <TokenColorControl
          id={inputId}
          label={label}
          value={value}
          onChange={onChange}
          className="w-full justify-between"
          contentClassName="min-w-0"
          labelClassName="truncate"
          inputClassName="w-full max-w-48 shrink-0"
          pickerClassName="shrink-0"
          swatchTestId="color-swatch"
        />
      ) : (
        <>
          <div className="flex min-w-0 items-center gap-3">
            <label htmlFor={inputId} className="truncate text-sm font-medium text-foreground">
              {label}
            </label>
          </div>
          <Input
            id={inputId}
            type="text"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            variant="transparent"
            className="w-full max-w-48 shrink-0"
          />
        </>
      )}
    </li>
  )
}

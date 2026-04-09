import type { TokenName } from "./customization-tokens"

interface TokenRowProps {
  token: TokenName
  value: string
  onChange: (value: string) => void
}

function getTokenInputId(token: TokenName) {
  return `token-row-${token.slice(2).replaceAll(/[^a-z0-9]+/gi, "-")}`
}

export function TokenRow({ token, value, onChange }: TokenRowProps) {
  const inputId = getTokenInputId(token)

  return (
    <li className="flex items-center justify-between gap-3 rounded-xl border border-border/60 bg-background/80 px-3 py-2">
      <label htmlFor={inputId} className="min-w-0 text-sm font-medium text-foreground">
        {token}
      </label>
      <input
        id={inputId}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label={token}
        className="min-h-9 w-full max-w-56 rounded-md border border-border bg-background px-3 text-sm text-foreground shadow-sm"
      />
    </li>
  )
}

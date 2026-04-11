import { CANONICAL_TOKEN_ORDER, type TokenName, type TokenValues } from "./customization-tokens"
import type { PreviewMode } from "./CustomizationToolbar"
import { TokenRow } from "./TokenRow"
import { filterTokenGroups } from "./token-filter"

interface TokenControlsPanelProps {
  filterQuery: string
  previewMode: PreviewMode
  values: TokenValues
  onFilterQueryChange: (value: string) => void
  onTokenChange: (token: TokenName, value: string) => void
}

export function TokenControlsPanel({
  filterQuery,
  previewMode,
  values,
  onFilterQueryChange,
  onTokenChange,
}: TokenControlsPanelProps) {
  const tokenGroups = filterTokenGroups(values, filterQuery)

  return (
    <div className="flex h-full min-h-0 flex-col gap-4 overflow-hidden">
      <section className="glass shrink-0 rounded-glass-md p-4">nueva seccion</section>

      <section
        aria-label="Token controls"
        className="glass flex min-h-0 flex-1 flex-col rounded-glass-md p-4"
      >
        <div className="flex min-h-0 flex-1 flex-col space-y-6 overflow-y-auto no-scrollbar">
          <div className="space-y-2">
            <label htmlFor="token-filter" className="text-sm font-medium text-foreground">
              Filter tokens
            </label>
            <input
              id="token-filter"
              type="search"
              value={filterQuery}
              onChange={(event) => onFilterQueryChange(event.target.value)}
              aria-label="Filter tokens"
              placeholder="Search tokens"
              className="min-h-9 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground shadow-sm"
            />
          </div>
          {tokenGroups.map((group) => (
            <section
              key={group.id}
              aria-labelledby={`token-group-${group.id}`}
              className="space-y-3"
            >
              <h2 id={`token-group-${group.id}`} className="text-sm font-semibold text-foreground">
                {group.label}
              </h2>
              <ul className="space-y-2">
                {group.rows.map((row) => (
                  <TokenRow
                    key={row.token}
                    token={row.token}
                    value={row.value}
                    onChange={(value) => onTokenChange(row.token, value)}
                  />
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>
    </div>
  )
}

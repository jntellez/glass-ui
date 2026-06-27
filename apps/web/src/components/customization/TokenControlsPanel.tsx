import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Input,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@glass-ui-kit/glass"
import * as React from "react"
import { type TokenName, type TokenTab, type TokenValues } from "./customization-tokens"
import type { PreviewMode } from "./CustomizationToolbar"
import { ThemeSelector } from "./ThemeSelector"
import { filterTokenGroups } from "./token-filter"
import { parseShadowValue } from "./token-shadow"
import { getTokenSliderConfig } from "./token-slider"
import { TokenRow } from "./TokenRow"
import { TokenShadowRow } from "./TokenShadowRow"
import { TokenSliderRow } from "./TokenSliderRow"

interface TokenControlsPanelProps {
  filterQuery: string
  presetValue: string | null
  previewMode: PreviewMode
  values: TokenValues
  onFilterQueryChange: (value: string) => void
  onPresetChange: (presetId: string) => void
  onTokenChange: (token: TokenName, value: string) => void
}

export function TokenControlsPanel({
  filterQuery,
  presetValue,
  previewMode,
  values,
  onFilterQueryChange,
  onPresetChange,
  onTokenChange,
}: TokenControlsPanelProps) {
  const [activeTab, setActiveTab] = React.useState<TokenTab>("colors")
  const colorGroups = filterTokenGroups(values, activeTab === "colors" ? filterQuery : "", "colors")
  const otherGroups = filterTokenGroups(values, "", "other")

  return (
    <div className="flex w-full h-full min-h-0 flex-col gap-4 overflow-hidden">
      <section>
        <ThemeSelector
          value={presetValue ?? "default"}
          previewMode={previewMode}
          onPresetChange={onPresetChange}
        />
      </section>

      <section
        aria-label="Token controls"
        className="glass glass-soft flex min-h-0 flex-1 flex-col rounded-glass-md p-4 shadow-glass-sm"
      >
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as TokenTab)}
          className="flex min-h-0 flex-1 flex-col gap-3"
        >
          <TabsList
            aria-label="Token categories"
            variant="soft"
            className="w-full self-stretch bg-transparent"
          >
            <TabsTrigger value="colors" size="lg">
              Colors
            </TabsTrigger>
            <TabsTrigger value="other" size="lg">
              Other
            </TabsTrigger>
          </TabsList>

          {activeTab === "colors" && (
            <div className="space-y-1.5 pb-2">
              <Input
                id="token-color-filter"
                type="search"
                value={filterQuery}
                onChange={(event) => onFilterQueryChange(event.target.value)}
                aria-label="Search colors"
                placeholder="Search colors..."
                variant="soft"
                className="w-full h-10"
              />
            </div>
          )}

          <TabsContent
            value="colors"
            className="mt-0 flex min-h-0 flex-1 flex-col overflow-hidden rounded-none border-0 bg-transparent backdrop-blur-none p-0 text-foreground shadow-none"
          >
            <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto no-scrollbar pr-1">
              {colorGroups.map((group) => (
                <Collapsible key={group.id} defaultOpen className="gap-1.5">
                  <CollapsibleTrigger>{group.label}</CollapsibleTrigger>
                  <CollapsibleContent>
                    <ul className="space-y-1.5">
                      {group.rows.map((row) => (
                        <TokenRow
                          key={row.token}
                          token={row.token}
                          value={row.value}
                          kind="color"
                          onChange={(value) => onTokenChange(row.token, value)}
                        />
                      ))}
                    </ul>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </TabsContent>

          <TabsContent
            value="other"
            className="mt-0 flex min-h-0 flex-1 flex-col overflow-hidden rounded-none border-0 bg-transparent p-0 text-foreground shadow-none backdrop-blur-none"
          >
            <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto no-scrollbar pr-1">
              {otherGroups.map((group) => (
                <Collapsible key={group.id} defaultOpen className="gap-1.5">
                  <CollapsibleTrigger>{group.label}</CollapsibleTrigger>
                  <CollapsibleContent>
                    <ul className="space-y-1.5">
                      {group.rows.map((row) => (
                        <OtherTokenRow
                          key={row.token}
                          token={row.token}
                          value={row.value}
                          onChange={onTokenChange}
                        />
                      ))}
                    </ul>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  )
}

interface OtherTokenRowProps {
  token: TokenName
  value: string
  onChange: (token: TokenName, value: string) => void
}

function OtherTokenRow({ token, value, onChange }: OtherTokenRowProps) {
  const sliderConfig = getTokenSliderConfig(token)

  if (sliderConfig) {
    return (
      <TokenSliderRow
        token={token}
        value={value}
        config={sliderConfig}
        onChange={(nextValue) => onChange(token, nextValue)}
      />
    )
  }

  if (token !== "--glass-shadow" && parseShadowValue(value)) {
    return (
      <TokenShadowRow
        token={token}
        value={value}
        onChange={(nextValue) => onChange(token, nextValue)}
      />
    )
  }

  return (
    <TokenRow
      token={token}
      value={value}
      kind="text"
      onChange={(nextValue) => onChange(token, nextValue)}
    />
  )
}

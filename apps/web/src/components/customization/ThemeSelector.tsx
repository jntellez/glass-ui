import { Button, Input, Popover, PopoverContent, PopoverTrigger } from "@glass-ui-kit/glass"
import { CheckIcon, ChevronDownIcon } from "lucide-react"
import * as React from "react"
import { DEFAULT_LIGHT_TOKENS, type ThemeTokenValues } from "./customization-tokens"
import { filterThemePresets } from "./theme-filter"
import { BUILT_IN_THEME_PRESETS, resolvePresetSwatches, type ThemePreset } from "./theme-presets"

interface ThemeSelectorProps {
  value: string
  onPresetChange: (presetId: string) => void
  themes?: ThemePreset[]
  values?: ThemeTokenValues
}

export function ThemeSelector({
  value,
  onPresetChange,
  themes = BUILT_IN_THEME_PRESETS,
  values = DEFAULT_LIGHT_TOKENS,
}: ThemeSelectorProps) {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const currentPreset = themes.find((preset) => preset.id === value) ?? themes[0]
  const visiblePresets = filterThemePresets(themes, query)
  const currentSwatches = resolvePresetSwatches(currentPreset, values)

  const handleSelect = React.useCallback(
    (presetId: string) => {
      onPresetChange(presetId)
      setOpen(false)
      setQuery("")
    },
    [onPresetChange],
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          aria-label={`Select theme: ${currentPreset.name}`}
          aria-expanded={open}
          aria-haspopup="dialog"
          variant="soft"
          className="h-15 w-full justify-between rounded-glass-md px-4"
        >
          <span className="flex items-center gap-3">
            <PresetSwatches swatches={currentSwatches} />
            <span className="text-sm font-medium">{currentPreset.name}</span>
          </span>
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-95 p-3" align="center">
        <div className="space-y-3">
          <Input
            type="search"
            placeholder="Search themes..."
            aria-label="Search themes"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full"
          />

          <div className="max-h-72 overflow-y-auto no-scrollbar" aria-label="Themes">
            {visiblePresets.length === 0 ? (
              <p className="px-2 py-3 text-center text-sm text-muted-foreground">
                No themes match your search.
              </p>
            ) : (
              <ul className="space-y-1">
                {visiblePresets.map((preset) => {
                  const swatches = resolvePresetSwatches(preset, values)
                  const isSelected = preset.id === currentPreset.id

                  return (
                    <li key={preset.id}>
                      <button
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => handleSelect(preset.id)}
                        className="flex w-full items-center gap-3 rounded-glass-sm px-2 py-2 text-left transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                      >
                        <PresetSwatches swatches={swatches} />
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-medium">{preset.name}</span>
                          <span className="block truncate text-xs text-muted-foreground">
                            {preset.description}
                          </span>
                        </span>
                        {isSelected && (
                          <CheckIcon aria-hidden="true" className="size-4 text-foreground" />
                        )}
                      </button>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

function PresetSwatches({ swatches }: { swatches: string[] }) {
  return (
    <span className="flex -space-x-1.5">
      {swatches.map((swatch, index) => (
        <span
          key={`${swatch}-${index}`}
          data-testid="preset-swatch"
          className="inline-block size-5 rounded-full border border-glass-border shadow-sm"
          style={{ backgroundColor: swatch }}
          aria-hidden="true"
        />
      ))}
    </span>
  )
}

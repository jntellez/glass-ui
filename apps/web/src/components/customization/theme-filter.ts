import type { ThemePreset } from "./theme-presets"

export function filterThemePresets(presets: ThemePreset[], query: string): ThemePreset[] {
  const normalizedQuery = query.trim().toLowerCase()

  if (!normalizedQuery) {
    return presets
  }

  return presets.filter(
    (preset) =>
      preset.name.toLowerCase().includes(normalizedQuery) ||
      preset.description.toLowerCase().includes(normalizedQuery),
  )
}

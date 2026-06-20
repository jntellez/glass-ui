import {
  DEFAULT_DARK_TOKENS,
  DEFAULT_LIGHT_TOKENS,
  PRESET_TOKEN_MAP,
  type PresetVariant,
  type ThemeTokenName,
  type ThemeTokenValues,
} from "./customization-tokens"

export interface ThemePreset {
  id: string
  name: string
  description: string
  variant: PresetVariant | null
  swatches: ThemeTokenName[]
}

export const BUILT_IN_THEME_PRESETS: ThemePreset[] = [
  {
    id: "default",
    name: "Default",
    description: "Balanced glass surfaces for most contexts.",
    variant: null,
    swatches: ["--foreground", "--accent", "--destructive", "--glass-bg"],
  },
  {
    id: "soft",
    name: "Soft",
    description: "Subtle, low-contrast glass treatments.",
    variant: "soft",
    swatches: ["--foreground", "--accent", "--destructive", "--glass-bg-soft"],
  },
  {
    id: "strong",
    name: "Strong",
    description: "Pronounced glass surfaces with extra presence.",
    variant: "strong",
    swatches: ["--foreground", "--accent", "--destructive", "--glass-bg-strong"],
  },
]

export function getPresetVariant(presetId: string): PresetVariant | null {
  const preset = BUILT_IN_THEME_PRESETS.find((item) => item.id === presetId)
  return preset?.variant ?? null
}

export function resolvePresetSwatches(
  preset: ThemePreset,
  values: ThemeTokenValues = DEFAULT_LIGHT_TOKENS,
): string[] {
  return preset.swatches.map((token) => values[token])
}

export function getDefaultBaseTokens(previewMode: "light" | "dark"): ThemeTokenValues {
  return previewMode === "dark" ? DEFAULT_DARK_TOKENS : DEFAULT_LIGHT_TOKENS
}

export { PRESET_TOKEN_MAP }

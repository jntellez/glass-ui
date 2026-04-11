export const CANONICAL_TOKEN_ORDER = [
  "--foreground",
  "--muted-foreground",
  "--accent",
  "--accent-foreground",
  "--destructive",
  "--destructive-foreground",
  "--glass-bg",
  "--glass-border",
  "--glass-shadow",
  "--glass-blur",
  "--glass-shadow-sm",
  "--glass-shadow-md",
  "--glass-shadow-lg",
  "--glass-radius-sm",
  "--glass-radius-md",
  "--glass-radius-lg",
  "--glass-radius-xl",
  "--glass-bg-strong",
  "--glass-border-strong",
  "--glass-blur-strong",
  "--glass-bg-soft",
  "--glass-border-soft",
  "--glass-blur-soft",
] as const

export type TokenName = (typeof CANONICAL_TOKEN_ORDER)[number]
export type TokenValues = Record<TokenName, string>
export const RADIUS_TOKEN_NAMES = [
  "--glass-radius-sm",
  "--glass-radius-md",
  "--glass-radius-lg",
  "--glass-radius-xl",
] as const satisfies readonly TokenName[]
export type RadiusTokenName = (typeof RADIUS_TOKEN_NAMES)[number]
export type RadiusTokenValues = Record<RadiusTokenName, string>
export type ThemeTokenName = Exclude<TokenName, RadiusTokenName>
export type ThemeTokenValues = Record<ThemeTokenName, string>
export type PresetVariant = "soft" | "strong"

export const DEFAULT_RADIUS_TOKENS: RadiusTokenValues = {
  "--glass-radius-sm": "0.375rem",
  "--glass-radius-md": "0.75rem",
  "--glass-radius-lg": "1rem",
  "--glass-radius-xl": "1.5rem",
}

export const DEFAULT_LIGHT_TOKENS: ThemeTokenValues = {
  "--foreground": "#18181b",
  "--muted-foreground": "#3f3f46",
  "--accent": "#d946ef",
  "--accent-foreground": "#ffffff",
  "--destructive": "#dc2626",
  "--destructive-foreground": "#ffffff",
  "--glass-bg": "rgba(255, 255, 255, 0.35)",
  "--glass-border": "rgba(255, 255, 255, 0.6)",
  "--glass-shadow": "var(--glass-shadow-sm)",
  "--glass-blur": "6px",
  "--glass-shadow-sm": "0 2px 8px 0 rgba(0, 0, 0, 0.06)",
  "--glass-shadow-md": "0 4px 30px 0 rgba(0, 0, 0, 0.1)",
  "--glass-shadow-lg": "0 8px 40px 0 rgba(0, 0, 0, 0.2)",
  "--glass-bg-strong": "rgba(255, 255, 255, 0.5)",
  "--glass-border-strong": "rgba(255, 255, 255, 0.8)",
  "--glass-blur-strong": "10px",
  "--glass-bg-soft": "rgba(255, 255, 255, 0.2)",
  "--glass-border-soft": "rgba(255, 255, 255, 0.4)",
  "--glass-blur-soft": "2px",
}

export const DEFAULT_DARK_TOKENS: ThemeTokenValues = {
  "--foreground": "#fafafa",
  "--muted-foreground": "#d4d4d8",
  "--accent": "#c084fc",
  "--accent-foreground": "#18181b",
  "--destructive": "#f87171",
  "--destructive-foreground": "#18181b",
  "--glass-bg": "rgba(255, 255, 255, 0.08)",
  "--glass-border": "rgba(255, 255, 255, 0.1)",
  "--glass-shadow": "var(--glass-shadow-sm)",
  "--glass-blur": "6px",
  "--glass-shadow-sm": "0 2px 8px 0 rgba(0, 0, 0, 0.1)",
  "--glass-shadow-md": "0 4px 30px 0 rgba(0, 0, 0, 0.2)",
  "--glass-shadow-lg": "0 8px 40px 0 rgba(0, 0, 0, 0.35)",
  "--glass-bg-strong": "rgba(255, 255, 255, 0.15)",
  "--glass-border-strong": "rgba(255, 255, 255, 0.2)",
  "--glass-blur-strong": "10px",
  "--glass-bg-soft": "rgba(255, 255, 255, 0.03)",
  "--glass-border-soft": "rgba(255, 255, 255, 0.06)",
  "--glass-blur-soft": "2px",
}

export const TOKEN_GROUPS = [
  {
    id: "text",
    label: "Text",
    tokens: ["--foreground", "--muted-foreground"],
  },
  {
    id: "accent",
    label: "Accent",
    tokens: ["--accent", "--accent-foreground"],
  },
  {
    id: "status",
    label: "Status",
    tokens: ["--destructive", "--destructive-foreground"],
  },
  {
    id: "base",
    label: "Base glass",
    tokens: ["--glass-bg", "--glass-border", "--glass-shadow", "--glass-blur"],
  },
  {
    id: "shadows",
    label: "Shadows",
    tokens: ["--glass-shadow-sm", "--glass-shadow-md", "--glass-shadow-lg"],
  },
  {
    id: "radius",
    label: "Radius",
    tokens: ["--glass-radius-sm", "--glass-radius-md", "--glass-radius-lg", "--glass-radius-xl"],
  },
  {
    id: "variants",
    label: "Variant tokens",
    tokens: [
      "--glass-bg-strong",
      "--glass-border-strong",
      "--glass-blur-strong",
      "--glass-bg-soft",
      "--glass-border-soft",
      "--glass-blur-soft",
    ],
  },
] as const satisfies ReadonlyArray<{
  id: string
  label: string
  tokens: readonly TokenName[]
}>

export const PRESET_TOKEN_MAP = {
  soft: {
    "--glass-bg": "--glass-bg-soft",
    "--glass-border": "--glass-border-soft",
    "--glass-blur": "--glass-blur-soft",
  },
  strong: {
    "--glass-bg": "--glass-bg-strong",
    "--glass-border": "--glass-border-strong",
    "--glass-blur": "--glass-blur-strong",
  },
} as const satisfies Record<
  PresetVariant,
  Readonly<Record<"--glass-bg" | "--glass-border" | "--glass-blur", TokenName>>
>

export function isRadiusToken(token: TokenName): token is RadiusTokenName {
  return RADIUS_TOKEN_NAMES.includes(token as RadiusTokenName)
}

export function getEditorTokenValues(
  values: ThemeTokenValues,
  radiusValues: RadiusTokenValues,
): TokenValues {
  return {
    ...values,
    ...radiusValues,
  }
}

export function applyPreset(values: ThemeTokenValues, variant: PresetVariant): ThemeTokenValues {
  const preset = PRESET_TOKEN_MAP[variant]

  return {
    ...values,
    "--glass-bg": values[preset["--glass-bg"]],
    "--glass-border": values[preset["--glass-border"]],
    "--glass-blur": values[preset["--glass-blur"]],
  }
}

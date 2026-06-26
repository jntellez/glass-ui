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
export type TokenTab = "colors" | "other"

export const DEFAULT_RADIUS_TOKENS: RadiusTokenValues = {
  "--glass-radius-sm": "0.375rem",
  "--glass-radius-md": "0.75rem",
  "--glass-radius-lg": "1rem",
  "--glass-radius-xl": "1.5rem",
}

export const DEFAULT_LIGHT_TOKENS: ThemeTokenValues = {
  "--foreground": "#18181b",
  "--muted-foreground": "#3f3f46",
  "--accent": "#3f3f46",
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
  "--accent": "#d4d4d8",
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

export const TOKEN_LABELS: Record<TokenName, string> = {
  "--foreground": "Foreground",
  "--muted-foreground": "Muted foreground",
  "--accent": "Accent",
  "--accent-foreground": "Accent foreground",
  "--destructive": "Destructive",
  "--destructive-foreground": "Destructive foreground",
  "--glass-bg": "Background",
  "--glass-border": "Border",
  "--glass-shadow": "Shadow",
  "--glass-blur": "Blur",
  "--glass-shadow-sm": "Shadow small",
  "--glass-shadow-md": "Shadow medium",
  "--glass-shadow-lg": "Shadow large",
  "--glass-radius-sm": "Radius small",
  "--glass-radius-md": "Radius medium",
  "--glass-radius-lg": "Radius large",
  "--glass-radius-xl": "Radius extra large",
  "--glass-bg-strong": "Strong background",
  "--glass-border-strong": "Strong border",
  "--glass-blur-strong": "Strong blur",
  "--glass-bg-soft": "Soft background",
  "--glass-border-soft": "Soft border",
  "--glass-blur-soft": "Soft blur",
}

export const TOKEN_GROUPS = [
  {
    id: "text",
    label: "Text",
    tab: "colors",
    tokens: ["--foreground", "--muted-foreground"],
  },
  {
    id: "accent",
    label: "Accent",
    tab: "colors",
    tokens: ["--accent", "--accent-foreground"],
  },
  {
    id: "status",
    label: "Status",
    tab: "colors",
    tokens: ["--destructive", "--destructive-foreground"],
  },
  {
    id: "base",
    label: "Base glass",
    tab: "colors",
    tokens: ["--glass-bg", "--glass-border"],
  },
  {
    id: "variants",
    label: "Variant tokens",
    tab: "colors",
    tokens: [
      "--glass-bg-strong",
      "--glass-border-strong",
      "--glass-bg-soft",
      "--glass-border-soft",
    ],
  },
  {
    id: "shadows",
    label: "Shadows",
    tab: "other",
    tokens: ["--glass-shadow-sm", "--glass-shadow-md", "--glass-shadow-lg"],
  },
  {
    id: "radius",
    label: "Radius",
    tab: "other",
    tokens: ["--glass-radius-sm", "--glass-radius-md", "--glass-radius-lg", "--glass-radius-xl"],
  },
  {
    id: "blur",
    label: "Blur",
    tab: "other",
    tokens: ["--glass-blur", "--glass-blur-strong", "--glass-blur-soft"],
  },
] as const satisfies ReadonlyArray<{
  id: string
  label: string
  tab: TokenTab
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

export function getGroupsForTab(tab: TokenTab) {
  return TOKEN_GROUPS.filter((group) => group.tab === tab)
}

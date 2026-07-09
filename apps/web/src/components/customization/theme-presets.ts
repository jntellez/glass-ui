import {
  DEFAULT_DARK_TOKENS,
  DEFAULT_LIGHT_TOKENS,
  type ThemeTokenName,
  type ThemeTokenValues,
} from "./customization-tokens"

export type ThemePresetMode = "light" | "dark"

export interface ThemePreset {
  id: string
  name: string
  description: string
  swatches: ThemeTokenName[]
  tokens: {
    light: Partial<ThemeTokenValues>
    dark: Partial<ThemeTokenValues>
  }
}

export const BUILT_IN_THEME_PRESETS: ThemePreset[] = [
  {
    id: "default",
    name: "Default",
    description: "Balanced glass for most surfaces.",
    swatches: ["--foreground", "--accent", "--destructive", "--glass-bg"],
    tokens: {
      light: {},
      dark: {},
    },
  },
  {
    id: "clean-slate",
    name: "Clean Slate",
    description: "Cool neutral SaaS palette.",
    swatches: ["--foreground", "--accent", "--destructive", "--glass-bg"],
    tokens: {
      light: {
        "--foreground": "#0f172a",
        "--muted-foreground": "#56657a",
        "--accent": "#1d4ed8",
        "--accent-foreground": "#ffffff",
        "--destructive": "#c2410c",
        "--destructive-foreground": "#ffffff",
        "--glass-bg": "rgba(248, 250, 252, 0.82)",
        "--glass-border": "rgba(148, 163, 184, 0.34)",
        "--glass-shadow": "var(--glass-shadow-md)",
        "--glass-blur": "16px",
        "--glass-shadow-sm": "0 10px 26px 0 rgba(15, 23, 42, 0.08)",
        "--glass-shadow-md": "0 22px 54px 0 rgba(15, 23, 42, 0.13)",
        "--glass-shadow-lg": "0 32px 86px 0 rgba(15, 23, 42, 0.18)",
        "--glass-bg-strong": "rgba(255, 255, 255, 0.9)",
        "--glass-border-strong": "rgba(148, 163, 184, 0.48)",
        "--glass-blur-strong": "22px",
        "--glass-bg-soft": "rgba(255, 255, 255, 0.62)",
        "--glass-border-soft": "rgba(148, 163, 184, 0.22)",
        "--glass-blur-soft": "8px",
      },
      dark: {
        "--foreground": "#f1f5f9",
        "--muted-foreground": "#a7b4c8",
        "--accent": "#7dd3fc",
        "--accent-foreground": "#0f172a",
        "--destructive": "#fb923c",
        "--destructive-foreground": "#111827",
        "--glass-bg": "rgba(15, 23, 42, 0.78)",
        "--glass-border": "rgba(148, 163, 184, 0.24)",
        "--glass-shadow": "var(--glass-shadow-md)",
        "--glass-blur": "16px",
        "--glass-shadow-sm": "0 10px 28px 0 rgba(2, 6, 23, 0.28)",
        "--glass-shadow-md": "0 22px 58px 0 rgba(2, 6, 23, 0.36)",
        "--glass-shadow-lg": "0 36px 94px 0 rgba(2, 6, 23, 0.46)",
        "--glass-bg-strong": "rgba(15, 23, 42, 0.86)",
        "--glass-border-strong": "rgba(148, 163, 184, 0.34)",
        "--glass-blur-strong": "22px",
        "--glass-bg-soft": "rgba(15, 23, 42, 0.58)",
        "--glass-border-soft": "rgba(148, 163, 184, 0.16)",
        "--glass-blur-soft": "8px",
      },
    },
  },
  {
    id: "midnight-bloom",
    name: "Midnight Bloom",
    description: "Violet-blue glass with lush depth.",
    swatches: ["--foreground", "--accent", "--destructive", "--glass-bg"],
    tokens: {
      light: {
        "--foreground": "#22143d",
        "--muted-foreground": "#6d5f90",
        "--accent": "#5b4df6",
        "--accent-foreground": "#ffffff",
        "--destructive": "#e11d48",
        "--destructive-foreground": "#ffffff",
        "--glass-bg": "rgba(245, 240, 255, 0.84)",
        "--glass-border": "rgba(139, 92, 246, 0.32)",
        "--glass-shadow": "var(--glass-shadow-md)",
        "--glass-blur": "16px",
        "--glass-shadow-sm": "0 10px 28px 0 rgba(91, 33, 182, 0.12)",
        "--glass-shadow-md": "0 24px 60px 0 rgba(76, 29, 149, 0.18)",
        "--glass-shadow-lg": "0 34px 90px 0 rgba(49, 46, 129, 0.2)",
        "--glass-bg-strong": "rgba(237, 233, 254, 0.94)",
        "--glass-border-strong": "rgba(129, 140, 248, 0.44)",
        "--glass-blur-strong": "24px",
        "--glass-bg-soft": "rgba(255, 255, 255, 0.62)",
        "--glass-border-soft": "rgba(196, 181, 253, 0.22)",
        "--glass-blur-soft": "10px",
      },
      dark: {
        "--foreground": "#f5f3ff",
        "--muted-foreground": "#c4b5fd",
        "--accent": "#a78bfa",
        "--accent-foreground": "#f8fafc",
        "--destructive": "#fb7185",
        "--destructive-foreground": "#1f1135",
        "--glass-bg": "rgba(30, 27, 75, 0.8)",
        "--glass-border": "rgba(167, 139, 250, 0.28)",
        "--glass-shadow": "var(--glass-shadow-md)",
        "--glass-blur": "18px",
        "--glass-shadow-sm": "0 10px 30px 0 rgba(15, 23, 42, 0.38)",
        "--glass-shadow-md": "0 26px 72px 0 rgba(15, 23, 42, 0.5)",
        "--glass-shadow-lg": "0 36px 104px 0 rgba(8, 12, 32, 0.58)",
        "--glass-bg-strong": "rgba(49, 46, 129, 0.9)",
        "--glass-border-strong": "rgba(167, 139, 250, 0.34)",
        "--glass-blur-strong": "26px",
        "--glass-bg-soft": "rgba(30, 41, 59, 0.54)",
        "--glass-border-soft": "rgba(129, 140, 248, 0.18)",
        "--glass-blur-soft": "10px",
      },
    },
  },
  {
    id: "caffeine",
    name: "Caffeine",
    description: "Warm cream and coffee tones.",
    swatches: ["--foreground", "--accent", "--destructive", "--glass-bg"],
    tokens: {
      light: {
        "--foreground": "#3b2416",
        "--muted-foreground": "#8b6b53",
        "--accent": "#9a5b2c",
        "--accent-foreground": "#fffaf5",
        "--destructive": "#c2410c",
        "--destructive-foreground": "#fff7ed",
        "--glass-bg": "rgba(255, 248, 240, 0.86)",
        "--glass-border": "rgba(180, 126, 82, 0.3)",
        "--glass-shadow": "var(--glass-shadow-sm)",
        "--glass-blur": "14px",
        "--glass-shadow-sm": "0 8px 26px 0 rgba(120, 53, 15, 0.08)",
        "--glass-shadow-md": "0 20px 52px 0 rgba(120, 53, 15, 0.14)",
        "--glass-shadow-lg": "0 28px 82px 0 rgba(92, 42, 14, 0.16)",
        "--glass-bg-strong": "rgba(255, 251, 245, 0.95)",
        "--glass-border-strong": "rgba(161, 98, 7, 0.36)",
        "--glass-blur-strong": "20px",
        "--glass-bg-soft": "rgba(255, 244, 230, 0.64)",
        "--glass-border-soft": "rgba(180, 126, 82, 0.18)",
        "--glass-blur-soft": "8px",
      },
      dark: {
        "--foreground": "#fef3e6",
        "--muted-foreground": "#d6b798",
        "--accent": "#f0b27a",
        "--accent-foreground": "#2b1d15",
        "--destructive": "#fb923c",
        "--destructive-foreground": "#2b1d15",
        "--glass-bg": "rgba(54, 35, 24, 0.82)",
        "--glass-border": "rgba(240, 178, 122, 0.24)",
        "--glass-shadow": "var(--glass-shadow-sm)",
        "--glass-blur": "16px",
        "--glass-shadow-sm": "0 10px 28px 0 rgba(20, 10, 6, 0.3)",
        "--glass-shadow-md": "0 26px 64px 0 rgba(20, 10, 6, 0.42)",
        "--glass-shadow-lg": "0 34px 96px 0 rgba(20, 10, 6, 0.48)",
        "--glass-bg-strong": "rgba(69, 44, 29, 0.92)",
        "--glass-border-strong": "rgba(234, 179, 122, 0.3)",
        "--glass-blur-strong": "24px",
        "--glass-bg-soft": "rgba(41, 27, 19, 0.58)",
        "--glass-border-soft": "rgba(212, 163, 115, 0.14)",
        "--glass-blur-soft": "8px",
      },
    },
  },
  {
    id: "candyland",
    name: "Candyland",
    description: "Playful pastel pop.",
    swatches: ["--foreground", "--accent", "--destructive", "--glass-bg"],
    tokens: {
      light: {
        "--foreground": "#5b214f",
        "--muted-foreground": "#7c3f71",
        "--accent": "#0891b2",
        "--accent-foreground": "#062c30",
        "--destructive": "#ec4899",
        "--destructive-foreground": "#ffffff",
        "--glass-bg": "rgba(255, 240, 250, 0.88)",
        "--glass-border": "rgba(244, 114, 182, 0.3)",
        "--glass-shadow": "var(--glass-shadow-md)",
        "--glass-blur": "16px",
        "--glass-shadow-sm": "0 8px 24px 0 rgba(236, 72, 153, 0.12)",
        "--glass-shadow-md": "0 20px 52px 0 rgba(34, 211, 238, 0.16)",
        "--glass-shadow-lg": "0 30px 84px 0 rgba(16, 185, 129, 0.16)",
        "--glass-bg-strong": "rgba(255, 255, 255, 0.94)",
        "--glass-border-strong": "rgba(236, 72, 153, 0.36)",
        "--glass-blur-strong": "22px",
        "--glass-bg-soft": "rgba(255, 226, 245, 0.68)",
        "--glass-border-soft": "rgba(103, 232, 249, 0.22)",
        "--glass-blur-soft": "10px",
      },
      dark: {
        "--foreground": "#ffe4f3",
        "--muted-foreground": "#f9a8d4",
        "--accent": "#7dd3fc",
        "--accent-foreground": "#083344",
        "--destructive": "#86efac",
        "--destructive-foreground": "#052e16",
        "--glass-bg": "rgba(91, 33, 75, 0.8)",
        "--glass-border": "rgba(244, 114, 182, 0.26)",
        "--glass-shadow": "var(--glass-shadow-md)",
        "--glass-blur": "18px",
        "--glass-shadow-sm": "0 12px 28px 0 rgba(79, 18, 62, 0.3)",
        "--glass-shadow-md": "0 28px 68px 0 rgba(49, 46, 129, 0.38)",
        "--glass-shadow-lg": "0 38px 104px 0 rgba(21, 94, 117, 0.38)",
        "--glass-bg-strong": "rgba(131, 24, 67, 0.88)",
        "--glass-border-strong": "rgba(103, 232, 249, 0.28)",
        "--glass-blur-strong": "24px",
        "--glass-bg-soft": "rgba(80, 7, 36, 0.56)",
        "--glass-border-soft": "rgba(74, 222, 128, 0.18)",
        "--glass-blur-soft": "10px",
      },
    },
  },
  {
    id: "graphite",
    name: "Graphite",
    description: "Monochrome enterprise focus.",
    swatches: ["--foreground", "--accent", "--destructive", "--glass-bg"],
    tokens: {
      light: {
        "--foreground": "#111111",
        "--muted-foreground": "#444444",
        "--accent": "#2f2f2f",
        "--accent-foreground": "#fafafa",
        "--destructive": "#b91c1c",
        "--destructive-foreground": "#ffffff",
        "--glass-bg": "rgba(245, 245, 245, 0.84)",
        "--glass-border": "rgba(115, 115, 115, 0.24)",
        "--glass-shadow": "var(--glass-shadow-sm)",
        "--glass-blur": "12px",
        "--glass-shadow-sm": "0 8px 20px 0 rgba(38, 38, 38, 0.08)",
        "--glass-shadow-md": "0 20px 48px 0 rgba(38, 38, 38, 0.14)",
        "--glass-shadow-lg": "0 28px 76px 0 rgba(38, 38, 38, 0.16)",
        "--glass-bg-strong": "rgba(255, 255, 255, 0.92)",
        "--glass-border-strong": "rgba(115, 115, 115, 0.34)",
        "--glass-blur-strong": "18px",
        "--glass-bg-soft": "rgba(229, 229, 229, 0.62)",
        "--glass-border-soft": "rgba(163, 163, 163, 0.16)",
        "--glass-blur-soft": "6px",
      },
      dark: {
        "--foreground": "#f5f5f5",
        "--muted-foreground": "#b5b5b5",
        "--accent": "#f0f0f0",
        "--accent-foreground": "#171717",
        "--destructive": "#f87171",
        "--destructive-foreground": "#171717",
        "--glass-bg": "rgba(24, 24, 27, 0.84)",
        "--glass-border": "rgba(115, 115, 115, 0.24)",
        "--glass-shadow": "var(--glass-shadow-sm)",
        "--glass-blur": "14px",
        "--glass-shadow-sm": "0 10px 24px 0 rgba(0, 0, 0, 0.3)",
        "--glass-shadow-md": "0 24px 56px 0 rgba(0, 0, 0, 0.42)",
        "--glass-shadow-lg": "0 34px 88px 0 rgba(0, 0, 0, 0.48)",
        "--glass-bg-strong": "rgba(38, 38, 38, 0.92)",
        "--glass-border-strong": "rgba(163, 163, 163, 0.3)",
        "--glass-blur-strong": "22px",
        "--glass-bg-soft": "rgba(23, 23, 23, 0.58)",
        "--glass-border-soft": "rgba(115, 115, 115, 0.16)",
        "--glass-blur-soft": "8px",
      },
    },
  },
  {
    id: "kodama-grove",
    name: "Kodama Grove",
    description: "Organic greens and earth.",
    swatches: ["--foreground", "--accent", "--destructive", "--glass-bg"],
    tokens: {
      light: {
        "--foreground": "#1f2f1f",
        "--muted-foreground": "#5f7158",
        "--accent": "#2f855a",
        "--accent-foreground": "#f6fff7",
        "--destructive": "#b45309",
        "--destructive-foreground": "#fff7ed",
        "--glass-bg": "rgba(243, 248, 238, 0.86)",
        "--glass-border": "rgba(63, 125, 78, 0.26)",
        "--glass-shadow": "var(--glass-shadow-sm)",
        "--glass-blur": "14px",
        "--glass-shadow-sm": "0 8px 22px 0 rgba(63, 125, 78, 0.08)",
        "--glass-shadow-md": "0 20px 50px 0 rgba(63, 125, 78, 0.14)",
        "--glass-shadow-lg": "0 28px 82px 0 rgba(92, 114, 62, 0.16)",
        "--glass-bg-strong": "rgba(252, 255, 249, 0.94)",
        "--glass-border-strong": "rgba(63, 125, 78, 0.34)",
        "--glass-blur-strong": "20px",
        "--glass-bg-soft": "rgba(230, 241, 224, 0.64)",
        "--glass-border-soft": "rgba(116, 153, 102, 0.16)",
        "--glass-blur-soft": "8px",
      },
      dark: {
        "--foreground": "#edf7ed",
        "--muted-foreground": "#b8d0b6",
        "--accent": "#6ee7b7",
        "--accent-foreground": "#16301c",
        "--destructive": "#fbbf24",
        "--destructive-foreground": "#422006",
        "--glass-bg": "rgba(24, 39, 28, 0.82)",
        "--glass-border": "rgba(134, 239, 172, 0.18)",
        "--glass-shadow": "var(--glass-shadow-sm)",
        "--glass-blur": "16px",
        "--glass-shadow-sm": "0 10px 26px 0 rgba(11, 26, 15, 0.3)",
        "--glass-shadow-md": "0 24px 60px 0 rgba(11, 26, 15, 0.42)",
        "--glass-shadow-lg": "0 34px 92px 0 rgba(11, 26, 15, 0.48)",
        "--glass-bg-strong": "rgba(34, 58, 41, 0.92)",
        "--glass-border-strong": "rgba(134, 239, 172, 0.26)",
        "--glass-blur-strong": "24px",
        "--glass-bg-soft": "rgba(18, 32, 22, 0.58)",
        "--glass-border-soft": "rgba(110, 231, 183, 0.14)",
        "--glass-blur-soft": "8px",
      },
    },
  },
  {
    id: "cosmic-night",
    name: "Cosmic Night",
    description: "Deep space blue-violet glass.",
    swatches: ["--foreground", "--accent", "--destructive", "--glass-bg"],
    tokens: {
      light: {
        "--foreground": "#1e1b4b",
        "--muted-foreground": "#5b5f8a",
        "--accent": "#3730a3",
        "--accent-foreground": "#eef2ff",
        "--destructive": "#ef4444",
        "--destructive-foreground": "#ffffff",
        "--glass-bg": "rgba(238, 242, 255, 0.84)",
        "--glass-border": "rgba(99, 102, 241, 0.28)",
        "--glass-shadow": "var(--glass-shadow-md)",
        "--glass-blur": "16px",
        "--glass-shadow-sm": "0 10px 28px 0 rgba(67, 56, 202, 0.1)",
        "--glass-shadow-md": "0 22px 56px 0 rgba(49, 46, 129, 0.16)",
        "--glass-shadow-lg": "0 32px 88px 0 rgba(30, 41, 99, 0.18)",
        "--glass-bg-strong": "rgba(248, 250, 255, 0.94)",
        "--glass-border-strong": "rgba(99, 102, 241, 0.36)",
        "--glass-blur-strong": "22px",
        "--glass-bg-soft": "rgba(224, 231, 255, 0.66)",
        "--glass-border-soft": "rgba(129, 140, 248, 0.18)",
        "--glass-blur-soft": "10px",
      },
      dark: {
        "--foreground": "#eef2ff",
        "--muted-foreground": "#a5b4fc",
        "--accent": "#a5b4fc",
        "--accent-foreground": "#111827",
        "--destructive": "#fda4af",
        "--destructive-foreground": "#3f0d1b",
        "--glass-bg": "rgba(15, 23, 42, 0.84)",
        "--glass-border": "rgba(129, 140, 248, 0.24)",
        "--glass-shadow": "var(--glass-shadow-md)",
        "--glass-blur": "18px",
        "--glass-shadow-sm": "0 10px 30px 0 rgba(2, 6, 23, 0.34)",
        "--glass-shadow-md": "0 26px 68px 0 rgba(2, 6, 23, 0.46)",
        "--glass-shadow-lg": "0 38px 110px 0 rgba(2, 6, 23, 0.56)",
        "--glass-bg-strong": "rgba(30, 41, 99, 0.92)",
        "--glass-border-strong": "rgba(129, 140, 248, 0.3)",
        "--glass-blur-strong": "26px",
        "--glass-bg-soft": "rgba(15, 23, 42, 0.6)",
        "--glass-border-soft": "rgba(96, 165, 250, 0.14)",
        "--glass-blur-soft": "10px",
      },
    },
  },
]

export function getThemePreset(presetId: string): ThemePreset {
  return BUILT_IN_THEME_PRESETS.find((item) => item.id === presetId) ?? BUILT_IN_THEME_PRESETS[0]
}

export function isThemePresetId(presetId: string): boolean {
  return BUILT_IN_THEME_PRESETS.some((item) => item.id === presetId)
}

export function normalizeThemePresetId(value: unknown): string | null {
  if (value === null) {
    return null
  }

  return typeof value === "string" && isThemePresetId(value) ? value : "default"
}

export function resolvePresetSwatches(
  preset: ThemePreset,
  mode: ThemePresetMode = "light",
): string[] {
  const values = resolveThemePresetValues(preset, mode)
  return preset.swatches.map((token) => values[token])
}

function resolveThemePresetValues(preset: ThemePreset, mode: ThemePresetMode): ThemeTokenValues {
  return {
    ...getDefaultBaseTokens(mode),
    ...preset.tokens[mode],
  }
}

export function resolveThemePresetTokens(
  presetId: string,
  mode: ThemePresetMode,
): ThemeTokenValues {
  return resolveThemePresetValues(getThemePreset(presetId), mode)
}

export function getDefaultBaseTokens(previewMode: ThemePresetMode): ThemeTokenValues {
  return previewMode === "dark" ? DEFAULT_DARK_TOKENS : DEFAULT_LIGHT_TOKENS
}

import type * as React from "react"
import { CANONICAL_TOKEN_ORDER, type TokenValues } from "./customization-tokens"

export type PreviewScopeStyle = React.CSSProperties & Record<string, string>

const DERIVED_PREVIEW_VARIABLES = {
  "--color-foreground": "--foreground",
  "--color-muted-foreground": "--muted-foreground",
  "--color-accent": "--accent",
  "--color-accent-foreground": "--accent-foreground",
  "--color-destructive": "--destructive",
  "--color-destructive-foreground": "--destructive-foreground",
  "--color-background": "--glass-bg",
  "--color-glass-bg": "--glass-bg",
  "--color-border": "--glass-border",
  "--color-glass-border": "--glass-border",
  "--shadow-glass": "--glass-shadow",
  "--shadow-glass-sm": "--glass-shadow-sm",
  "--shadow-glass-md": "--glass-shadow-md",
  "--shadow-glass-lg": "--glass-shadow-lg",
  "--backdrop-blur-glass": "--glass-blur",
  "--radius-glass-sm": "--glass-radius-sm",
  "--radius-glass-md": "--glass-radius-md",
  "--radius-glass-lg": "--glass-radius-lg",
  "--radius-glass-xl": "--glass-radius-xl",
} as const satisfies Record<string, keyof TokenValues>

export function createPreviewScopeStyle(values: TokenValues): PreviewScopeStyle {
  const style = CANONICAL_TOKEN_ORDER.reduce<PreviewScopeStyle>((currentStyle, token) => {
    currentStyle[token] = values[token]
    return currentStyle
  }, {})

  for (const [derivedVariable, token] of Object.entries(DERIVED_PREVIEW_VARIABLES)) {
    style[derivedVariable] = values[token]
  }

  return style
}

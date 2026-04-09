import { describe, expect, it } from "vitest"
import {
  DEFAULT_LIGHT_TOKENS,
  DEFAULT_RADIUS_TOKENS,
  getEditorTokenValues,
} from "./customization-tokens"
import { createPreviewScopeStyle } from "./preview-scope"

describe("createPreviewScopeStyle", () => {
  it("maps canonical tokens to the derived local theme variables used by preview utilities", () => {
    const style = createPreviewScopeStyle(
      getEditorTokenValues(DEFAULT_LIGHT_TOKENS, DEFAULT_RADIUS_TOKENS),
    )

    expect(style["--foreground"]).toBe(DEFAULT_LIGHT_TOKENS["--foreground"])
    expect(style["--color-foreground"]).toBe(DEFAULT_LIGHT_TOKENS["--foreground"])
    expect(style["--color-muted-foreground"]).toBe(DEFAULT_LIGHT_TOKENS["--muted-foreground"])
    expect(style["--color-glass-bg"]).toBe(DEFAULT_LIGHT_TOKENS["--glass-bg"])
    expect(style["--color-glass-border"]).toBe(DEFAULT_LIGHT_TOKENS["--glass-border"])
    expect(style["--shadow-glass"]).toBe(DEFAULT_LIGHT_TOKENS["--glass-shadow"])
    expect(style["--backdrop-blur-glass"]).toBe(DEFAULT_LIGHT_TOKENS["--glass-blur"])
    expect(style["--radius-glass-xl"]).toBe(DEFAULT_RADIUS_TOKENS["--glass-radius-xl"])
  })

  it("keeps derived preview variables in sync with edited non-accent tokens", () => {
    const style = createPreviewScopeStyle({
      ...getEditorTokenValues(DEFAULT_LIGHT_TOKENS, DEFAULT_RADIUS_TOKENS),
      "--foreground": "#102030",
      "--muted-foreground": "#405060",
      "--glass-bg": "rgba(12, 34, 56, 0.7)",
      "--glass-border": "rgba(90, 87, 210, 0.3)",
      "--glass-shadow": "0 0 0 1px rgba(255, 0, 0, 0.4)",
      "--glass-blur": "18px",
      "--glass-radius-lg": "2rem",
    })

    expect(style["--color-foreground"]).toBe("#102030")
    expect(style["--color-muted-foreground"]).toBe("#405060")
    expect(style["--color-glass-bg"]).toBe("rgba(12, 34, 56, 0.7)")
    expect(style["--color-glass-border"]).toBe("rgba(90, 87, 210, 0.3)")
    expect(style["--shadow-glass"]).toBe("0 0 0 1px rgba(255, 0, 0, 0.4)")
    expect(style["--backdrop-blur-glass"]).toBe("18px")
    expect(style["--radius-glass-lg"]).toBe("2rem")
  })
})

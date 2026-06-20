import { describe, expect, it } from "vitest"
import { DEFAULT_DARK_TOKENS, DEFAULT_LIGHT_TOKENS } from "./customization-tokens"
import {
  BUILT_IN_THEME_PRESETS,
  getDefaultBaseTokens,
  getPresetVariant,
  resolvePresetSwatches,
} from "./theme-presets"

describe("theme-presets", () => {
  it("exposes default, soft, and strong presets with names and descriptions", () => {
    expect(BUILT_IN_THEME_PRESETS.map((preset) => preset.id)).toEqual(["default", "soft", "strong"])
    expect(BUILT_IN_THEME_PRESETS.map((preset) => preset.name)).toEqual([
      "Default",
      "Soft",
      "Strong",
    ])
    expect(BUILT_IN_THEME_PRESETS.every((preset) => preset.description.length > 0)).toBe(true)
  })

  it("maps presets to their corresponding preset variant", () => {
    expect(getPresetVariant("default")).toBeNull()
    expect(getPresetVariant("soft")).toBe("soft")
    expect(getPresetVariant("strong")).toBe("strong")
    expect(getPresetVariant("unknown")).toBeNull()
  })

  it("resolves swatches from the provided token values", () => {
    const defaultPreset = BUILT_IN_THEME_PRESETS[0]
    const lightSwatches = resolvePresetSwatches(defaultPreset, DEFAULT_LIGHT_TOKENS)
    const darkSwatches = resolvePresetSwatches(defaultPreset, DEFAULT_DARK_TOKENS)

    expect(lightSwatches).toContain(DEFAULT_LIGHT_TOKENS["--foreground"])
    expect(lightSwatches).toContain(DEFAULT_LIGHT_TOKENS["--glass-bg"])
    expect(darkSwatches).toContain(DEFAULT_DARK_TOKENS["--foreground"])
    expect(darkSwatches).toContain(DEFAULT_DARK_TOKENS["--glass-bg"])
  })

  it("falls back to light defaults when no values are provided", () => {
    const strongPreset = BUILT_IN_THEME_PRESETS[2]
    const swatches = resolvePresetSwatches(strongPreset)

    expect(swatches).toContain(DEFAULT_LIGHT_TOKENS["--glass-bg-strong"])
  })

  it("returns the correct default base tokens for each preview mode", () => {
    expect(getDefaultBaseTokens("light")["--glass-bg"]).toBe(DEFAULT_LIGHT_TOKENS["--glass-bg"])
    expect(getDefaultBaseTokens("dark")["--glass-bg"]).toBe(DEFAULT_DARK_TOKENS["--glass-bg"])
  })
})

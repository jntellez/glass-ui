import { describe, expect, it } from "vitest"
import { DEFAULT_DARK_TOKENS, DEFAULT_LIGHT_TOKENS } from "./customization-tokens"
import {
  BUILT_IN_THEME_PRESETS,
  getDefaultBaseTokens,
  normalizeThemePresetId,
  resolvePresetSwatches,
  resolveThemePresetTokens,
} from "./theme-presets"

describe("theme-presets", () => {
  it("exposes the balanced built-in preset set in the expected order", () => {
    expect(BUILT_IN_THEME_PRESETS.map((preset) => preset.id)).toEqual([
      "default",
      "clean-slate",
      "midnight-bloom",
      "caffeine",
      "candyland",
      "graphite",
      "kodama-grove",
      "cosmic-night",
    ])
    expect(BUILT_IN_THEME_PRESETS.map((preset) => preset.name)).toEqual([
      "Default",
      "Clean Slate",
      "Midnight Bloom",
      "Caffeine",
      "Candyland",
      "Graphite",
      "Kodama Grove",
      "Cosmic Night",
    ])
    expect(BUILT_IN_THEME_PRESETS.every((preset) => preset.description.length > 0)).toBe(true)
  })

  it("applies preset token values for a representative light and dark palette", () => {
    expect(resolveThemePresetTokens("midnight-bloom", "light")).toMatchObject({
      "--accent": "#6d5efc",
      "--glass-bg": "rgba(245, 240, 255, 0.76)",
      "--glass-blur": "16px",
    })
    expect(resolveThemePresetTokens("midnight-bloom", "dark")).toMatchObject({
      "--accent": "#8b5cf6",
      "--glass-bg": "rgba(30, 27, 75, 0.72)",
      "--glass-blur": "18px",
    })
  })

  it("falls back to default tokens for unknown preset ids", () => {
    expect(resolveThemePresetTokens("unknown", "light")).toEqual(DEFAULT_LIGHT_TOKENS)
    expect(resolveThemePresetTokens("unknown", "dark")).toEqual(DEFAULT_DARK_TOKENS)
  })

  it("normalizes legacy and invalid preset ids to default", () => {
    expect(normalizeThemePresetId("default")).toBe("default")
    expect(normalizeThemePresetId("soft")).toBe("default")
    expect(normalizeThemePresetId("strong")).toBe("default")
    expect(normalizeThemePresetId("unknown")).toBe("default")
    expect(normalizeThemePresetId(null)).toBeNull()
  })

  it("resolves swatches from preset values for each mode", () => {
    const candylandPreset = BUILT_IN_THEME_PRESETS[4]
    const lightSwatches = resolvePresetSwatches(candylandPreset, "light")
    const darkSwatches = resolvePresetSwatches(candylandPreset, "dark")

    expect(lightSwatches).toEqual(["#5b214f", "#06b6d4", "#ec4899", "rgba(255, 240, 250, 0.82)"])
    expect(darkSwatches).toEqual(["#ffe4f3", "#67e8f9", "#4ade80", "rgba(91, 33, 75, 0.72)"])
  })

  it("falls back to light defaults when no mode is provided", () => {
    const defaultPreset = BUILT_IN_THEME_PRESETS[0]
    const swatches = resolvePresetSwatches(defaultPreset)

    expect(swatches).toContain(DEFAULT_LIGHT_TOKENS["--glass-bg"])
  })

  it("derives swatches from the provided preset tokens without a global lookup", () => {
    const customPreset = {
      ...BUILT_IN_THEME_PRESETS[0],
      id: "custom-theme",
      tokens: {
        light: {
          "--foreground": "#123456",
          "--accent": "#abcdef",
          "--destructive": "#fedcba",
          "--glass-bg": "rgba(1, 2, 3, 0.4)",
        },
        dark: {},
      },
    }

    expect(resolvePresetSwatches(customPreset, "light")).toEqual([
      "#123456",
      "#abcdef",
      "#fedcba",
      "rgba(1, 2, 3, 0.4)",
    ])
  })

  it("returns the correct default base tokens for each preview mode", () => {
    expect(getDefaultBaseTokens("light")["--glass-bg"]).toBe(DEFAULT_LIGHT_TOKENS["--glass-bg"])
    expect(getDefaultBaseTokens("dark")["--glass-bg"]).toBe(DEFAULT_DARK_TOKENS["--glass-bg"])
  })
})

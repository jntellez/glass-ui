import { describe, expect, it } from "vitest"
import { BUILT_IN_THEME_PRESETS } from "./theme-presets"
import { filterThemePresets } from "./theme-filter"

describe("filterThemePresets", () => {
  it("returns all presets when the query is empty", () => {
    expect(filterThemePresets(BUILT_IN_THEME_PRESETS, "")).toEqual(BUILT_IN_THEME_PRESETS)
    expect(filterThemePresets(BUILT_IN_THEME_PRESETS, "   ")).toEqual(BUILT_IN_THEME_PRESETS)
  })

  it("matches preset names case-insensitively", () => {
    expect(filterThemePresets(BUILT_IN_THEME_PRESETS, "GRAPHITE")).toEqual([
      BUILT_IN_THEME_PRESETS[5],
    ])
  })

  it("matches preset descriptions", () => {
    const results = filterThemePresets(BUILT_IN_THEME_PRESETS, "neutral")

    expect(results).toHaveLength(1)
    expect(results[0].id).toBe("clean-slate")
  })

  it("trims whitespace from queries", () => {
    expect(filterThemePresets(BUILT_IN_THEME_PRESETS, "  caffeine  ")).toEqual([
      BUILT_IN_THEME_PRESETS[3],
    ])
  })

  it("returns an empty array when nothing matches", () => {
    expect(filterThemePresets(BUILT_IN_THEME_PRESETS, "neon")).toEqual([])
  })
})

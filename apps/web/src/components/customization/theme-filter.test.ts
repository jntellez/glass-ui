import { describe, expect, it } from "vitest"
import { BUILT_IN_THEME_PRESETS } from "./theme-presets"
import { filterThemePresets } from "./theme-filter"

describe("filterThemePresets", () => {
  it("returns all presets when the query is empty", () => {
    expect(filterThemePresets(BUILT_IN_THEME_PRESETS, "")).toEqual(BUILT_IN_THEME_PRESETS)
    expect(filterThemePresets(BUILT_IN_THEME_PRESETS, "   ")).toEqual(BUILT_IN_THEME_PRESETS)
  })

  it("matches preset names case-insensitively", () => {
    expect(filterThemePresets(BUILT_IN_THEME_PRESETS, "SOFT")).toEqual([BUILT_IN_THEME_PRESETS[1]])
  })

  it("matches preset descriptions", () => {
    const results = filterThemePresets(BUILT_IN_THEME_PRESETS, "subtle")

    expect(results).toHaveLength(1)
    expect(results[0].id).toBe("soft")
  })

  it("trims whitespace from queries", () => {
    expect(filterThemePresets(BUILT_IN_THEME_PRESETS, "  strong  ")).toEqual([
      BUILT_IN_THEME_PRESETS[2],
    ])
  })

  it("returns an empty array when nothing matches", () => {
    expect(filterThemePresets(BUILT_IN_THEME_PRESETS, "neon")).toEqual([])
  })
})

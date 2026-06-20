import { describe, expect, it } from "vitest"
import { formatTokenSliderValue, getTokenSliderConfig, parseTokenSliderValue } from "./token-slider"

describe("token-slider", () => {
  it("returns slider configs only for supported numeric tokens", () => {
    expect(getTokenSliderConfig("--glass-radius-xl")).toMatchObject({ unit: "rem", step: 0.025 })
    expect(getTokenSliderConfig("--glass-blur")).toMatchObject({ unit: "px", step: 1 })
    expect(getTokenSliderConfig("--glass-shadow")).toBeNull()
  })

  it("parses numeric token values with the expected unit", () => {
    expect(parseTokenSliderValue("1.5rem", "rem")).toEqual({ numericValue: 1.5, unit: "rem" })
    expect(parseTokenSliderValue("6px", "px")).toEqual({ numericValue: 6, unit: "px" })
  })

  it("rejects values that are not numeric or use another unit", () => {
    expect(parseTokenSliderValue("var(--glass-shadow-sm)", "px")).toBeNull()
    expect(parseTokenSliderValue("10", "px")).toBeNull()
    expect(parseTokenSliderValue("1rem", "px")).toBeNull()
  })

  it("formats values using the configured precision", () => {
    expect(formatTokenSliderValue(1.5, { unit: "rem", step: 0.025 })).toBe("1.5rem")
    expect(formatTokenSliderValue(0.375, { unit: "rem", step: 0.025 })).toBe("0.375rem")
    expect(formatTokenSliderValue(10, { unit: "px", step: 1 })).toBe("10px")
  })
})

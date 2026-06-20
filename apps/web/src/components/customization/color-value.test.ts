import { describe, expect, it } from "vitest"
import { isHexColor, parseColorValue, updateColorValueWithPickerHex } from "./color-value"

describe("color-value", () => {
  it("parses supported hex, rgb, and rgba values", () => {
    expect(parseColorValue("#abc")).toMatchObject({
      format: "hex",
      pickerHex: "#aabbcc",
      red: 170,
      green: 187,
      blue: 204,
      alpha: null,
    })

    expect(parseColorValue("rgb(255, 0, 0)")).toMatchObject({
      format: "rgb",
      pickerHex: "#ff0000",
      red: 255,
      green: 0,
      blue: 0,
      alpha: null,
    })

    expect(parseColorValue("rgba(255, 0, 0, 0.08)")).toMatchObject({
      format: "rgba",
      pickerHex: "#ff0000",
      red: 255,
      green: 0,
      blue: 0,
      alpha: 0.08,
      alphaText: "0.08",
    })
  })

  it("preserves format intent when the picker emits a new hex value", () => {
    expect(updateColorValueWithPickerHex("#fafafa", "#ff0000")).toBe("#ff0000")
    expect(updateColorValueWithPickerHex("rgb(255, 255, 255)", "#ff0000")).toBe("rgb(255, 0, 0)")
    expect(updateColorValueWithPickerHex("rgba(255, 255, 255, 0.125)", "#ff0000")).toBe(
      "rgba(255, 0, 0, 0.125)",
    )
  })

  it("returns null for unsupported or invalid values", () => {
    expect(parseColorValue("oklch(0.7 0.2 30)")).toBeNull()
    expect(parseColorValue("var(--accent)")).toBeNull()
    expect(parseColorValue("rgb(256, 0, 0)")).toBeNull()
    expect(parseColorValue("rgba(255, 0, 0, 1.5)")).toBeNull()
    expect(updateColorValueWithPickerHex("var(--accent)", "#ff0000")).toBeNull()
  })

  it("detects supported hex values only", () => {
    expect(isHexColor("#abc")).toBe(true)
    expect(isHexColor("#aabbcc")).toBe(true)
    expect(isHexColor("rgba(0, 0, 0, 0.5)")).toBe(false)
  })
})

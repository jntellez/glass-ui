import { describe, expect, it } from "vitest"
import { formatShadowValue, parseShadowValue, updateShadowColor } from "./token-shadow"

describe("token-shadow", () => {
  it("parses zero lengths without explicit px units", () => {
    expect(parseShadowValue("0 2px 8px 0 rgba(0, 0, 0, 0.06)")).toMatchObject({
      offsetX: 0,
      offsetY: 2,
      blur: 8,
      spread: 0,
      opacity: 0.06,
    })
  })

  it("formats updated shadow values back into a valid css shadow", () => {
    expect(
      formatShadowValue({
        offsetX: 4,
        offsetY: -3,
        blur: 24,
        spread: 6,
        opacity: 0.35,
        opacityText: "0.35",
        colorChannels: { red: 0, green: 0, blue: 0 },
      }),
    ).toBe("4px -3px 24px 6px rgba(0, 0, 0, 0.35)")
  })

  it("preserves parsed alpha precision when formatting untouched opacity", () => {
    const parsedValue = parseShadowValue("0 2px 8px 0 rgba(0, 0, 0, 0.125)")!

    expect(
      formatShadowValue({
        ...parsedValue,
        blur: 12,
      }),
    ).toBe("0px 2px 12px 0px rgba(0, 0, 0, 0.125)")
  })

  it("updates color channels while preserving opacity for rgb and hex input", () => {
    const parsedValue = parseShadowValue("0 2px 8px 0 rgba(0, 0, 0, 0.06)")!

    expect(updateShadowColor(parsedValue, "#ff00aa")).toMatchObject({
      opacity: 0.06,
      colorChannels: { red: 255, green: 0, blue: 170 },
    })
    expect(updateShadowColor(parsedValue, "rgba(10, 20, 30, 0.4)")).toMatchObject({
      opacity: 0.4,
      colorChannels: { red: 10, green: 20, blue: 30 },
    })
  })

  it("rejects shadows with negative blur", () => {
    expect(parseShadowValue("0 2px -8px 0 rgba(0, 0, 0, 0.06)")).toBeNull()
  })
})

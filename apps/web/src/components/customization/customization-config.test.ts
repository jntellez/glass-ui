import { describe, expect, it } from "vitest"
import {
  DEFAULT_DARK_TOKENS,
  DEFAULT_LIGHT_TOKENS,
  DEFAULT_RADIUS_TOKENS,
} from "./customization-tokens"
import {
  parseCustomizationConfig,
  serializeCustomizationConfig,
  type CustomizationConfigState,
} from "./customization-config"

describe("customization-config", () => {
  it("round-trips a customization config payload", () => {
    const state: CustomizationConfigState = {
      light: {
        ...DEFAULT_LIGHT_TOKENS,
        "--accent": "#123456",
      },
      dark: DEFAULT_DARK_TOKENS,
      radius: DEFAULT_RADIUS_TOKENS,
      previewMode: "dark",
      activeScene: "content",
      activePreset: {
        light: null,
        dark: null,
      },
    }

    expect(parseCustomizationConfig(serializeCustomizationConfig(state))).toEqual({
      ok: true,
      state,
    })
  })

  it("rejects malformed config payloads", () => {
    expect(parseCustomizationConfig("{oops")).toEqual({
      ok: false,
      error: "Invalid JSON. Paste a valid customization config.",
    })

    expect(parseCustomizationConfig(JSON.stringify({ version: 1 }))).toEqual({
      ok: false,
      error: "Invalid customization config. Use a config exported from this editor.",
    })
  })

  it("rejects invalid token values", () => {
    expect(
      parseCustomizationConfig(
        JSON.stringify({
          version: 1,
          light: {
            ...DEFAULT_LIGHT_TOKENS,
            "--accent": "   ",
          },
          dark: DEFAULT_DARK_TOKENS,
          radius: DEFAULT_RADIUS_TOKENS,
          editor: {
            previewMode: "light",
            activeScene: "overview",
            activePreset: {
              light: null,
              dark: null,
            },
          },
        }),
      ),
    ).toEqual({
      ok: false,
      error: "Invalid customization config. Token values must be non-empty strings.",
    })
  })
})

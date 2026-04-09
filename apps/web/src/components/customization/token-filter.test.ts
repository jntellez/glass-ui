import { describe, expect, it } from "vitest"
import {
  DEFAULT_LIGHT_TOKENS,
  DEFAULT_RADIUS_TOKENS,
  getEditorTokenValues,
} from "./customization-tokens"
import { filterTokenGroups } from "./token-filter"

describe("filterTokenGroups", () => {
  it("returns only matching token rows and omits empty groups", () => {
    const filteredGroups = filterTokenGroups(
      getEditorTokenValues(DEFAULT_LIGHT_TOKENS, DEFAULT_RADIUS_TOKENS),
      "shadow",
    )

    expect(filteredGroups).toEqual([
      {
        id: "base",
        label: "Base glass",
        rows: [
          {
            token: "--glass-shadow",
            value: DEFAULT_LIGHT_TOKENS["--glass-shadow"],
          },
        ],
      },
      {
        id: "shadows",
        label: "Shadows",
        rows: [
          {
            token: "--glass-shadow-sm",
            value: DEFAULT_LIGHT_TOKENS["--glass-shadow-sm"],
          },
          {
            token: "--glass-shadow-md",
            value: DEFAULT_LIGHT_TOKENS["--glass-shadow-md"],
          },
          {
            token: "--glass-shadow-lg",
            value: DEFAULT_LIGHT_TOKENS["--glass-shadow-lg"],
          },
        ],
      },
    ])
  })

  it("matches trimmed queries against token and group labels without changing values", () => {
    const filteredGroups = filterTokenGroups(
      getEditorTokenValues(DEFAULT_LIGHT_TOKENS, DEFAULT_RADIUS_TOKENS),
      "  TEXT  ",
    )

    expect(filteredGroups).toEqual([
      {
        id: "text",
        label: "Text",
        rows: [
          {
            token: "--foreground",
            value: DEFAULT_LIGHT_TOKENS["--foreground"],
          },
          {
            token: "--muted-foreground",
            value: DEFAULT_LIGHT_TOKENS["--muted-foreground"],
          },
        ],
      },
    ])
  })
})

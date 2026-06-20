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

  it("matches trimmed queries against token, label, and group labels without changing values", () => {
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

  it("can restrict filtering to a single tab", () => {
    const colorGroups = filterTokenGroups(
      getEditorTokenValues(DEFAULT_LIGHT_TOKENS, DEFAULT_RADIUS_TOKENS),
      "",
      "colors",
    )
    const otherGroups = filterTokenGroups(
      getEditorTokenValues(DEFAULT_LIGHT_TOKENS, DEFAULT_RADIUS_TOKENS),
      "",
      "other",
    )

    expect(colorGroups.map((group) => group.id)).toEqual([
      "text",
      "accent",
      "status",
      "base",
      "variants",
    ])
    expect(otherGroups.map((group) => group.id)).toEqual(["shadows", "radius", "blur"])
  })

  it("matches token labels when filtering by tab", () => {
    const filteredGroups = filterTokenGroups(
      getEditorTokenValues(DEFAULT_LIGHT_TOKENS, DEFAULT_RADIUS_TOKENS),
      "strong background",
      "colors",
    )

    expect(filteredGroups).toEqual([
      {
        id: "variants",
        label: "Variant tokens",
        rows: [
          {
            token: "--glass-bg-strong",
            value: DEFAULT_LIGHT_TOKENS["--glass-bg-strong"],
          },
        ],
      },
    ])
  })
})

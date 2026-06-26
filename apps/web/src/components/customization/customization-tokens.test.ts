import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import { describe, expect, it } from "vitest"
import {
  applyPreset,
  CANONICAL_TOKEN_ORDER,
  DEFAULT_RADIUS_TOKENS,
  DEFAULT_DARK_TOKENS,
  DEFAULT_LIGHT_TOKENS,
  getEditorTokenValues,
  getGroupsForTab,
  TOKEN_GROUPS,
} from "./customization-tokens"

const packageTokensCss = readFileSync(
  resolve(process.cwd(), "../../packages/glass/src/css/tokens.css"),
  "utf8",
)

describe("customization tokens", () => {
  it("includes semantic color tokens in canonical order and grouped editor metadata", () => {
    expect(CANONICAL_TOKEN_ORDER.slice(0, 6)).toEqual([
      "--foreground",
      "--muted-foreground",
      "--accent",
      "--accent-foreground",
      "--destructive",
      "--destructive-foreground",
    ])
    expect(TOKEN_GROUPS).toContainEqual({
      id: "accent",
      label: "Accent",
      tab: "colors",
      tokens: ["--accent", "--accent-foreground"],
    })
    expect(TOKEN_GROUPS).toContainEqual({
      id: "status",
      label: "Status",
      tab: "colors",
      tokens: ["--destructive", "--destructive-foreground"],
    })
  })

  it("keeps light and dark semantic color defaults aligned with the package token source", () => {
    expect(DEFAULT_LIGHT_TOKENS["--accent"]).toBe("#3f3f46")
    expect(DEFAULT_LIGHT_TOKENS["--accent-foreground"]).toBe("#ffffff")
    expect(DEFAULT_DARK_TOKENS["--accent"]).toBe("#d4d4d8")
    expect(DEFAULT_DARK_TOKENS["--accent-foreground"]).toBe("#18181b")
    expect(DEFAULT_LIGHT_TOKENS["--destructive"]).toBe("#dc2626")
    expect(DEFAULT_LIGHT_TOKENS["--destructive-foreground"]).toBe("#ffffff")
    expect(DEFAULT_DARK_TOKENS["--destructive"]).toBe("#f87171")
    expect(DEFAULT_DARK_TOKENS["--destructive-foreground"]).toBe("#18181b")
    expect(packageTokensCss).toContain("--accent: #3f3f46;")
    expect(packageTokensCss).toContain("--accent-foreground: #ffffff;")
    expect(packageTokensCss).toContain("--accent: #d4d4d8;")
    expect(packageTokensCss).toContain("--accent-foreground: #18181b;")
    expect(packageTokensCss).toContain("--destructive: #dc2626;")
    expect(packageTokensCss).toContain("--destructive-foreground: #ffffff;")
    expect(packageTokensCss).toContain("--destructive: #f87171;")
    expect(packageTokensCss).toContain("--destructive-foreground: #18181b;")
  })

  it("keeps radius defaults in shared token data instead of duplicating them per theme", () => {
    expect(DEFAULT_RADIUS_TOKENS).toEqual({
      "--glass-radius-sm": "0.375rem",
      "--glass-radius-md": "0.75rem",
      "--glass-radius-lg": "1rem",
      "--glass-radius-xl": "1.5rem",
    })
    expect(DEFAULT_LIGHT_TOKENS).not.toHaveProperty("--glass-radius-sm")
    expect(DEFAULT_LIGHT_TOKENS).not.toHaveProperty("--glass-radius-xl")
    expect(DEFAULT_DARK_TOKENS).not.toHaveProperty("--glass-radius-sm")
    expect(DEFAULT_DARK_TOKENS).not.toHaveProperty("--glass-radius-xl")
    expect(packageTokensCss).toContain("--glass-radius-sm: 0.375rem;")
    expect(packageTokensCss).toContain("--glass-radius-xl: 1.5rem;")
  })

  it("merges shared radius values into the active editor values for either preview mode", () => {
    const sharedRadius = {
      ...DEFAULT_RADIUS_TOKENS,
      "--glass-radius-lg": "2rem",
    }

    expect(getEditorTokenValues(DEFAULT_LIGHT_TOKENS, sharedRadius)["--glass-radius-lg"]).toBe(
      "2rem",
    )
    expect(getEditorTokenValues(DEFAULT_DARK_TOKENS, sharedRadius)["--glass-radius-lg"]).toBe(
      "2rem",
    )
    expect(getEditorTokenValues(DEFAULT_DARK_TOKENS, sharedRadius)["--foreground"]).toBe(
      DEFAULT_DARK_TOKENS["--foreground"],
    )
  })

  it("groups color tokens separately from non-color tokens", () => {
    const colorGroupIds = getGroupsForTab("colors").map((group) => group.id)
    const otherGroupIds = getGroupsForTab("other").map((group) => group.id)

    expect(colorGroupIds).toEqual(["text", "accent", "status", "base", "variants"])
    expect(otherGroupIds).toEqual(["shadows", "radius", "blur"])

    const baseGroup = TOKEN_GROUPS.find((group) => group.id === "base")
    expect(baseGroup?.tokens).not.toContain("--glass-shadow")
    expect(baseGroup?.tokens).not.toContain("--glass-blur")

    const blurGroup = TOKEN_GROUPS.find((group) => group.id === "blur")
    expect(blurGroup?.tokens).toEqual(["--glass-blur", "--glass-blur-strong", "--glass-blur-soft"])

    const shadowGroup = TOKEN_GROUPS.find((group) => group.id === "shadows")
    expect(shadowGroup?.tokens).toEqual([
      "--glass-shadow-sm",
      "--glass-shadow-md",
      "--glass-shadow-lg",
    ])
  })
})

describe("applyPreset", () => {
  it("rewrites only the linked base tokens for the strong preset", () => {
    const result = applyPreset(DEFAULT_LIGHT_TOKENS, "strong")

    expect(result).toEqual({
      ...DEFAULT_LIGHT_TOKENS,
      "--glass-bg": DEFAULT_LIGHT_TOKENS["--glass-bg-strong"],
      "--glass-border": DEFAULT_LIGHT_TOKENS["--glass-border-strong"],
      "--glass-blur": DEFAULT_LIGHT_TOKENS["--glass-blur-strong"],
    })
    expect(result["--accent"]).toBe(DEFAULT_LIGHT_TOKENS["--accent"])
    expect(result["--accent-foreground"]).toBe(DEFAULT_LIGHT_TOKENS["--accent-foreground"])
  })

  it("uses the active mode values for soft preset without mutating unrelated dark tokens", () => {
    const result = applyPreset(DEFAULT_DARK_TOKENS, "soft")

    expect(result).toEqual({
      ...DEFAULT_DARK_TOKENS,
      "--glass-bg": DEFAULT_DARK_TOKENS["--glass-bg-soft"],
      "--glass-border": DEFAULT_DARK_TOKENS["--glass-border-soft"],
      "--glass-blur": DEFAULT_DARK_TOKENS["--glass-blur-soft"],
    })
    expect(result["--glass-shadow"]).toBe(DEFAULT_DARK_TOKENS["--glass-shadow"])
    expect(result["--foreground"]).toBe(DEFAULT_DARK_TOKENS["--foreground"])
    expect(result["--accent"]).toBe(DEFAULT_DARK_TOKENS["--accent"])
    expect(result["--accent-foreground"]).toBe(DEFAULT_DARK_TOKENS["--accent-foreground"])
  })
})

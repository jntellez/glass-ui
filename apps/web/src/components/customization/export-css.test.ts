import { describe, expect, it } from "vitest"
import {
  DEFAULT_DARK_TOKENS,
  DEFAULT_LIGHT_TOKENS,
  DEFAULT_RADIUS_TOKENS,
} from "./customization-tokens"
import { serializeCss } from "./export-css"

const expectedDefaultCss = `:root {
  --foreground: #18181b;
  --muted-foreground: #3f3f46;
  --accent: #d946ef;
  --accent-foreground: #ffffff;
  --destructive: #dc2626;
  --destructive-foreground: #ffffff;
  --glass-bg: rgba(255, 255, 255, 0.35);
  --glass-border: rgba(255, 255, 255, 0.6);
  --glass-shadow: var(--glass-shadow-sm);
  --glass-blur: 6px;
  --glass-shadow-sm: 0 2px 8px 0 rgba(0, 0, 0, 0.06);
  --glass-shadow-md: 0 4px 30px 0 rgba(0, 0, 0, 0.1);
  --glass-shadow-lg: 0 8px 40px 0 rgba(0, 0, 0, 0.2);
  --glass-radius-sm: 0.375rem;
  --glass-radius-md: 0.75rem;
  --glass-radius-lg: 1rem;
  --glass-radius-xl: 1.5rem;
  --glass-bg-strong: rgba(255, 255, 255, 0.5);
  --glass-border-strong: rgba(255, 255, 255, 0.8);
  --glass-blur-strong: 10px;
  --glass-bg-soft: rgba(255, 255, 255, 0.2);
  --glass-border-soft: rgba(255, 255, 255, 0.4);
  --glass-blur-soft: 2px;
}

.dark {
  --foreground: #fafafa;
  --muted-foreground: #d4d4d8;
  --accent: #c084fc;
  --accent-foreground: #18181b;
  --destructive: #f87171;
  --destructive-foreground: #18181b;
  --glass-bg: rgba(255, 255, 255, 0.08);
  --glass-border: rgba(255, 255, 255, 0.1);
  --glass-shadow: var(--glass-shadow-sm);
  --glass-blur: 6px;
  --glass-shadow-sm: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
  --glass-shadow-md: 0 4px 30px 0 rgba(0, 0, 0, 0.2);
  --glass-shadow-lg: 0 8px 40px 0 rgba(0, 0, 0, 0.35);
  --glass-bg-strong: rgba(255, 255, 255, 0.15);
  --glass-border-strong: rgba(255, 255, 255, 0.2);
  --glass-blur-strong: 10px;
  --glass-bg-soft: rgba(255, 255, 255, 0.03);
  --glass-border-soft: rgba(255, 255, 255, 0.06);
  --glass-blur-soft: 2px;
}`

describe("serializeCss", () => {
  it("serializes complete light and dark blocks with canonical token order", () => {
    expect(serializeCss(DEFAULT_LIGHT_TOKENS, DEFAULT_DARK_TOKENS, DEFAULT_RADIUS_TOKENS)).toBe(
      expectedDefaultCss,
    )
  })

  it("uses canonical order even when token objects were created in a different insertion order", () => {
    const reversedEntries = Object.entries(DEFAULT_LIGHT_TOKENS).reverse()
    const shuffledLight = Object.fromEntries(reversedEntries) as typeof DEFAULT_LIGHT_TOKENS
    const shuffledDark = Object.fromEntries(
      Object.entries(DEFAULT_DARK_TOKENS).reverse(),
    ) as typeof DEFAULT_DARK_TOKENS

    expect(serializeCss(shuffledLight, shuffledDark, DEFAULT_RADIUS_TOKENS)).toBe(
      expectedDefaultCss,
    )
  })

  it("returns byte-identical css on repeated serialization with the same inputs", () => {
    const first = serializeCss(DEFAULT_LIGHT_TOKENS, DEFAULT_DARK_TOKENS, DEFAULT_RADIUS_TOKENS)
    const second = serializeCss(DEFAULT_LIGHT_TOKENS, DEFAULT_DARK_TOKENS, DEFAULT_RADIUS_TOKENS)

    expect(first).toBe(expectedDefaultCss)
    expect(second).toBe(first)
  })

  it("emits edited shared radius values only once in the root block", () => {
    const css = serializeCss(DEFAULT_LIGHT_TOKENS, DEFAULT_DARK_TOKENS, {
      ...DEFAULT_RADIUS_TOKENS,
      "--glass-radius-xl": "2rem",
    })

    expect(css).toContain("--glass-radius-xl: 2rem;")
    expect(css.split("--glass-radius-xl")).toHaveLength(2)
  })
})

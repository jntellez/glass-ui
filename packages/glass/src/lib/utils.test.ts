import { describe, expect, it } from "vitest"
import { cn } from "./utils"

describe("cn", () => {
  it("combines truthy class values", () => {
    expect(cn("rounded", false && "hidden", undefined, "px-4")).toBe("rounded px-4")
  })

  it("merges conflicting tailwind utilities", () => {
    expect(cn("px-2", "px-4", "bg-black/40", "bg-white/20")).toBe("px-4 bg-white/20")
  })

  it("handles nested arrays and conflicting utilities", () => {
    expect(cn(["flex", ["items-center", null]], ["font-normal", ["font-medium"]], "text-sm")).toBe(
      "flex items-center font-medium text-sm",
    )
  })

  it("merges another conflicting tailwind pair", () => {
    expect(cn("shadow-sm", "shadow-xl")).toBe("shadow-xl")
  })
})

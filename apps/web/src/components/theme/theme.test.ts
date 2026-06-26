import { describe, expect, it } from "vitest"
import { getStoredTheme } from "./theme"

describe("theme utilities", () => {
  it("returns null when storage access is unavailable", () => {
    const blockedStorage = {
      getItem() {
        throw new Error("blocked")
      },
    }

    expect(getStoredTheme(blockedStorage)).toBeNull()
  })
})

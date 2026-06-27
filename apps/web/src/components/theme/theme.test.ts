import { beforeEach, describe, expect, it, vi } from "vitest"
import { applyTheme, getStoredTheme, THEME_CHANGE_EVENT } from "./theme"

describe("theme utilities", () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.className = ""
    document.documentElement.style.colorScheme = ""
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: vi.fn().mockReturnValue({ matches: false }),
    })
  })

  it("returns null when storage access is unavailable", () => {
    const blockedStorage = {
      getItem() {
        throw new Error("blocked")
      },
    }

    expect(getStoredTheme(blockedStorage)).toBeNull()
  })

  it("dispatches a theme change event with explicit and resolved theme details", () => {
    const listener = vi.fn()

    window.addEventListener(THEME_CHANGE_EVENT, listener)
    applyTheme("dark")

    expect(listener).toHaveBeenCalledTimes(1)
    expect(listener.mock.calls[0]?.[0]).toMatchObject({
      detail: {
        theme: "dark",
        resolvedTheme: "dark",
      },
    })
    expect(localStorage.getItem("theme")).toBe("dark")

    window.removeEventListener(THEME_CHANGE_EVENT, listener)
  })
})

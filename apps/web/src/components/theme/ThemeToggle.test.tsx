import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import ThemeToggle from "./ThemeToggle"

describe("ThemeToggle", () => {
  const matchMedia = vi.fn()

  beforeEach(() => {
    localStorage.clear()
    document.documentElement.className = ""
    matchMedia.mockReset()
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: matchMedia,
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("restores the saved theme and applies it to the document root", async () => {
    localStorage.setItem("theme", "dark")
    matchMedia.mockReturnValue({ matches: false })

    render(<ThemeToggle />)

    await waitFor(() => {
      expect(screen.getByRole("radio", { name: /dark theme/i })).toHaveAttribute(
        "aria-checked",
        "true",
      )
    })

    expect(document.documentElement).toHaveClass("dark")
    expect(document.documentElement).not.toHaveClass("light")
    expect(localStorage.getItem("theme")).toBe("dark")
  })

  it("uses the system preference by default and persists explicit theme changes", async () => {
    const user = userEvent.setup()
    matchMedia.mockReturnValue({ matches: true })

    render(<ThemeToggle />)

    await waitFor(() => {
      expect(screen.getByRole("radio", { name: /system theme/i })).toHaveAttribute(
        "aria-checked",
        "true",
      )
    })

    expect(document.documentElement).toHaveClass("dark")
    expect(localStorage.getItem("theme")).toBe("system")

    await user.click(screen.getByRole("radio", { name: /light theme/i }))

    expect(screen.getByRole("radio", { name: /light theme/i })).toHaveAttribute(
      "aria-checked",
      "true",
    )
    expect(document.documentElement).toHaveClass("light")
    expect(document.documentElement).not.toHaveClass("dark")
    expect(localStorage.getItem("theme")).toBe("light")
  })
})

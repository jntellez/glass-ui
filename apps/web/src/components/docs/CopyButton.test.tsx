import { act, fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest"
import CopyButton from "./CopyButton"

describe("CopyButton", () => {
  beforeEach(() => {
    vi.useFakeTimers()
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: vi.fn(),
      },
    })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("copies the provided code and shows feedback", () => {
    render(<CopyButton code="pnpm add @glass-ui-kit/glass" />)

    const button = screen.getByRole("button", { name: /copy to clipboard/i })

    act(() => {
      fireEvent.click(button)
    })

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("pnpm add @glass-ui-kit/glass")
    expect(
      screen.getByRole("button", { name: /copy to clipboard/i }).querySelector(".lucide-check"),
    ).toBeTruthy()

    act(() => {
      vi.advanceTimersByTime(2000)
    })

    expect(
      screen.getByRole("button", { name: /copy to clipboard/i }).querySelector(".lucide-copy"),
    ).toBeTruthy()
  })
})

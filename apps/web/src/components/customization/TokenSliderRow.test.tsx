import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { TokenSliderRow } from "./TokenSliderRow"
import { getTokenSliderConfig } from "./token-slider"

describe("TokenSliderRow", () => {
  it("renders a synchronized slider and numeric input", () => {
    render(
      <TokenSliderRow
        token="--glass-radius-xl"
        value="1.5rem"
        config={getTokenSliderConfig("--glass-radius-xl")!}
        onChange={vi.fn()}
      />,
    )

    expect(screen.getByRole("textbox", { name: "Radius extra large" })).toHaveValue("1.5")
    expect(screen.getByRole("slider", { name: "Radius extra large slider" })).toHaveAttribute(
      "aria-valuenow",
      "1.5",
    )
    expect(screen.getByText("rem")).toBeInTheDocument()
  })

  it("formats valid numeric input changes back into token values", () => {
    const handleChange = vi.fn()

    render(
      <TokenSliderRow
        token="--glass-blur"
        value="6px"
        config={getTokenSliderConfig("--glass-blur")!}
        onChange={handleChange}
      />,
    )

    fireEvent.change(screen.getByRole("textbox", { name: "Blur" }), { target: { value: "12" } })

    expect(handleChange).toHaveBeenCalledWith("12px")
  })

  it("keeps invalid draft input without crashing or emitting token updates", () => {
    const handleChange = vi.fn()

    render(
      <TokenSliderRow
        token="--glass-radius-md"
        value="0.75rem"
        config={getTokenSliderConfig("--glass-radius-md")!}
        onChange={handleChange}
      />,
    )

    const input = screen.getByRole("textbox", { name: "Radius medium" })

    fireEvent.change(input, { target: { value: "abc" } })

    expect(input).toHaveValue("abc")
    expect(handleChange).not.toHaveBeenCalled()
  })
})

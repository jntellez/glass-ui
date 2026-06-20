import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { TokenRow, isHexColor } from "./TokenRow"

describe("TokenRow", () => {
  it("renders a ColorPicker for hex color values", () => {
    render(<TokenRow token="--foreground" value="#18181b" kind="color" onChange={vi.fn()} />)

    expect(screen.getByLabelText("Foreground color picker")).toBeInTheDocument()
    expect(screen.getByRole("textbox", { name: "Foreground" })).toHaveValue("#18181b")
    expect(screen.queryByTestId("color-swatch")).not.toBeInTheDocument()
  })

  it("renders a ColorPicker for rgba color values", () => {
    render(
      <TokenRow
        token="--glass-bg"
        value="rgba(255, 255, 255, 0.1)"
        kind="color"
        onChange={vi.fn()}
      />,
    )

    expect(screen.getByLabelText("Background color picker")).toBeInTheDocument()
    expect(screen.queryByTestId("color-swatch")).not.toBeInTheDocument()
    expect(screen.getByRole("textbox", { name: "Background" })).toHaveValue(
      "rgba(255, 255, 255, 0.1)",
    )
  })

  it("preserves rgba alpha when the picker changes the color", () => {
    const handleChange = vi.fn()

    render(
      <TokenRow
        token="--glass-bg"
        value="rgba(255, 255, 255, 0.5)"
        kind="color"
        onChange={handleChange}
      />,
    )

    fireEvent.change(screen.getByLabelText("Background color picker"), {
      target: { value: "#ff0000" },
    })

    expect(handleChange).toHaveBeenCalledWith("rgba(255, 0, 0, 0.5)")
  })

  it("updates the input value on change", () => {
    const handleChange = vi.fn()

    render(<TokenRow token="--foreground" value="#18181b" kind="color" onChange={handleChange} />)

    const input = screen.getByRole("textbox", { name: "Foreground" })

    fireEvent.change(input, { target: { value: "#ffffff" } })

    expect(handleChange).toHaveBeenCalledWith("#ffffff")
  })

  it("does not render a color picker for non-color tokens", () => {
    render(<TokenRow token="--glass-blur" value="8px" kind="text" onChange={vi.fn()} />)

    expect(screen.queryByLabelText(/color picker/i)).not.toBeInTheDocument()
    expect(screen.queryByTestId("color-swatch")).not.toBeInTheDocument()
    expect(screen.getByRole("textbox", { name: "Blur" })).toHaveValue("8px")
  })
})

describe("isHexColor", () => {
  it("returns true for 3-digit hex values with hash", () => {
    expect(isHexColor("#abc")).toBe(true)
    expect(isHexColor("#ABC")).toBe(true)
  })

  it("returns true for 6-digit hex values with hash", () => {
    expect(isHexColor("#aabbcc")).toBe(true)
    expect(isHexColor("#18181b")).toBe(true)
  })

  it("returns false for rgba values", () => {
    expect(isHexColor("rgba(255, 255, 255, 0.1)")).toBe(false)
    expect(isHexColor("rgba(0,0,0,0.5)")).toBe(false)
  })

  it("returns false for invalid hex values", () => {
    expect(isHexColor("#ggg")).toBe(false)
    expect(isHexColor("123")).toBe(false)
    expect(isHexColor("#12345")).toBe(false)
    expect(isHexColor("")).toBe(false)
  })
})

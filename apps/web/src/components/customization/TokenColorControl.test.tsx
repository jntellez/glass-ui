import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { TokenColorControl } from "./TokenColorControl"

describe("TokenColorControl", () => {
  it("updates rgba values from the picker while preserving alpha precision", () => {
    const handleChange = vi.fn()

    render(
      <TokenColorControl
        id="accent"
        label="Accent"
        value="rgba(255, 255, 255, 0.125)"
        onChange={handleChange}
      />,
    )

    fireEvent.change(screen.getByLabelText("Accent color picker"), {
      target: { value: "#ff0000" },
    })

    expect(handleChange).toHaveBeenCalledWith("rgba(255, 0, 0, 0.125)")
  })

  it("updates rgb values from the picker without switching formats", () => {
    const handleChange = vi.fn()

    render(
      <TokenColorControl
        id="accent"
        label="Accent"
        value="rgb(255, 255, 255)"
        onChange={handleChange}
      />,
    )

    fireEvent.change(screen.getByLabelText("Accent color picker"), {
      target: { value: "#00ff00" },
    })

    expect(handleChange).toHaveBeenCalledWith("rgb(0, 255, 0)")
  })

  it("falls back safely for unsupported values", () => {
    render(
      <TokenColorControl
        id="accent"
        label="Accent"
        value="not-a-color"
        onChange={vi.fn()}
        swatchTestId="accent-swatch"
      />,
    )

    expect(screen.queryByLabelText(/color picker/i)).not.toBeInTheDocument()
    expect(screen.queryByTestId("accent-swatch")).not.toBeInTheDocument()
    expect(screen.getByRole("textbox", { name: "Accent" })).toHaveValue("not-a-color")
  })
})

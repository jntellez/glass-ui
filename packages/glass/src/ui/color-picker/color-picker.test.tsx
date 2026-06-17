import { createRef, useState } from "react"
import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { Field } from "../field"
import { Label } from "../label"
import { ColorPicker, colorPickerVariants, normalizeHexColor } from "./index"

describe("ColorPicker", () => {
  it("renders a compact swatch control by default", () => {
    render(<ColorPicker aria-label="Accent color" defaultValue="#0EA5E9" />)

    const input = screen.getByLabelText("Accent color")

    expect(input).toHaveAttribute("type", "color")
    expect(input).toHaveValue("#0ea5e9")
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument()
  })

  it("supports uncontrolled changes and forwards normalized values", () => {
    const handleValueChange = vi.fn()

    render(
      <ColorPicker
        aria-label="Accent color"
        defaultValue="#7c3aed"
        onValueChange={handleValueChange}
      />,
    )

    const input = screen.getByLabelText("Accent color")
    fireEvent.change(input, { target: { value: "#0EA5E9" } })

    expect(handleValueChange).toHaveBeenLastCalledWith("#0ea5e9")
    expect(input).toHaveValue("#0ea5e9")
  })

  it("supports controlled usage", () => {
    function ControlledColorPicker() {
      const [value, setValue] = useState("#7c3aed")

      return (
        <>
          <p data-testid="value-state">{value}</p>
          <ColorPicker aria-label="Theme color" value={value} onValueChange={setValue} />
        </>
      )
    }

    render(<ControlledColorPicker />)

    const input = screen.getByLabelText("Theme color")
    fireEvent.change(input, { target: { value: "#22c55e" } })

    expect(screen.getByTestId("value-state")).toHaveTextContent("#22c55e")
    expect(input).toHaveValue("#22c55e")
  })

  it("supports refs, field wiring, and disabled state", () => {
    const ref = createRef<HTMLInputElement>()

    render(
      <Field>
        <Label>Accent</Label>
        <ColorPicker ref={ref} disabled className="ring-offset-0" />
      </Field>,
    )

    const input = screen.getByLabelText("Accent")

    expect(ref.current).toBe(input)
    expect(input).toHaveAttribute("id")
    expect(input).toBeDisabled()
    expect(input).toHaveClass("ring-offset-0")
  })

  it("falls back to a default accessible name", () => {
    render(<ColorPicker />)

    expect(screen.getByLabelText("Choose color")).toHaveValue("#7c3aed")
  })

  it("exports helpers and size variant objects", () => {
    expect(ColorPicker).toBeDefined()
    expect(colorPickerVariants({ size: "sm" })).toContain("size-8")
    expect(colorPickerVariants({ size: "md" })).toContain("size-10")
    expect(colorPickerVariants({ size: "lg" })).toContain("size-12")
    expect(normalizeHexColor("abc")).toBe("#aabbcc")
    expect(normalizeHexColor("#123456")).toBe("#123456")
    expect(normalizeHexColor("nope")).toBeNull()
  })
})

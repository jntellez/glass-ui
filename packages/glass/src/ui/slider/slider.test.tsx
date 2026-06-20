import { createRef } from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { Field, FieldDescription, FieldError } from "../field"
import { Label } from "../label"
import { Slider, sliderVariants } from "./index"

describe("Slider", () => {
  it("renders an accessible slider with the default classes", () => {
    render(<Slider aria-label="Volume" defaultValue={[50]} />)

    const slider = screen.getByRole("slider", { name: "Volume" })

    expect(slider).toHaveAttribute("aria-valuenow", "50")
    expect(slider).toHaveClass("glass", "size-4.5")
  })

  it("applies explicit variant and size props", () => {
    render(
      <>
        <Slider aria-label="Soft" defaultValue={[25]} variant="soft" size="sm" />
        <Slider aria-label="Strong" defaultValue={[75]} variant="strong" size="lg" />
        <Slider aria-label="Transparent" defaultValue={[10]} variant="transparent" />
      </>,
    )

    expect(screen.getByRole("slider", { name: "Soft" })).toHaveClass("glass-soft", "size-3.5")
    expect(screen.getByRole("slider", { name: "Strong" })).toHaveClass("glass-strong", "size-5.5")
    expect(screen.getByRole("slider", { name: "Transparent" })).toHaveClass(
      "bg-glass-bg",
      "border-glass-border",
    )
  })

  it("updates the value with keyboard interaction", async () => {
    const user = userEvent.setup()
    const handleValueChange = vi.fn()

    render(
      <Slider
        aria-label="Brightness"
        defaultValue={[40]}
        step={5}
        onValueChange={handleValueChange}
      />,
    )

    const slider = screen.getByRole("slider", { name: "Brightness" })

    slider.focus()
    await user.keyboard("{ArrowRight}")

    expect(handleValueChange).toHaveBeenCalledWith([45])
  })

  it("forwards refs and inherits field accessibility metadata", () => {
    const ref = createRef<HTMLSpanElement>()

    render(
      <Field invalid>
        <Label>Blur amount</Label>
        <Slider ref={ref} defaultValue={[6]} />
        <FieldDescription>Controls backdrop blur.</FieldDescription>
        <FieldError>Blur is required.</FieldError>
      </Field>,
    )

    const slider = screen.getByRole("slider", { name: "Blur amount" })
    const description = screen.getByText("Controls backdrop blur.")
    const error = screen.getByRole("alert")

    expect(ref.current).toHaveAttribute("id")
    expect(slider).toHaveAttribute("aria-labelledby")
    expect(slider).toHaveAttribute("aria-invalid", "true")
    expect(slider).toHaveAttribute(
      "aria-describedby",
      `${description.getAttribute("id")} ${error.getAttribute("id")}`,
    )
  })

  it("preserves explicit thumb labelling props", () => {
    render(
      <Field>
        <Label>Volume</Label>
        <Slider aria-label="Custom volume" defaultValue={[30]} />
      </Field>,
    )

    expect(screen.getByRole("slider", { name: "Custom volume" })).toBeInTheDocument()
  })

  it("exports variant helpers", () => {
    expect(Slider).toBeDefined()
    expect(sliderVariants({ size: "sm" })).toContain("touch-none")
  })
})

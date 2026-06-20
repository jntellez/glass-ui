import { fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { TokenShadowRow } from "./TokenShadowRow"

describe("TokenShadowRow", () => {
  it("renders shadow controls for parseable values", () => {
    render(
      <TokenShadowRow
        token="--glass-shadow-sm"
        value="0 2px 8px 0 rgba(0, 0, 0, 0.06)"
        onChange={vi.fn()}
      />,
    )

    expect(screen.getByRole("textbox", { name: "Shadow small color" })).toHaveValue(
      "rgba(0, 0, 0, 0.06)",
    )
    expect(screen.getByRole("slider", { name: "Shadow small Opacity slider" })).toHaveAttribute(
      "aria-valuenow",
      "0.06",
    )
    expect(screen.getByLabelText("Shadow small color picker")).toBeInTheDocument()
  })

  it("preserves existing alpha when the shadow color picker changes rgb channels", () => {
    const handleChange = vi.fn()

    render(
      <TokenShadowRow
        token="--glass-shadow-md"
        value="0 4px 30px 0 rgba(0, 0, 0, 0.125)"
        onChange={handleChange}
      />,
    )

    fireEvent.change(screen.getByLabelText("Shadow medium color picker"), {
      target: { value: "#ff0000" },
    })

    expect(handleChange).toHaveBeenLastCalledWith("0px 4px 30px 0px rgba(255, 0, 0, 0.125)")
  })

  it("emits a full shadow string when a shadow slider changes", async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()

    render(
      <TokenShadowRow
        token="--glass-shadow-md"
        value="0 4px 30px 0 rgba(0, 0, 0, 0.1)"
        onChange={handleChange}
      />,
    )

    const blurSlider = screen.getByRole("slider", { name: "Shadow medium Blur slider" })

    blurSlider.focus()
    await user.keyboard("{ArrowRight}")

    expect(handleChange).toHaveBeenLastCalledWith("0px 4px 31px 0px rgba(0, 0, 0, 0.1)")
  })

  it("preserves alpha precision when blur changes without touching opacity", async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()

    render(
      <TokenShadowRow
        token="--glass-shadow-md"
        value="0 4px 30px 0 rgba(0, 0, 0, 0.125)"
        onChange={handleChange}
      />,
    )

    const blurSlider = screen.getByRole("slider", { name: "Shadow medium Blur slider" })

    blurSlider.focus()
    await user.keyboard("{ArrowRight}")

    expect(handleChange).toHaveBeenLastCalledWith("0px 4px 31px 0px rgba(0, 0, 0, 0.125)")
  })

  it("updates color and opacity together when rgba color input changes", async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()

    render(
      <TokenShadowRow
        token="--glass-shadow-lg"
        value="0 8px 40px 0 rgba(0, 0, 0, 0.2)"
        onChange={handleChange}
      />,
    )

    const colorInput = screen.getByRole("textbox", { name: "Shadow large color" })

    await user.clear(colorInput)
    await user.type(colorInput, "rgba(12, 34, 56, 0.45)")

    expect(handleChange).toHaveBeenLastCalledWith("0px 8px 40px 0px rgba(12, 34, 56, 0.45)")
    expect(screen.getByRole("textbox", { name: "Shadow large Opacity" })).toHaveValue("0.45")
  })

  it("formats explicit opacity changes with control precision", async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()

    render(
      <TokenShadowRow
        token="--glass-shadow-lg"
        value="0 8px 40px 0 rgba(0, 0, 0, 0.125)"
        onChange={handleChange}
      />,
    )

    const opacityInput = screen.getByRole("textbox", { name: "Shadow large Opacity" })

    fireEvent.change(opacityInput, { target: { value: "0.13" } })

    expect(handleChange).toHaveBeenLastCalledWith("0px 8px 40px 0px rgba(0, 0, 0, 0.13)")

    fireEvent.change(opacityInput, { target: { value: "0.5" } })

    expect(handleChange).toHaveBeenLastCalledWith("0px 8px 40px 0px rgba(0, 0, 0, 0.5)")
  })
})

import { createRef, useState } from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"
import { Field, FieldDescription } from "../field"
import { Label } from "../label"
import { Switch, switchThumbVariants, switchVariants } from "./index"

describe("Switch", () => {
  it("renders an unchecked switch by default and toggles on click", async () => {
    const user = userEvent.setup()

    render(<Switch aria-label="Airplane mode" />)

    const control = screen.getByRole("switch", { name: "Airplane mode" })

    expect(control).toHaveAttribute("aria-checked", "false")
    expect(control).toHaveClass("glass", "rounded-full", "border-glass-border/80")

    await user.click(control)

    expect(control).toHaveAttribute("aria-checked", "true")
  })

  it("supports keyboard interaction", async () => {
    const user = userEvent.setup()

    render(<Switch aria-label="Reduce motion" />)

    const control = screen.getByRole("switch", { name: "Reduce motion" })

    await user.tab()
    await user.keyboard(" ")

    expect(control).toHaveAttribute("aria-checked", "true")
  })

  it("supports labels through id and htmlFor", async () => {
    const user = userEvent.setup()

    render(
      <div>
        <Switch id="marketing-switch" />
        <Label htmlFor="marketing-switch">Marketing updates</Label>
      </div>,
    )

    const control = screen.getByRole("switch", { name: "Marketing updates" })

    await user.click(screen.getByText("Marketing updates"))

    expect(control).toHaveAttribute("aria-checked", "true")
  })

  it("prevents interaction when disabled", async () => {
    const user = userEvent.setup()

    render(<Switch aria-label="Notifications" disabled />)

    const control = screen.getByRole("switch", { name: "Notifications" })

    expect(control).toBeDisabled()
    expect(control).toHaveClass("disabled:opacity-50")

    await user.click(control)

    expect(control).toHaveAttribute("aria-checked", "false")
  })

  it("applies sizes", () => {
    render(
      <div>
        <Switch aria-label="Small" size="sm" />
        <Switch aria-label="Default" />
        <Switch aria-label="Large" size="lg" />
      </div>,
    )

    expect(screen.getByRole("switch", { name: "Small" })).toHaveClass("glass", "h-5", "w-9")
    expect(screen.getByRole("switch", { name: "Default" })).toHaveClass("glass", "h-6", "w-11")
    expect(screen.getByRole("switch", { name: "Large" })).toHaveClass("glass", "h-7", "w-14")
  })

  it("keeps className as an escape hatch", () => {
    render(<Switch aria-label="Custom" className="ring-1 ring-white/20" />)

    expect(screen.getByRole("switch", { name: "Custom" })).toHaveClass("ring-1", "ring-white/20")
  })

  it("supports controlled usage", async () => {
    const user = userEvent.setup()

    function ControlledSwitch() {
      const [checked, setChecked] = useState(false)

      return (
        <Switch aria-label="Automatic updates" checked={checked} onCheckedChange={setChecked} />
      )
    }

    render(<ControlledSwitch />)

    const control = screen.getByRole("switch", { name: "Automatic updates" })

    await user.click(control)

    expect(control).toHaveAttribute("aria-checked", "true")
  })

  it("composes with field labels and descriptions without explicit ids", () => {
    render(
      <Field className="flex items-start gap-3">
        <Switch />
        <div className="space-y-1">
          <Label>Sync preference</Label>
          <FieldDescription>Changes apply across devices.</FieldDescription>
        </div>
      </Field>,
    )

    const control = screen.getByRole("switch", { name: "Sync preference" })
    const description = screen.getByText("Changes apply across devices.")

    expect(control).toHaveAttribute("id")
    expect(control).toHaveAttribute("aria-describedby", description.getAttribute("id") ?? "")
  })

  it("forwards refs and exports helpers", () => {
    const ref = createRef<HTMLButtonElement>()

    render(<Switch ref={ref} aria-label="Presence" data-testid="presence-switch" />)

    expect(ref.current).toBe(screen.getByTestId("presence-switch"))
    expect(Switch).toBeDefined()
    expect(switchVariants).toBeDefined()
    expect(switchThumbVariants).toBeDefined()
  })
})

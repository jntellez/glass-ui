import { createRef, useState } from "react"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"
import { Label } from "../label"
import { RadioGroup, RadioGroupItem, radioGroupItemVariants, radioGroupVariants } from "./index"

describe("RadioGroup", () => {
  it("renders a default selection and updates on click", async () => {
    const user = userEvent.setup()

    render(
      <RadioGroup defaultValue="starter" aria-label="Plan">
        <RadioGroupItem value="starter" aria-label="Starter" />
        <RadioGroupItem value="pro" aria-label="Pro" />
      </RadioGroup>,
    )

    const starter = screen.getByRole("radio", { name: "Starter" })
    const pro = screen.getByRole("radio", { name: "Pro" })

    expect(starter).toHaveAttribute("aria-checked", "true")
    expect(pro).toHaveAttribute("aria-checked", "false")

    await user.click(pro)

    expect(pro).toHaveAttribute("aria-checked", "true")
    expect(starter).toHaveAttribute("aria-checked", "false")
  })

  it("supports labels through id and htmlFor", async () => {
    const user = userEvent.setup()

    render(
      <RadioGroup defaultValue="monthly" aria-label="Billing cadence">
        <div>
          <RadioGroupItem id="billing-monthly" value="monthly" />
          <Label htmlFor="billing-monthly">Monthly</Label>
        </div>
        <div>
          <RadioGroupItem id="billing-yearly" value="yearly" />
          <Label htmlFor="billing-yearly">Yearly</Label>
        </div>
      </RadioGroup>,
    )

    await user.click(screen.getByText("Yearly"))

    expect(screen.getByRole("radio", { name: "Yearly" })).toHaveAttribute("aria-checked", "true")
  })

  it("supports keyboard navigation with arrow keys", async () => {
    const user = userEvent.setup()

    render(
      <RadioGroup defaultValue="small" orientation="horizontal" aria-label="Size">
        <RadioGroupItem value="small" aria-label="Small" />
        <RadioGroupItem value="medium" aria-label="Medium" />
        <RadioGroupItem value="large" aria-label="Large" />
      </RadioGroup>,
    )

    await user.click(screen.getByRole("radio", { name: "Small" }))
    await user.keyboard("{ArrowRight}")

    await waitFor(() => {
      expect(screen.getByRole("radio", { name: "Medium" })).toHaveAttribute("tabindex", "0")
    })

    await user.keyboard(" ")

    expect(screen.getByRole("radio", { name: "Medium" })).toHaveAttribute("aria-checked", "true")
  })

  it("supports controlled usage", async () => {
    const user = userEvent.setup()

    function ControlledRadioGroup() {
      const [value, setValue] = useState("system")

      return (
        <RadioGroup value={value} onValueChange={setValue} aria-label="Theme">
          <RadioGroupItem value="light" aria-label="Light" />
          <RadioGroupItem value="dark" aria-label="Dark" />
          <RadioGroupItem value="system" aria-label="System" />
        </RadioGroup>
      )
    }

    render(<ControlledRadioGroup />)

    await user.click(screen.getByRole("radio", { name: "Dark" }))

    expect(screen.getByRole("radio", { name: "Dark" })).toHaveAttribute("aria-checked", "true")
  })

  it("prevents interaction for disabled groups and disabled items", async () => {
    const user = userEvent.setup()

    render(
      <div>
        <RadioGroup defaultValue="team" disabled aria-label="Disabled visibility">
          <RadioGroupItem value="team" aria-label="Team" />
          <RadioGroupItem value="private" aria-label="Private" />
        </RadioGroup>

        <RadioGroup defaultValue="email" aria-label="Notifications">
          <RadioGroupItem value="email" aria-label="Email" />
          <RadioGroupItem value="sms" aria-label="SMS" disabled />
        </RadioGroup>
      </div>,
    )

    const privateOption = screen.getByRole("radio", { name: "Private" })
    const smsOption = screen.getByRole("radio", { name: "SMS" })

    expect(privateOption).toBeDisabled()
    expect(smsOption).toBeDisabled()

    await user.click(privateOption)
    await user.click(smsOption)

    expect(screen.getByRole("radio", { name: "Team" })).toHaveAttribute("aria-checked", "true")
    expect(screen.getByRole("radio", { name: "Email" })).toHaveAttribute("aria-checked", "true")
  })

  it("applies sizes, orientation classes, and forwards refs", () => {
    const ref = createRef<HTMLButtonElement>()

    render(
      <RadioGroup orientation="horizontal" aria-label="Surface" className="rounded-glass-md">
        <RadioGroupItem
          ref={ref}
          value="small"
          aria-label="Small"
          size="sm"
          data-testid="small-option"
        />
        <RadioGroupItem value="large" aria-label="Large" size="lg" />
      </RadioGroup>,
    )

    expect(screen.getByRole("radiogroup", { name: "Surface" })).toHaveClass("flex", "flex-wrap")
    expect(screen.getByTestId("small-option")).toHaveClass("glass", "size-4")
    expect(screen.getByRole("radio", { name: "Large" })).toHaveClass("glass", "size-6")
    expect(ref.current).toBe(screen.getByTestId("small-option"))
    expect(RadioGroup).toBeDefined()
    expect(RadioGroupItem).toBeDefined()
    expect(radioGroupVariants).toBeDefined()
    expect(radioGroupItemVariants).toBeDefined()
  })
})

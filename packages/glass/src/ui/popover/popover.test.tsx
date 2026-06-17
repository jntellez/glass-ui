import { createRef, useState } from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"
import { Button } from "../button"
import { Popover, PopoverAnchor, PopoverContent, PopoverTrigger, popoverVariants } from "./index"

describe("Popover", () => {
  it("renders closed by default", () => {
    render(
      <Popover>
        <PopoverTrigger>Open details</PopoverTrigger>
        <PopoverContent>Hidden content</PopoverContent>
      </Popover>,
    )

    expect(screen.queryByText("Hidden content")).not.toBeInTheDocument()
  })

  it("toggles content on click", async () => {
    const user = userEvent.setup()

    render(
      <Popover>
        <PopoverTrigger>Open details</PopoverTrigger>
        <PopoverContent>Hidden content</PopoverContent>
      </Popover>,
    )

    await user.click(screen.getByRole("button", { name: "Open details" }))

    expect(screen.getByText("Hidden content")).toBeVisible()
  })

  it("supports keyboard interaction and escape to close", async () => {
    const user = userEvent.setup()

    render(
      <Popover>
        <PopoverTrigger>Open details</PopoverTrigger>
        <PopoverContent>Hidden content</PopoverContent>
      </Popover>,
    )

    await user.tab()
    await user.keyboard("{Enter}")

    expect(screen.getByText("Hidden content")).toBeVisible()

    await user.keyboard("{Escape}")

    expect(screen.queryByText("Hidden content")).not.toBeInTheDocument()
  })

  it("supports controlled mode", async () => {
    const user = userEvent.setup()

    function ControlledPopover() {
      const [open, setOpen] = useState(false)

      return (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger>Open details</PopoverTrigger>
          <PopoverContent>Hidden content</PopoverContent>
        </Popover>
      )
    }

    render(<ControlledPopover />)

    await user.click(screen.getByRole("button", { name: "Open details" }))

    expect(screen.getByText("Hidden content")).toBeVisible()
  })

  it("supports trigger asChild composition", async () => {
    const user = userEvent.setup()

    render(
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="strong">Invite</Button>
        </PopoverTrigger>
        <PopoverContent>Popover body</PopoverContent>
      </Popover>,
    )

    const trigger = screen.getByRole("button", { name: "Invite" })
    expect(trigger).toHaveClass("glass", "glass-strong")

    await user.click(trigger)

    expect(screen.getByText("Popover body")).toBeVisible()
  })

  it("applies variants and className as escape hatches", async () => {
    const user = userEvent.setup()
    expect(popoverVariants({ variant: "default" })).toContain("glass")
    expect(popoverVariants({ variant: "soft" })).toContain("glass-soft")
    expect(popoverVariants({ variant: "strong" })).toContain("glass-strong")

    render(
      <Popover>
        <PopoverTrigger>Strong</PopoverTrigger>
        <PopoverContent variant="strong" className="max-w-xs" data-testid="strong-content">
          Strong content
        </PopoverContent>
      </Popover>,
    )

    await user.click(screen.getByRole("button", { name: "Strong" }))

    expect(screen.getByTestId("strong-content")).toHaveClass("glass", "glass-strong", "max-w-xs")
  })

  it("forwards refs and exports helpers", async () => {
    const user = userEvent.setup()
    const ref = createRef<HTMLDivElement>()

    render(
      <Popover>
        <PopoverAnchor data-testid="anchor" />
        <PopoverTrigger>Open details</PopoverTrigger>
        <PopoverContent ref={ref} data-testid="content">
          Hidden content
        </PopoverContent>
      </Popover>,
    )

    await user.click(screen.getByRole("button", { name: "Open details" }))

    expect(ref.current).toBe(screen.getByTestId("content"))
    expect(screen.getByTestId("anchor")).toBeInTheDocument()
    expect(Popover).toBeDefined()
    expect(PopoverTrigger).toBeDefined()
    expect(PopoverContent).toBeDefined()
    expect(PopoverAnchor).toBeDefined()
    expect(popoverVariants).toBeDefined()
  })
})

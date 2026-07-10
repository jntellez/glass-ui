import { createRef, useState } from "react"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"
import { Button } from "../button"
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  tooltipContentVariants,
} from "./index"

describe("Tooltip", () => {
  it("renders closed by default", () => {
    render(
      <TooltipProvider delayDuration={0} disableHoverableContent>
        <Tooltip>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent>Helpful hint</TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    )

    expect(screen.queryByText("Helpful hint")).not.toBeInTheDocument()
  })

  it("opens on hover", async () => {
    const user = userEvent.setup()

    render(
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent>Helpful hint</TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    )

    const trigger = screen.getByRole("button", { name: "Hover me" })

    await user.hover(trigger)

    expect(screen.getByText("Helpful hint", { selector: "div" })).toBeVisible()
  })

  it("opens on keyboard focus and closes on escape", async () => {
    const user = userEvent.setup()

    render(
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger>Focus me</TooltipTrigger>
          <TooltipContent>Keyboard hint</TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    )

    await user.tab()

    expect(screen.getByText("Keyboard hint", { selector: "div" })).toBeVisible()

    await user.keyboard("{Escape}")

    await waitFor(() => {
      expect(screen.queryByText("Keyboard hint")).not.toBeInTheDocument()
    })
  })

  it("supports controlled usage", async () => {
    const user = userEvent.setup()

    function ControlledTooltip() {
      const [open, setOpen] = useState(false)

      return (
        <TooltipProvider delayDuration={0}>
          <Tooltip open={open} onOpenChange={setOpen}>
            <TooltipTrigger>Open help</TooltipTrigger>
            <TooltipContent>Controlled hint</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    }

    render(<ControlledTooltip />)

    await user.hover(screen.getByRole("button", { name: "Open help" }))

    expect(screen.getByText("Controlled hint", { selector: "div" })).toBeVisible()
  })

  it("supports trigger asChild composition", async () => {
    const user = userEvent.setup()

    render(
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="strong">Share</Button>
          </TooltipTrigger>
          <TooltipContent>Share this view</TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    )

    const trigger = screen.getByRole("button", { name: "Share" })

    expect(trigger).toHaveClass("glass", "glass-strong")

    await user.hover(trigger)

    expect(screen.getByText("Share this view", { selector: "div" })).toBeVisible()
  })

  it("applies placement props and className as escape hatches", async () => {
    const user = userEvent.setup()

    expect(tooltipContentVariants()).toContain("glass")

    render(
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger>Inspect</TooltipTrigger>
          <TooltipContent
            side="right"
            align="start"
            className="max-w-40"
            data-testid="tooltip-content"
          >
            Placement hint
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    )

    await user.hover(screen.getByRole("button", { name: "Inspect" }))

    const content = screen.getByTestId("tooltip-content")

    expect(content).toHaveClass("glass", "max-w-40")
    expect(content).toHaveAttribute("data-side", "right")
    expect(content).toHaveAttribute("data-align", "start")
  })

  it("forwards refs and exports helpers", async () => {
    const user = userEvent.setup()
    const contentRef = createRef<HTMLDivElement>()
    const arrowRef = createRef<SVGSVGElement>()

    render(
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger>Open</TooltipTrigger>
          <TooltipContent ref={contentRef} data-testid="tooltip-content">
            Ref hint
            <TooltipArrow ref={arrowRef} data-testid="tooltip-arrow" />
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    )

    await user.hover(screen.getByRole("button", { name: "Open" }))

    expect(contentRef.current).toBe(screen.getByTestId("tooltip-content"))
    expect(arrowRef.current).toBe(screen.getByTestId("tooltip-arrow"))
    expect(Tooltip).toBeDefined()
    expect(TooltipProvider).toBeDefined()
    expect(TooltipTrigger).toBeDefined()
    expect(TooltipContent).toBeDefined()
    expect(TooltipArrow).toBeDefined()
    expect(tooltipContentVariants).toBeDefined()
  })
})

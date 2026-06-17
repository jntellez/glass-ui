import { createRef, useState } from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"
import { Button } from "../button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger, collapsibleVariants } from "./index"

describe("Collapsible", () => {
  it("renders closed by default", () => {
    render(
      <Collapsible>
        <CollapsibleTrigger>Details</CollapsibleTrigger>
        <CollapsibleContent>Hidden content</CollapsibleContent>
      </Collapsible>,
    )

    expect(screen.getByRole("button", { name: "Details" }).closest("[data-state]")).toHaveAttribute(
      "data-state",
      "closed",
    )
  })

  it("toggles content on click", async () => {
    const user = userEvent.setup()

    render(
      <Collapsible>
        <CollapsibleTrigger>Details</CollapsibleTrigger>
        <CollapsibleContent>Hidden content</CollapsibleContent>
      </Collapsible>,
    )

    const trigger = screen.getByRole("button", { name: "Details" })

    await user.click(trigger)

    expect(trigger.closest("[data-state]")).toHaveAttribute("data-state", "open")
    expect(screen.getByText("Hidden content")).toBeVisible()
  })

  it("supports keyboard interaction", async () => {
    const user = userEvent.setup()

    render(
      <Collapsible>
        <CollapsibleTrigger>Details</CollapsibleTrigger>
        <CollapsibleContent>Hidden content</CollapsibleContent>
      </Collapsible>,
    )

    const trigger = screen.getByRole("button", { name: "Details" })

    await user.tab()
    await user.keyboard("{Enter}")

    expect(trigger.closest("[data-state]")).toHaveAttribute("data-state", "open")
  })

  it("prevents interaction when disabled", async () => {
    const user = userEvent.setup()

    render(
      <Collapsible disabled data-testid="collapsible">
        <CollapsibleTrigger>Details</CollapsibleTrigger>
        <CollapsibleContent>Hidden content</CollapsibleContent>
      </Collapsible>,
    )

    const trigger = screen.getByRole("button", { name: "Details" })

    expect(trigger).toBeDisabled()
    expect(screen.getByTestId("collapsible")).toHaveClass("data-[disabled]:opacity-60", "flex")

    await user.click(trigger)

    expect(trigger.closest("[data-state]")).toHaveAttribute("data-state", "closed")
  })

  it("applies variant classes", () => {
    render(
      <>
        <Collapsible variant="soft" data-testid="soft">
          <CollapsibleTrigger>Soft</CollapsibleTrigger>
          <CollapsibleContent>Soft content</CollapsibleContent>
        </Collapsible>
        <Collapsible variant="strong" data-testid="strong">
          <CollapsibleTrigger>Strong</CollapsibleTrigger>
          <CollapsibleContent>Strong content</CollapsibleContent>
        </Collapsible>
      </>,
    )

    expect(screen.getByTestId("soft")).toHaveAttribute("data-variant", "soft")
    expect(screen.getByTestId("strong")).toHaveAttribute("data-variant", "strong")
  })

  it("keeps className as an escape hatch", () => {
    render(
      <Collapsible className="max-w-md" defaultOpen data-testid="collapsible">
        <CollapsibleTrigger className="tracking-wide">Details</CollapsibleTrigger>
        <CollapsibleContent className="border-dashed" data-testid="content">
          <span data-testid="content-text">Hidden content</span>
        </CollapsibleContent>
      </Collapsible>,
    )

    expect(screen.getByTestId("collapsible")).toHaveClass("flex", "max-w-md")
    expect(screen.getByRole("button", { name: "Details" })).toHaveClass("tracking-wide")
    expect(screen.getByTestId("content")).toHaveClass("border-dashed")
  })

  it("supports trigger sizes", () => {
    render(
      <div>
        <Collapsible>
          <CollapsibleTrigger size="sm">Small</CollapsibleTrigger>
          <CollapsibleContent>Small content</CollapsibleContent>
        </Collapsible>
        <Collapsible>
          <CollapsibleTrigger>Medium</CollapsibleTrigger>
          <CollapsibleContent>Medium content</CollapsibleContent>
        </Collapsible>
        <Collapsible>
          <CollapsibleTrigger size="lg">Large</CollapsibleTrigger>
          <CollapsibleContent>Large content</CollapsibleContent>
        </Collapsible>
      </div>,
    )

    expect(screen.getByRole("button", { name: "Small" })).toHaveClass("h-6", "px-2", "text-xs")
    expect(screen.getByRole("button", { name: "Medium" })).toHaveClass("h-8", "px-2.5", "text-sm")
    expect(screen.getByRole("button", { name: "Large" })).toHaveClass("h-10", "px-3.5", "text-base")
  })

  it("renders a chevron affordance and lightweight content wrapper", async () => {
    const user = userEvent.setup()

    render(
      <Collapsible>
        <CollapsibleTrigger>Details</CollapsibleTrigger>
        <CollapsibleContent>
          <span data-testid="content-text">Hidden content</span>
        </CollapsibleContent>
      </Collapsible>,
    )

    const trigger = screen.getByRole("button", { name: "Details" })
    expect(trigger).toHaveClass("rounded-glass-sm", "font-medium")
    expect(trigger.querySelector("svg")).toBeTruthy()

    await user.click(trigger)

    expect(screen.getByTestId("content-text").parentElement).toHaveClass(
      "pl-1",
      "pt-1",
      "text-muted-foreground",
    )
  })

  it("supports asChild with a single custom child and still toggles content", async () => {
    const user = userEvent.setup()

    render(
      <Collapsible variant="soft">
        <CollapsibleTrigger asChild size="lg">
          <button type="button">Custom trigger</button>
        </CollapsibleTrigger>
        <CollapsibleContent>Hidden content</CollapsibleContent>
      </Collapsible>,
    )

    const trigger = screen.getByRole("button", { name: "Custom trigger" })

    expect(trigger).toHaveClass("h-10", "px-3.5", "text-base")
    expect(trigger).toHaveAttribute("aria-expanded", "false")
    expect(trigger.querySelector("[data-slot=collapsible-chevron]")).toBeNull()

    await user.click(trigger)

    expect(trigger).toHaveAttribute("aria-expanded", "true")
    expect(screen.getByText("Hidden content")).toBeVisible()
  })

  it("passes trigger classes through when asChild wraps another component", async () => {
    const user = userEvent.setup()

    render(
      <Collapsible>
        <CollapsibleTrigger asChild className="w-full justify-start">
          <Button variant="strong">Open custom</Button>
        </CollapsibleTrigger>
        <CollapsibleContent>Hidden content</CollapsibleContent>
      </Collapsible>,
    )

    const trigger = screen.getByRole("button", { name: "Open custom" })

    expect(trigger).toHaveClass("glass", "glass-strong", "w-full", "justify-start")

    await user.click(trigger)

    expect(screen.getByText("Hidden content")).toBeVisible()
  })

  it("supports controlled mode", async () => {
    const user = userEvent.setup()

    function ControlledCollapsible() {
      const [open, setOpen] = useState(false)

      return (
        <Collapsible open={open} onOpenChange={setOpen}>
          <CollapsibleTrigger>Details</CollapsibleTrigger>
          <CollapsibleContent>Hidden content</CollapsibleContent>
        </Collapsible>
      )
    }

    render(<ControlledCollapsible />)

    await user.click(screen.getByRole("button", { name: "Details" }))

    expect(screen.getByRole("button", { name: "Details" }).closest("[data-state]")).toHaveAttribute(
      "data-state",
      "open",
    )
  })

  it("forwards refs and exports helpers", () => {
    const ref = createRef<HTMLButtonElement>()

    render(
      <Collapsible>
        <CollapsibleTrigger ref={ref} data-testid="trigger">
          Details
        </CollapsibleTrigger>
        <CollapsibleContent>Hidden content</CollapsibleContent>
      </Collapsible>,
    )

    expect(ref.current).toBe(screen.getByTestId("trigger"))
    expect(Collapsible).toBeDefined()
    expect(CollapsibleTrigger).toBeDefined()
    expect(CollapsibleContent).toBeDefined()
    expect(collapsibleVariants).toBeDefined()
  })
})

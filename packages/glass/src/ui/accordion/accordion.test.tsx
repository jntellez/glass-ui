import { createRef, useState } from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionTrigger,
  accordionVariants,
} from "./index"

describe("Accordion", () => {
  it("renders items collapsed by default", () => {
    render(
      <Accordion type="single">
        <AccordionItem value="1">
          <AccordionHeader>
            <AccordionTrigger>First</AccordionTrigger>
          </AccordionHeader>
          <AccordionContent>First content</AccordionContent>
        </AccordionItem>
        <AccordionItem value="2">
          <AccordionHeader>
            <AccordionTrigger>Second</AccordionTrigger>
          </AccordionHeader>
          <AccordionContent>Second content</AccordionContent>
        </AccordionItem>
      </Accordion>,
    )

    const firstItem = screen.getByRole("button", { name: "First" }).closest("[data-state]")
    const secondItem = screen.getByRole("button", { name: "Second" }).closest("[data-state]")

    expect(firstItem).toHaveAttribute("data-state", "closed")
    expect(secondItem).toHaveAttribute("data-state", "closed")
  })

  it("toggles one item at a time with single type", async () => {
    const user = userEvent.setup()

    render(
      <Accordion type="single">
        <AccordionItem value="1">
          <AccordionHeader>
            <AccordionTrigger>First</AccordionTrigger>
          </AccordionHeader>
          <AccordionContent>First content</AccordionContent>
        </AccordionItem>
        <AccordionItem value="2">
          <AccordionHeader>
            <AccordionTrigger>Second</AccordionTrigger>
          </AccordionHeader>
          <AccordionContent>Second content</AccordionContent>
        </AccordionItem>
      </Accordion>,
    )

    const firstTrigger = screen.getByRole("button", { name: "First" })
    const secondTrigger = screen.getByRole("button", { name: "Second" })

    await user.click(firstTrigger)

    expect(firstTrigger.closest("[data-state]")).toHaveAttribute("data-state", "open")
    expect(secondTrigger.closest("[data-state]")).toHaveAttribute("data-state", "closed")

    await user.click(secondTrigger)

    expect(firstTrigger.closest("[data-state]")).toHaveAttribute("data-state", "closed")
    expect(secondTrigger.closest("[data-state]")).toHaveAttribute("data-state", "open")
  })

  it("supports closing the open item when single is collapsible", async () => {
    const user = userEvent.setup()

    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="1">
          <AccordionHeader>
            <AccordionTrigger>First</AccordionTrigger>
          </AccordionHeader>
          <AccordionContent>First content</AccordionContent>
        </AccordionItem>
      </Accordion>,
    )

    const trigger = screen.getByRole("button", { name: "First" })

    await user.click(trigger)
    expect(trigger.closest("[data-state]")).toHaveAttribute("data-state", "open")

    await user.click(trigger)
    expect(trigger.closest("[data-state]")).toHaveAttribute("data-state", "closed")
  })

  it("allows simultaneous expansion with multiple type", async () => {
    const user = userEvent.setup()

    render(
      <Accordion type="multiple">
        <AccordionItem value="1">
          <AccordionHeader>
            <AccordionTrigger>First</AccordionTrigger>
          </AccordionHeader>
          <AccordionContent>First content</AccordionContent>
        </AccordionItem>
        <AccordionItem value="2">
          <AccordionHeader>
            <AccordionTrigger>Second</AccordionTrigger>
          </AccordionHeader>
          <AccordionContent>Second content</AccordionContent>
        </AccordionItem>
      </Accordion>,
    )

    const firstTrigger = screen.getByRole("button", { name: "First" })
    const secondTrigger = screen.getByRole("button", { name: "Second" })

    await user.click(firstTrigger)
    await user.click(secondTrigger)

    expect(firstTrigger.closest("[data-state]")).toHaveAttribute("data-state", "open")
    expect(secondTrigger.closest("[data-state]")).toHaveAttribute("data-state", "open")
  })

  it("prevents expansion when an item is disabled", async () => {
    const user = userEvent.setup()

    render(
      <Accordion type="single">
        <AccordionItem value="1" disabled data-testid="disabled-item">
          <AccordionHeader>
            <AccordionTrigger>Disabled</AccordionTrigger>
          </AccordionHeader>
          <AccordionContent>Disabled content</AccordionContent>
        </AccordionItem>
      </Accordion>,
    )

    const trigger = screen.getByRole("button", { name: "Disabled" })
    const item = screen.getByTestId("disabled-item")

    expect(trigger).toHaveClass("disabled:opacity-50")
    expect(item).toHaveAttribute("data-state", "closed")
    expect(item).toHaveClass("data-[disabled]:opacity-60")

    await user.click(trigger)

    expect(item).toHaveAttribute("data-state", "closed")
  })

  it("applies variant classes correctly", () => {
    render(
      <Accordion type="single">
        <AccordionItem value="1" variant="soft" data-testid="soft">
          <AccordionHeader>
            <AccordionTrigger>Soft</AccordionTrigger>
          </AccordionHeader>
          <AccordionContent>Soft content</AccordionContent>
        </AccordionItem>
        <AccordionItem value="2" variant="strong" data-testid="strong">
          <AccordionHeader>
            <AccordionTrigger>Strong</AccordionTrigger>
          </AccordionHeader>
          <AccordionContent>Strong content</AccordionContent>
        </AccordionItem>
      </Accordion>,
    )

    const softItem = screen.getByTestId("soft")
    const strongItem = screen.getByTestId("strong")

    expect(softItem).toHaveClass("glass", "glass-soft")
    expect(strongItem).toHaveClass("glass", "glass-strong")
  })

  it("keeps className as an escape hatch on AccordionItem", () => {
    render(
      <Accordion type="single">
        <AccordionItem value="1" className="tracking-wide" data-testid="item">
          <AccordionHeader>
            <AccordionTrigger>First</AccordionTrigger>
          </AccordionHeader>
          <AccordionContent>First content</AccordionContent>
        </AccordionItem>
      </Accordion>,
    )

    const item = screen.getByTestId("item")

    expect(item).toHaveClass("glass", "tracking-wide")
  })

  it("renders a chevron affordance and padded content wrapper", async () => {
    const user = userEvent.setup()

    render(
      <Accordion type="single">
        <AccordionItem value="1" data-testid="item">
          <AccordionHeader>
            <AccordionTrigger>First</AccordionTrigger>
          </AccordionHeader>
          <AccordionContent>
            <span data-testid="content-text">First content</span>
          </AccordionContent>
        </AccordionItem>
      </Accordion>,
    )

    const trigger = screen.getByRole("button", { name: "First" })
    expect(trigger.querySelector("svg")).toBeTruthy()

    await user.click(trigger)

    const contentText = screen.getByTestId("content-text")
    expect(contentText.parentElement).toHaveClass("px-4", "pb-4", "text-muted-foreground")
  })

  it("supports keyboard navigation to open items", async () => {
    const user = userEvent.setup()

    render(
      <Accordion type="single">
        <AccordionItem value="1">
          <AccordionHeader>
            <AccordionTrigger>First</AccordionTrigger>
          </AccordionHeader>
          <AccordionContent>First content</AccordionContent>
        </AccordionItem>
      </Accordion>,
    )

    const trigger = screen.getByRole("button", { name: "First" })

    await user.tab()
    await user.keyboard("{Enter}")

    expect(trigger.closest("[data-state]")).toHaveAttribute("data-state", "open")
  })

  it("supports controlled mode with value and onValueChange", async () => {
    const user = userEvent.setup()

    function ControlledAccordion() {
      const [value, setValue] = useState<string | undefined>("1")

      return (
        <Accordion type="single" value={value} onValueChange={setValue} collapsible>
          <AccordionItem value="1">
            <AccordionHeader>
              <AccordionTrigger>First</AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>First content</AccordionContent>
          </AccordionItem>
          <AccordionItem value="2">
            <AccordionHeader>
              <AccordionTrigger>Second</AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>Second content</AccordionContent>
          </AccordionItem>
        </Accordion>
      )
    }

    render(<ControlledAccordion />)

    const firstTrigger = screen.getByRole("button", { name: "First" })
    const secondTrigger = screen.getByRole("button", { name: "Second" })

    expect(firstTrigger.closest("[data-state]")).toHaveAttribute("data-state", "open")
    expect(secondTrigger.closest("[data-state]")).toHaveAttribute("data-state", "closed")

    await user.click(secondTrigger)

    expect(firstTrigger.closest("[data-state]")).toHaveAttribute("data-state", "closed")
    expect(secondTrigger.closest("[data-state]")).toHaveAttribute("data-state", "open")
  })

  it("forwards refs and native props", () => {
    const ref = createRef<HTMLDivElement>()

    render(
      <Accordion type="single">
        <AccordionItem ref={ref} value="1" data-testid="item">
          <AccordionHeader>
            <AccordionTrigger>First</AccordionTrigger>
          </AccordionHeader>
          <AccordionContent>First content</AccordionContent>
        </AccordionItem>
      </Accordion>,
    )

    expect(ref.current).toBe(screen.getByTestId("item"))
  })

  it("exports all sub-components and variant objects", () => {
    expect(Accordion).toBeDefined()
    expect(AccordionItem).toBeDefined()
    expect(AccordionHeader).toBeDefined()
    expect(AccordionTrigger).toBeDefined()
    expect(AccordionContent).toBeDefined()
    expect(accordionVariants).toBeDefined()
  })
})

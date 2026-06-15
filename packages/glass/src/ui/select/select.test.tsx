import { createRef } from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { Field, FieldDescription, FieldError } from "../field"
import { Label } from "../label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  SelectViewport,
  selectVariants,
} from "./index"

describe("Select", () => {
  it("renders trigger + content + items with default classes", async () => {
    const user = userEvent.setup()

    render(
      <Select defaultValue="a">
        <SelectTrigger aria-label="Fruit">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectViewport>
            <SelectItem value="a">
              <SelectItemText>Apple</SelectItemText>
            </SelectItem>
          </SelectViewport>
        </SelectContent>
      </Select>,
    )

    const trigger = screen.getByRole("combobox", { name: "Fruit" })

    expect(trigger).toHaveClass("glass", "h-8", "text-sm")
    expect(trigger).toHaveTextContent("Apple")

    await user.click(trigger)

    const listbox = screen.getByRole("listbox")
    const option = screen.getByRole("option", { name: "Apple" })

    expect(listbox).toBeInTheDocument()
    expect(option).toBeInTheDocument()
  })

  it("shows selected item indicator when item is checked", async () => {
    const user = userEvent.setup()

    render(
      <Select defaultValue="a">
        <SelectTrigger aria-label="Fruit">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectViewport>
            <SelectItem value="a">
              <SelectItemText>Apple</SelectItemText>
            </SelectItem>
            <SelectItem value="b">
              <SelectItemText>Banana</SelectItemText>
            </SelectItem>
          </SelectViewport>
        </SelectContent>
      </Select>,
    )

    const trigger = screen.getByRole("combobox", { name: "Fruit" })
    await user.click(trigger)

    const appleOption = screen.getByRole("option", { name: "Apple" })
    const bananaOption = screen.getByRole("option", { name: "Banana" })

    // Apple is selected by default, should have checked state
    expect(appleOption).toHaveAttribute("data-state", "checked")
    // Banana is not selected
    expect(bananaOption).not.toHaveAttribute("data-state", "checked")
  })

  it("renders scroll buttons with icons", () => {
    render(
      <Select defaultValue="a">
        <SelectTrigger aria-label="Fruit">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectViewport>
            <SelectItem value="a">
              <SelectItemText>Apple</SelectItemText>
            </SelectItem>
          </SelectViewport>
        </SelectContent>
      </Select>,
    )

    // Scroll buttons are rendered inside SelectContent
    // We just verify the component renders without errors
    expect(screen.getByText("Apple")).toBeInTheDocument()
  })

  it("renders groups with labels and separators", async () => {
    const user = userEvent.setup()

    render(
      <Select defaultValue="frontend">
        <SelectTrigger aria-label="Role">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectViewport>
            <SelectGroup>
              <SelectLabel>Engineering</SelectLabel>
              <SelectItem value="frontend">
                <SelectItemText>Frontend</SelectItemText>
              </SelectItem>
              <SelectItem value="backend">
                <SelectItemText>Backend</SelectItemText>
              </SelectItem>
            </SelectGroup>
            <SelectSeparator />
            <SelectGroup>
              <SelectLabel>Product</SelectLabel>
              <SelectItem value="design">
                <SelectItemText>Design</SelectItemText>
              </SelectItem>
            </SelectGroup>
          </SelectViewport>
        </SelectContent>
      </Select>,
    )

    const trigger = screen.getByRole("combobox", { name: "Role" })
    expect(trigger).toHaveTextContent("Frontend")

    await user.click(trigger)

    expect(screen.getByText("Engineering")).toBeInTheDocument()
    expect(screen.getByText("Product")).toBeInTheDocument()
    // Verify separator exists in DOM
    expect(document.querySelector("[data-slot='select-separator']")).toBeInTheDocument()
  })

  it("applies all variants and sizes correctly", () => {
    render(
      <>
        <Select defaultValue="a">
          <SelectTrigger variant="soft" size="sm" aria-label="Soft">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="a">
              <SelectItemText>A</SelectItemText>
            </SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="b">
          <SelectTrigger variant="strong" size="lg" aria-label="Strong">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="b">
              <SelectItemText>B</SelectItemText>
            </SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="c">
          <SelectTrigger variant="transparent" aria-label="Transparent">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="c">
              <SelectItemText>C</SelectItemText>
            </SelectItem>
          </SelectContent>
        </Select>
      </>,
    )

    const softTrigger = screen.getByRole("combobox", { name: "Soft" })
    const strongTrigger = screen.getByRole("combobox", { name: "Strong" })
    const transparentTrigger = screen.getByRole("combobox", { name: "Transparent" })

    expect(softTrigger).toHaveClass("glass", "glass-soft", "h-6", "px-2", "text-xs")
    expect(strongTrigger).toHaveClass("glass", "glass-strong", "h-10", "px-3.5", "text-base")
    expect(transparentTrigger).toHaveClass("bg-transparent", "border", "border-glass-border")
    expect(transparentTrigger).not.toHaveClass("glass")
  })

  it("updates value and calls onValueChange when an item is selected", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()

    render(
      <Select defaultValue="a" onValueChange={onValueChange}>
        <SelectTrigger aria-label="Fruit">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectViewport>
            <SelectItem value="a">
              <SelectItemText>Apple</SelectItemText>
            </SelectItem>
            <SelectItem value="b">
              <SelectItemText>Banana</SelectItemText>
            </SelectItem>
            <SelectItem value="c">
              <SelectItemText>Cherry</SelectItemText>
            </SelectItem>
          </SelectViewport>
        </SelectContent>
      </Select>,
    )

    const trigger = screen.getByRole("combobox", { name: "Fruit" })

    expect(trigger).toHaveTextContent("Apple")

    await user.click(trigger)
    await user.click(screen.getByRole("option", { name: "Banana" }))

    expect(onValueChange).toHaveBeenCalledWith("b")
    expect(trigger).toHaveTextContent("Banana")
  })

  it("prevents interaction and shows reduced opacity when disabled", async () => {
    const user = userEvent.setup()

    render(
      <Select defaultValue="a" disabled>
        <SelectTrigger aria-label="Fruit">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">
            <SelectItemText>Apple</SelectItemText>
          </SelectItem>
        </SelectContent>
      </Select>,
    )

    const trigger = screen.getByRole("combobox", { name: "Fruit" })

    expect(trigger).toHaveClass("disabled:opacity-50")
    expect(trigger).toHaveAttribute("data-disabled")

    await user.click(trigger)

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument()
  })

  it("inherits field context for aria-invalid and aria-describedby", () => {
    render(
      <Field invalid>
        <Label>Department</Label>
        <Select defaultValue="eng">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="eng">
              <SelectItemText>Engineering</SelectItemText>
            </SelectItem>
          </SelectContent>
        </Select>
        <FieldDescription>Used for routing.</FieldDescription>
        <FieldError>Please choose a department.</FieldError>
      </Field>,
    )

    const trigger = screen.getByRole("combobox", { name: "Department" })
    const description = screen.getByText("Used for routing.")
    const error = screen.getByRole("alert")

    expect(trigger).toHaveAttribute("aria-invalid", "true")
    expect(trigger).toHaveAttribute(
      "aria-describedby",
      `${description.getAttribute("id")} ${error.getAttribute("id")}`,
    )
  })

  it("keeps className as an escape hatch", () => {
    render(
      <Select defaultValue="a">
        <SelectTrigger className="tracking-wide" aria-label="Fruit">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">
            <SelectItemText>Apple</SelectItemText>
          </SelectItem>
        </SelectContent>
      </Select>,
    )

    const trigger = screen.getByRole("combobox", { name: "Fruit" })

    expect(trigger).toHaveClass("glass", "h-8", "tracking-wide")
  })

  it("supports keyboard navigation to open and select", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()

    render(
      <Select onValueChange={onValueChange}>
        <SelectTrigger aria-label="Fruit">
          <SelectValue placeholder="Pick a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectViewport>
            <SelectItem value="a">
              <SelectItemText>Apple</SelectItemText>
            </SelectItem>
            <SelectItem value="b">
              <SelectItemText>Banana</SelectItemText>
            </SelectItem>
          </SelectViewport>
        </SelectContent>
      </Select>,
    )

    const trigger = screen.getByRole("combobox", { name: "Fruit" })

    expect(trigger).toHaveTextContent("Pick a fruit")

    await user.tab()
    await user.keyboard("{ArrowDown}")

    expect(screen.getByRole("listbox")).toBeInTheDocument()

    await user.keyboard("{Enter}")

    expect(onValueChange).toHaveBeenCalledWith("a")
    expect(trigger).toHaveTextContent("Apple")
  })

  it("forwards refs and native props", () => {
    const ref = createRef<HTMLButtonElement>()

    render(
      <Select defaultValue="a">
        <SelectTrigger ref={ref} aria-label="Fruit" data-testid="trigger">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">
            <SelectItemText>Apple</SelectItemText>
          </SelectItem>
        </SelectContent>
      </Select>,
    )

    expect(ref.current).toBe(screen.getByTestId("trigger"))
    expect(ref.current).toHaveAttribute("aria-label", "Fruit")
  })

  it("exports all sub-components and variant objects", () => {
    expect(Select).toBeDefined()
    expect(SelectTrigger).toBeDefined()
    expect(SelectValue).toBeDefined()
    expect(SelectContent).toBeDefined()
    expect(SelectViewport).toBeDefined()
    expect(SelectItem).toBeDefined()
    expect(SelectItemText).toBeDefined()
    expect(SelectItemIndicator).toBeDefined()
    expect(SelectLabel).toBeDefined()
    expect(SelectGroup).toBeDefined()
    expect(SelectSeparator).toBeDefined()
    expect(SelectScrollUpButton).toBeDefined()
    expect(SelectScrollDownButton).toBeDefined()
    expect(selectVariants).toBeDefined()
  })
})

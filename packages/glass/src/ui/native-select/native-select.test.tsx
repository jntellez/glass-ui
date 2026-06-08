import { createRef } from "react"
import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { Field, FieldDescription, FieldError } from "../field"
import { Label } from "../label"
import { NativeGroup, NativeOption, NativeSelect } from "./index"

describe("NativeSelect", () => {
  it("renders an accessible select with default prop-first styles", () => {
    render(
      <NativeSelect aria-label="Timezone" defaultValue="utc">
        <option value="utc">UTC</option>
      </NativeSelect>,
    )

    const select = screen.getByRole("combobox", { name: "Timezone" })

    expect(select).toHaveClass("glass", "h-8", "appearance-none")
    expect(select.parentElement).toHaveClass("relative", "w-full", "min-w-0")
    expect(select.parentElement?.querySelector("svg")).toBeInTheDocument()
  })

  it("supports explicit variant and uiSize props while preserving native props", () => {
    render(
      <NativeSelect
        aria-label="Country"
        className="tracking-wide"
        defaultValue="mx"
        name="country"
        variant="soft"
        uiSize="lg"
      >
        <option value="mx">Mexico</option>
      </NativeSelect>,
    )

    const select = screen.getByRole("combobox", { name: "Country" })

    expect(select).toHaveClass("glass-soft", "h-10", "tracking-wide")
    expect(select).not.toHaveClass("h-8")
    expect(select).toHaveAttribute("name", "country")
  })

  it("keeps className as an escape hatch without parsing it for API decisions", () => {
    render(
      <NativeSelect
        aria-label="Plan"
        className="bg-black/20 ring-1 ring-white/20"
        defaultValue="starter"
      >
        <option value="starter">Starter</option>
      </NativeSelect>,
    )

    const select = screen.getByRole("combobox", { name: "Plan" })

    expect(select).toHaveClass("glass", "h-8", "bg-black/20", "ring-1", "ring-white/20")
  })

  it("preserves native listbox semantics when using size or multiple", () => {
    render(
      <NativeSelect aria-label="Assignees" defaultValue={["beatriz"]} multiple size={5} uiSize="lg">
        <option value="ana">Ana</option>
        <option value="beatriz">Beatriz</option>
        <option value="carlos">Carlos</option>
      </NativeSelect>,
    )

    const select = screen.getByRole("listbox", { name: "Assignees" })

    expect(select).toHaveAttribute("multiple")
    expect(select).toHaveAttribute("size", "5")
    expect(select).toHaveClass("min-h-24", "px-3.5", "py-2.5")
    expect(select).not.toHaveClass("appearance-none", "h-10")
    expect(select.parentElement?.querySelector("svg")).not.toBeInTheDocument()
  })

  it("forwards refs to the native select element", () => {
    const ref = createRef<HTMLSelectElement>()

    render(
      <NativeSelect ref={ref} aria-label="Language" defaultValue="en" autoComplete="language">
        <option value="en">English</option>
      </NativeSelect>,
    )

    expect(ref.current).toBe(screen.getByRole("combobox", { name: "Language" }))
    expect(ref.current).toHaveAttribute("autocomplete", "language")
  })

  it("renders companion group and option wrappers as native elements", () => {
    render(
      <NativeSelect aria-label="Timezone" defaultValue="mxc">
        <NativeOption value="utc">UTC</NativeOption>
        <NativeGroup label="North America" className="font-medium text-foreground">
          <NativeOption value="mxc" className="bg-background text-foreground">
            Mexico City
          </NativeOption>
        </NativeGroup>
      </NativeSelect>,
    )

    const group = screen.getByRole("group", { name: "North America" })
    const option = screen.getByRole("option", { name: "Mexico City" })

    expect(group.tagName).toBe("OPTGROUP")
    expect(group).toHaveClass("font-medium", "text-foreground")
    expect(option.tagName).toBe("OPTION")
    expect(option).toHaveClass("bg-background", "text-foreground")
    expect(screen.getByRole("combobox", { name: "Timezone" })).toHaveValue("mxc")
  })

  it("forwards refs to companion native wrappers", () => {
    const groupRef = createRef<HTMLOptGroupElement>()
    const optionRef = createRef<HTMLOptionElement>()

    render(
      <NativeSelect aria-label="Priority" defaultValue="high">
        <NativeGroup ref={groupRef} label="Open">
          <NativeOption ref={optionRef} value="high" disabled>
            High
          </NativeOption>
        </NativeGroup>
      </NativeSelect>,
    )

    expect(groupRef.current).toBe(screen.getByRole("group", { name: "Open" }))
    expect(optionRef.current).toBe(screen.getByRole("option", { name: "High" }))
    expect(optionRef.current).toHaveAttribute("disabled")
  })

  it("composes with field ids and invalid state through the native select element", () => {
    render(
      <Field invalid>
        <Label>Department</Label>
        <NativeSelect defaultValue="engineering">
          <NativeOption value="engineering">Engineering</NativeOption>
        </NativeSelect>
        <FieldDescription>Used for routing approvals.</FieldDescription>
        <FieldError>Please choose a department.</FieldError>
      </Field>,
    )

    const select = screen.getByRole("combobox", { name: "Department" })
    const description = screen.getByText("Used for routing approvals.")
    const error = screen.getByRole("alert")

    expect(select).toHaveAttribute("id")
    expect(select).toHaveAttribute(
      "aria-describedby",
      `${description.getAttribute("id")} ${error.getAttribute("id")}`,
    )
    expect(select).toHaveAttribute("aria-invalid", "true")
  })
})

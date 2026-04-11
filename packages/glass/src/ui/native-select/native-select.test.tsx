import { createRef } from "react"
import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { NativeGroup, NativeOption, NativeSelect } from "./index"

describe("NativeSelect", () => {
  it("renders an accessible select with the default glass styles", () => {
    render(
      <NativeSelect aria-label="Timezone" defaultValue="utc">
        <option value="utc">UTC</option>
      </NativeSelect>,
    )

    const select = screen.getByRole("combobox", { name: "Timezone" })

    expect(select).toHaveClass("input-md")
    expect(select.parentElement).toHaveClass("relative", "w-full", "min-w-0")
  })

  it("preserves explicit size classes and native props", () => {
    render(
      <NativeSelect
        aria-label="Country"
        className="input-lg tracking-wide"
        defaultValue="mx"
        name="country"
      >
        <option value="mx">Mexico</option>
      </NativeSelect>,
    )

    const select = screen.getByRole("combobox", { name: "Country" })

    expect(select).toHaveClass("input-lg", "tracking-wide")
    expect(select).not.toHaveClass("input-md")
    expect(select).toHaveAttribute("name", "country")
  })

  it("omits the default surface classes when a custom surface is provided", () => {
    render(
      <NativeSelect aria-label="Plan" className="glass bg-black/20" defaultValue="starter">
        <option value="starter">Starter</option>
      </NativeSelect>,
    )

    const select = screen.getByRole("combobox", { name: "Plan" })

    expect(select).toHaveClass("glass", "bg-black/20")
    expect(select).not.toHaveClass("bg-transparent", "border", "shadow-glass-sm")
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
})

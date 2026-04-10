import { createRef } from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { Checkbox } from "./index"

describe("Checkbox", () => {
  it("renders a native checkbox and toggles with pointer interaction", async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    render(<Checkbox aria-label="Email updates" onChange={onChange} />)

    const checkbox = screen.getByRole("checkbox", { name: "Email updates" })

    expect(checkbox).toHaveAttribute("type", "checkbox")
    expect(checkbox).toHaveClass(
      "border-glass-border",
      "shadow-glass-sm",
      "rounded-glass-sm",
      "bg-transparent",
    )
    expect(checkbox).toHaveStyle({ accentColor: "var(--accent)" })

    await user.click(checkbox)

    expect(checkbox).toBeChecked()
    expect(onChange).toHaveBeenCalledTimes(1)
  })

  it("toggles with keyboard interaction", async () => {
    const user = userEvent.setup()

    render(<Checkbox aria-label="Marketing emails" />)

    const checkbox = screen.getByRole("checkbox", { name: "Marketing emails" })

    await user.tab()
    await user.keyboard(" ")

    expect(checkbox).toBeChecked()
  })

  it("merges custom classes with the default control styles", () => {
    render(<Checkbox aria-label="Updates" className="glass bg-black/20" />)

    const checkbox = screen.getByRole("checkbox", { name: "Updates" })

    expect(checkbox).toHaveClass("glass", "bg-black/20")
    expect(checkbox).toHaveClass("border-glass-border", "shadow-glass-sm")
  })

  it("forwards refs and native props", () => {
    const ref = createRef<HTMLInputElement>()

    render(<Checkbox ref={ref} aria-label="Terms" defaultChecked data-state="ready" />)

    expect(ref.current).toBe(screen.getByRole("checkbox", { name: "Terms" }))
    expect(ref.current).toBeChecked()
    expect(ref.current).toHaveAttribute("data-state", "ready")
    expect(ref.current).toHaveStyle({ accentColor: "var(--accent)" })
  })
})

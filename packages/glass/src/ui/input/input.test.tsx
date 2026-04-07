import { createRef } from "react"
import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { Input } from "./index"

describe("Input", () => {
  it("renders an accessible text input with the default glass styles", () => {
    render(<Input aria-label="Email address" />)

    expect(screen.getByRole("textbox", { name: "Email address" })).toHaveClass("input-md")
  })

  it("forwards the type and preserves explicit size classes", () => {
    render(<Input aria-label="Work email" type="email" className="input-lg tracking-wide" />)

    const input = screen.getByRole("textbox", { name: "Work email" })

    expect(input).toHaveAttribute("type", "email")
    expect(input).toHaveClass("input-lg", "tracking-wide")
    expect(input).not.toHaveClass("input-md")
  })

  it("omits the default surface classes when a custom surface is provided", () => {
    render(<Input aria-label="Email address" className="glass bg-black/20" />)

    const input = screen.getByRole("textbox", { name: "Email address" })

    expect(input).toHaveClass("glass", "bg-black/20")
    expect(input).not.toHaveClass("bg-transparent", "border", "shadow-glass-sm")
  })

  it("forwards refs and native props", () => {
    const ref = createRef<HTMLInputElement>()

    render(<Input ref={ref} aria-label="Username" type="text" autoComplete="username" />)

    expect(ref.current).toBe(screen.getByRole("textbox", { name: "Username" }))
    expect(ref.current).toHaveAttribute("type", "text")
    expect(ref.current).toHaveAttribute("autocomplete", "username")
  })
})

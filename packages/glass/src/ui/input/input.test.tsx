import { createRef } from "react"
import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { Input } from "./index"

describe("Input", () => {
  it("renders an accessible text input with the default variant and medium size", () => {
    render(<Input aria-label="Email address" />)

    expect(screen.getByRole("textbox", { name: "Email address" })).toHaveClass(
      "bg-transparent",
      "border",
      "border-glass-border",
      "shadow-glass-sm",
      "h-8",
      "px-2.5",
      "text-sm",
      "leading-5",
    )
  })

  it("applies explicit variant and size props", () => {
    render(
      <>
        <Input aria-label="Small soft email" type="email" variant="soft" size="sm" />
        <Input aria-label="Large strong email" type="email" variant="strong" size="lg" />
      </>,
    )

    expect(screen.getByRole("textbox", { name: "Small soft email" })).toHaveClass(
      "glass",
      "glass-soft",
      "h-6",
      "px-2",
      "text-xs",
      "leading-4",
    )
    expect(screen.getByRole("textbox", { name: "Large strong email" })).toHaveClass(
      "glass",
      "glass-strong",
      "h-10",
      "px-3.5",
      "text-base",
      "leading-6",
    )
  })

  it("forwards the type and keeps className as an escape hatch", () => {
    render(
      <Input
        aria-label="Work email"
        type="email"
        size="lg"
        className="tracking-wide rounded-full"
      />,
    )

    const input = screen.getByRole("textbox", { name: "Work email" })

    expect(input).toHaveAttribute("type", "email")
    expect(input).toHaveClass("h-10", "px-3.5", "tracking-wide", "rounded-full")
  })

  it("forwards refs and native props", () => {
    const ref = createRef<HTMLInputElement>()

    render(<Input ref={ref} aria-label="Username" type="text" autoComplete="username" />)

    expect(ref.current).toBe(screen.getByRole("textbox", { name: "Username" }))
    expect(ref.current).toHaveAttribute("type", "text")
    expect(ref.current).toHaveAttribute("autocomplete", "username")
  })
})

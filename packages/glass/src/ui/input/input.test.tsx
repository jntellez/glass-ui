import { createRef } from "react"
import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { Field, FieldDescription, FieldError } from "../field"
import { Label } from "../label"
import { Input } from "./index"

describe("Input", () => {
  it("renders an accessible text input with the default variant and medium size", () => {
    render(<Input aria-label="Email address" />)

    expect(screen.getByRole("textbox", { name: "Email address" })).toHaveClass(
      "glass",
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
        <Input aria-label="Transparent work email" type="email" variant="transparent" />
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
    expect(screen.getByRole("textbox", { name: "Transparent work email" })).toHaveClass(
      "glass-outline",
      "h-8",
      "px-2.5",
      "text-sm",
      "leading-5",
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

  it("ties destructive border and ring styling to aria-invalid", () => {
    render(<Input aria-label="Invalid email" aria-invalid="true" variant="soft" />)

    expect(screen.getByRole("textbox", { name: "Invalid email" })).toHaveClass(
      "aria-[invalid=true]:border-destructive/50",
      "dark:aria-[invalid=true]:border-destructive/80",
      "aria-[invalid=true]:focus-visible:ring-destructive/50",
    )
  })

  it("forwards refs and native props", () => {
    const ref = createRef<HTMLInputElement>()

    render(<Input ref={ref} aria-label="Username" type="text" autoComplete="username" />)

    expect(ref.current).toBe(screen.getByRole("textbox", { name: "Username" }))
    expect(ref.current).toHaveAttribute("type", "text")
    expect(ref.current).toHaveAttribute("autocomplete", "username")
  })

  it("opts into field ids and descriptions when composed inside Field", () => {
    render(
      <Field invalid>
        <Label>Email</Label>
        <Input type="email" />
        <FieldDescription>Used for notifications.</FieldDescription>
        <FieldError>Please enter a valid email address.</FieldError>
      </Field>,
    )

    const input = screen.getByRole("textbox", { name: "Email" })
    const description = screen.getByText("Used for notifications.")
    const error = screen.getByRole("alert")

    expect(input).toHaveAttribute("id")
    expect(input).toHaveAttribute(
      "aria-describedby",
      `${description.getAttribute("id")} ${error.getAttribute("id")}`,
    )
    expect(input).toHaveAttribute("aria-invalid", "true")
  })

  it("keeps explicit id, aria-describedby, and aria-invalid over field defaults", () => {
    render(
      <Field invalid>
        <Label>Email</Label>
        <Input id="work-email" aria-describedby="custom-help" aria-invalid={false} />
        <FieldDescription>Used for notifications.</FieldDescription>
      </Field>,
    )

    const input = screen.getByRole("textbox", { name: "Email" })
    const description = screen.getByText("Used for notifications.")

    expect(input).toHaveAttribute("id", "work-email")
    expect(input).toHaveAttribute(
      "aria-describedby",
      `custom-help ${description.getAttribute("id")}`,
    )
    expect(input).toHaveAttribute("aria-invalid", "false")
  })
})

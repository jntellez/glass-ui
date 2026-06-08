import { createRef } from "react"
import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { Checkbox } from "../checkbox"
import { Input } from "../input"
import { Label } from "../label"
import { Field, FieldDescription, FieldError } from "./index"

describe("Field", () => {
  it("renders a lightweight wrapper without forcing layout", () => {
    render(
      <Field data-testid="field">
        <span>Content</span>
      </Field>,
    )

    expect(screen.getByTestId("field").className).toBe("")
  })

  it("forwards refs and merges class names", () => {
    const ref = createRef<HTMLDivElement>()

    render(
      <Field ref={ref} className="max-w-sm" data-testid="field">
        <span>Content</span>
      </Field>,
    )

    expect(ref.current).toBe(screen.getByTestId("field"))
    expect(ref.current).toHaveClass("max-w-sm")
  })

  it("links labels, descriptions, and errors to the field control automatically", () => {
    render(
      <Field invalid>
        <Label>Email</Label>
        <Input type="email" />
        <FieldDescription>We only use this for updates.</FieldDescription>
        <FieldError>Please enter a valid email address.</FieldError>
      </Field>,
    )

    const input = screen.getByRole("textbox", { name: "Email" })
    const description = screen.getByText("We only use this for updates.")
    const error = screen.getByRole("alert")

    expect(input).toHaveAttribute("id")
    expect(screen.getByText("Email")).toHaveAttribute("for", input.getAttribute("id"))
    expect(description).toHaveAttribute("id")
    expect(error).toHaveAttribute("id")
    expect(input).toHaveAttribute(
      "aria-describedby",
      `${description.getAttribute("id")} ${error.getAttribute("id")}`,
    )
    expect(input).toHaveAttribute("aria-invalid", "true")
  })

  it("supports checkbox rows without requiring explicit control ids", () => {
    render(
      <Field className="flex items-start gap-3">
        <Checkbox />
        <div className="space-y-1.5">
          <Label>Enable notifications</Label>
          <FieldDescription>We only send important updates.</FieldDescription>
        </div>
      </Field>,
    )

    const checkbox = screen.getByRole("checkbox", { name: "Enable notifications" })

    expect(checkbox).toHaveAttribute("id")
    expect(screen.getByText("Enable notifications")).toHaveAttribute(
      "for",
      checkbox.getAttribute("id"),
    )
    expect(checkbox).toHaveAttribute("aria-describedby")
  })
})

describe("FieldDescription", () => {
  it("renders helper text with the muted treatment", () => {
    render(<FieldDescription>Use your full legal name.</FieldDescription>)

    expect(screen.getByText("Use your full legal name.")).toHaveClass(
      "text-xs",
      "text-muted-foreground",
    )
  })

  it("forwards refs and native props", () => {
    const ref = createRef<HTMLParagraphElement>()

    render(
      <FieldDescription ref={ref} id="field-help" data-testid="field-description">
        Keep it short.
      </FieldDescription>,
    )

    expect(ref.current).toBe(screen.getByTestId("field-description"))
    expect(ref.current).toHaveAttribute("id", "field-help")
  })
})

describe("FieldError", () => {
  it("renders an alert-style error message", () => {
    render(<FieldError>That email is invalid.</FieldError>)

    expect(screen.getByRole("alert")).toHaveClass("text-xs", "text-destructive")
  })

  it("forwards refs and allows role overrides", () => {
    const ref = createRef<HTMLParagraphElement>()

    render(
      <FieldError ref={ref} role="status" data-testid="field-error">
        Try again.
      </FieldError>,
    )

    expect(ref.current).toBe(screen.getByTestId("field-error"))
    expect(ref.current).toHaveAttribute("role", "status")
  })
})

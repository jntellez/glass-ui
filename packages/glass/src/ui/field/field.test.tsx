import { createRef } from "react"
import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { Field, FieldDescription, FieldError } from "./index"

describe("Field", () => {
  it("renders a structural wrapper with spacing", () => {
    render(
      <Field data-testid="field">
        <span>Content</span>
      </Field>,
    )

    expect(screen.getByTestId("field")).toHaveClass("space-y-1.5")
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

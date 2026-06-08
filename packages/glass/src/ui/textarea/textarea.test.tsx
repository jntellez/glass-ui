import { createRef } from "react"
import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { Field, FieldDescription } from "../field"
import { Label } from "../label"
import { Textarea } from "./index"

describe("Textarea", () => {
  it("renders an accessible multiline field with the default variant and medium size", () => {
    render(<Textarea aria-label="Notes" />)

    expect(screen.getByRole("textbox", { name: "Notes" })).toHaveClass(
      "glass",
      "resize-y",
      "min-h-20",
      "px-2.5",
      "text-sm",
      "leading-5",
    )
  })

  it("applies explicit variant and size props", () => {
    render(
      <>
        <Textarea aria-label="Small soft notes" variant="soft" size="sm" />
        <Textarea aria-label="Large strong notes" variant="strong" size="lg" />
        <Textarea aria-label="Transparent notes" variant="transparent" />
      </>,
    )

    expect(screen.getByRole("textbox", { name: "Small soft notes" })).toHaveClass(
      "glass",
      "glass-soft",
      "min-h-16",
      "px-2",
      "text-xs",
      "leading-4",
    )
    expect(screen.getByRole("textbox", { name: "Large strong notes" })).toHaveClass(
      "glass",
      "glass-strong",
      "min-h-24",
      "px-3.5",
      "text-base",
      "leading-6",
    )
    expect(screen.getByRole("textbox", { name: "Transparent notes" })).toHaveClass(
      "glass-outline",
      "min-h-20",
      "px-2.5",
      "text-sm",
      "leading-5",
    )
  })

  it("ties destructive border and ring styling to aria-invalid", () => {
    render(<Textarea aria-label="Invalid notes" aria-invalid="true" variant="soft" />)

    expect(screen.getByRole("textbox", { name: "Invalid notes" })).toHaveClass(
      "aria-[invalid=true]:border-destructive/50",
      "dark:aria-[invalid=true]:border-destructive/80",
      "aria-[invalid=true]:focus-visible:ring-destructive/50",
    )
  })

  it("keeps className as an escape hatch", () => {
    render(<Textarea aria-label="Feedback" size="lg" className="rounded-3xl tracking-wide" />)

    expect(screen.getByRole("textbox", { name: "Feedback" })).toHaveClass(
      "min-h-24",
      "px-3.5",
      "rounded-3xl",
      "tracking-wide",
    )
  })

  it("forwards refs and native props", () => {
    const ref = createRef<HTMLTextAreaElement>()

    render(<Textarea ref={ref} aria-label="Notes" rows={4} placeholder="Add details" />)

    expect(ref.current).toBe(screen.getByRole("textbox", { name: "Notes" }))
    expect(ref.current).toHaveAttribute("rows", "4")
    expect(ref.current).toHaveAttribute("placeholder", "Add details")
  })

  it("composes with field metadata when used inside Field", () => {
    render(
      <Field>
        <Label>Notes</Label>
        <Textarea rows={4} />
        <FieldDescription>Share what changed.</FieldDescription>
      </Field>,
    )

    const textarea = screen.getByRole("textbox", { name: "Notes" })
    const description = screen.getByText("Share what changed.")

    expect(textarea).toHaveAttribute("id")
    expect(textarea).toHaveAttribute("aria-describedby", description.getAttribute("id") ?? "")
  })
})

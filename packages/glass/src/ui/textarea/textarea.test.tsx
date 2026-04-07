import { createRef } from "react"
import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { Textarea } from "./index"

describe("Textarea", () => {
  it("renders an accessible multiline field with the default glass styles", () => {
    render(<Textarea aria-label="Notes" />)

    expect(screen.getByRole("textbox", { name: "Notes" })).toHaveClass(
      "resize-y",
      "shadow-glass-sm",
    )
  })

  it("merges custom class names", () => {
    render(<Textarea aria-label="Feedback" className="min-h-32 bg-black/20" />)

    expect(screen.getByRole("textbox", { name: "Feedback" })).toHaveClass("min-h-32", "bg-black/20")
  })

  it("forwards refs and native props", () => {
    const ref = createRef<HTMLTextAreaElement>()

    render(<Textarea ref={ref} aria-label="Notes" rows={4} placeholder="Add details" />)

    expect(ref.current).toBe(screen.getByRole("textbox", { name: "Notes" }))
    expect(ref.current).toHaveAttribute("rows", "4")
    expect(ref.current).toHaveAttribute("placeholder", "Add details")
  })
})

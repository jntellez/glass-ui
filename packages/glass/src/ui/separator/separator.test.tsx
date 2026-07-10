import { createRef } from "react"
import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { Separator, separatorVariants } from "./index"

describe("Separator", () => {
  it("renders a semantic horizontal separator by default", () => {
    render(<Separator data-testid="separator" />)

    const separator = screen.getByRole("separator")

    expect(separator).toBe(screen.getByTestId("separator"))
    expect(separator).toHaveAttribute("data-orientation", "horizontal")
    expect(separator.className).toContain("data-[orientation=horizontal]:h-px")
    expect(separator.className).toContain("data-[orientation=horizontal]:w-full")
  })

  it("supports vertical orientation", () => {
    render(
      <div className="flex h-16">
        <Separator orientation="vertical" data-testid="separator" />
      </div>,
    )

    const separator = screen.getByRole("separator")

    expect(separator).toHaveAttribute("data-orientation", "vertical")
    expect(separator.className).toContain("data-[orientation=vertical]:w-px")
    expect(separator.className).toContain("data-[orientation=vertical]:h-full")
  })

  it("supports decorative usage", () => {
    render(<Separator decorative data-testid="separator" />)

    expect(screen.queryByRole("separator")).not.toBeInTheDocument()
    expect(screen.getByTestId("separator")).toHaveAttribute("data-orientation", "horizontal")
  })

  it("applies inset spacing, className, and forwards refs", () => {
    const ref = createRef<HTMLDivElement>()

    render(<Separator ref={ref} inset className="opacity-80" data-testid="separator" />)

    const separator = screen.getByTestId("separator")

    expect(separatorVariants()).toContain("bg-glass-border/80")
    expect(separator).toHaveClass("opacity-80")
    expect(separator.className).toContain("w-[calc(100%-1rem)]")
    expect(ref.current).toBe(separator)
  })
})

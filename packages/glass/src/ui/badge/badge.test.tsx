import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { Badge } from "./index"

describe("Badge", () => {
  it("renders badge content with the default prop-first treatment", () => {
    render(<Badge>New</Badge>)

    expect(screen.getByText("New")).toHaveClass("glass", "rounded-full", "text-xs")
  })

  it("supports explicit variant and size props", () => {
    render(
      <Badge variant="strong" size="lg">
        Status
      </Badge>,
    )

    expect(screen.getByText("Status")).toHaveClass("glass-strong", "text-sm", "px-3")
  })

  it("merges custom class names", () => {
    render(<Badge className="bg-black/20 uppercase">Beta</Badge>)

    expect(screen.getByText("Beta")).toHaveClass("bg-black/20", "uppercase")
  })
})

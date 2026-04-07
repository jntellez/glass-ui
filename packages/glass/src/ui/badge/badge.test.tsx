import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { Badge } from "./index"

describe("Badge", () => {
  it("renders badge content with the default glass treatment", () => {
    render(<Badge>New</Badge>)

    expect(screen.getByText("New")).toHaveClass("rounded-full", "text-xs", "shadow-glass-md")
  })

  it("merges custom class names", () => {
    render(<Badge className="bg-black/20 uppercase">Beta</Badge>)

    expect(screen.getByText("Beta")).toHaveClass("bg-black/20", "uppercase")
  })
})

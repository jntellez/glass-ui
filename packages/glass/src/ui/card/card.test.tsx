import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { Card } from "./index"

describe("Card", () => {
  it("renders its content inside the default glass surface", () => {
    render(<Card>Account summary</Card>)

    expect(screen.getByText("Account summary")).toHaveClass(
      "glass",
      "rounded-glass-sm",
      "text-foreground",
      "p-6",
    )
  })

  it("merges custom class names", () => {
    render(<Card className="border-0 shadow-none">Summary</Card>)

    expect(screen.getByText("Summary")).toHaveClass("border-0", "shadow-none")
  })
})

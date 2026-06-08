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

  it("supports variant and padding props", () => {
    render(
      <Card variant="soft" padding="sm">
        Billing details
      </Card>,
    )

    expect(screen.getByText("Billing details")).toHaveClass("glass-soft", "p-4")
  })

  it("supports asChild composition", () => {
    render(
      <Card asChild variant="strong">
        <a href="/projects/glass-ui">Open project</a>
      </Card>,
    )

    expect(screen.getByRole("link", { name: "Open project" })).toHaveClass("glass-strong")
  })

  it("merges custom class names", () => {
    render(<Card className="border-0 shadow-none">Summary</Card>)

    expect(screen.getByText("Summary")).toHaveClass("border-0", "shadow-none")
  })
})

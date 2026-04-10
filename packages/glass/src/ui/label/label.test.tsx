import { createRef } from "react"
import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { Label } from "./index"

describe("Label", () => {
  it("renders a native label with the default text treatment", () => {
    render(<Label htmlFor="email">Email address</Label>)

    expect(screen.getByText("Email address")).toHaveClass(
      "inline-flex",
      "text-sm",
      "font-medium",
      "text-foreground",
      "select-none",
    )
    expect(screen.getByText("Email address")).toHaveAttribute("for", "email")
  })

  it("forwards refs and native props", () => {
    const ref = createRef<HTMLLabelElement>()

    render(
      <Label ref={ref} htmlFor="username" title="User name">
        Username
      </Label>,
    )

    expect(ref.current).toBe(screen.getByText("Username"))
    expect(ref.current).toHaveAttribute("for", "username")
    expect(ref.current).toHaveAttribute("title", "User name")
  })

  it("merges custom class names", () => {
    render(<Label className="uppercase tracking-wider">Role</Label>)

    expect(screen.getByText("Role")).toHaveClass("uppercase", "tracking-wider")
  })
})

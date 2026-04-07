import { createRef } from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { Button } from "./index"

describe("Button", () => {
  it("renders an accessible button with its label", () => {
    render(<Button>Save</Button>)

    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument()
  })

  it("applies the default medium size class when no size override is provided", () => {
    render(<Button>Continue</Button>)

    expect(screen.getByRole("button", { name: "Continue" })).toHaveClass("btn-md")
  })

  it("preserves explicit size classes and custom class names", () => {
    render(<Button className="btn-lg tracking-wide">Continue</Button>)

    expect(screen.getByRole("button", { name: "Continue" })).toHaveClass("btn-lg", "tracking-wide")
    expect(screen.getByRole("button", { name: "Continue" })).not.toHaveClass("btn-md")
  })

  it("omits the default border and shadow when a custom surface is provided", () => {
    render(<Button className="glass bg-black/20">Continue</Button>)

    const button = screen.getByRole("button", { name: "Continue" })

    expect(button).toHaveClass("glass", "bg-black/20")
    expect(button).not.toHaveClass("border", "shadow-glass-sm")
  })

  it("calls onClick when pressed", async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()

    render(<Button onClick={onClick}>Save</Button>)

    await user.click(screen.getByRole("button", { name: "Save" }))

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it("does not invoke onClick when disabled", async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()

    render(
      <Button disabled onClick={onClick}>
        Save
      </Button>,
    )

    await user.click(screen.getByRole("button", { name: "Save" }))

    expect(onClick).not.toHaveBeenCalled()
  })

  it("forwards refs and native props", () => {
    const ref = createRef<HTMLButtonElement>()

    render(
      <Button ref={ref} type="submit" aria-label="Send form" data-state="ready">
        Send
      </Button>,
    )

    expect(ref.current).toBe(screen.getByRole("button", { name: "Send form" }))
    expect(ref.current).toHaveAttribute("type", "submit")
    expect(ref.current).toHaveAttribute("data-state", "ready")
  })
})

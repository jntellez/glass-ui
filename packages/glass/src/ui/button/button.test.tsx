import { createElement, createRef, type ElementType } from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { Button } from "./index"

describe("Button", () => {
  it("renders a native button by default and keeps keyboard activation semantics", async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()

    render(<Button onClick={onClick}>Save</Button>)

    const button = screen.getByRole("button", { name: "Save" })

    expect(button.tagName).toBe("BUTTON")

    await user.tab()
    await user.keyboard("{Enter}")
    await user.keyboard(" ")

    expect(onClick).toHaveBeenCalledTimes(2)
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

  it("renders an anchor when `as` is set and preserves shared styling inputs", () => {
    render(
      <>
        <Button className="glass btn-lg">Action</Button>
        <Button as="a" href="/docs" className="glass btn-lg">
          Docs
        </Button>
      </>,
    )

    const button = screen.getByRole("button", { name: "Action" })
    const link = screen.getByRole("link", { name: "Docs" })

    expect(link.tagName).toBe("A")
    expect(link).toHaveAttribute("href", "/docs")
    expect(link.className).toBe(button.className)
    expect(screen.queryByRole("button", { name: "Docs" })).not.toBeInTheDocument()
  })

  it('does not expose link semantics when `as="a"` is used without an href', () => {
    render(<Button as="a">Docs</Button>)

    const anchor = screen.getByText("Docs")

    expect(anchor.tagName).toBe("A")
    expect(anchor).not.toHaveAttribute("href")
    expect(screen.queryByRole("link", { name: "Docs" })).not.toBeInTheDocument()
  })

  it("ignores deprecated `asChild` usage and keeps the default button element", () => {
    render(createElement(Button as ElementType, { asChild: true }, <a href="/docs">Docs</a>))

    const button = screen.getByRole("button", { name: "Docs" })
    const link = screen.getByRole("link", { name: "Docs" })

    expect(button.tagName).toBe("BUTTON")
    expect(button).toContainElement(link)
  })

  it("forwards refs to anchor targets when `as` is used", () => {
    const ref = createRef<HTMLAnchorElement>()

    render(
      <Button ref={ref} as="a" href="/docs" aria-label="Docs link">
        Docs
      </Button>,
    )

    expect(ref.current).toBe(screen.getByRole("link", { name: "Docs link" }))
    expect(ref.current).toHaveAttribute("href", "/docs")
  })
})

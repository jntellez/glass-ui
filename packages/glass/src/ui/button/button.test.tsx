import { createRef } from "react"
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

  it("uses the default variant and medium size when no overrides are provided", () => {
    render(<Button>Continue</Button>)

    expect(screen.getByRole("button", { name: "Continue" })).toHaveClass(
      "glass",
      "h-8",
      "px-2.5",
      "text-sm",
      "leading-5",
      "gap-2",
    )
  })

  it("applies explicit variant and size props", () => {
    render(
      <>
        <Button variant="soft" size="sm">
          Soft
        </Button>
        <Button variant="strong" size="lg">
          Strong
        </Button>
        <Button size="icon-sm" aria-label="Small map pin">
          <span aria-hidden="true">•</span>
        </Button>
        <Button size="icon" aria-label="Map pin">
          <span aria-hidden="true">•</span>
        </Button>
        <Button size="icon-lg" aria-label="Large map pin">
          <span aria-hidden="true">•</span>
        </Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="transparent">Transparent</Button>
      </>,
    )

    expect(screen.getByRole("button", { name: "Soft" })).toHaveClass(
      "glass",
      "glass-soft",
      "h-6",
      "px-2",
      "text-xs",
      "leading-4",
      "gap-1.5",
    )
    expect(screen.getByRole("button", { name: "Strong" })).toHaveClass(
      "glass",
      "glass-strong",
      "h-10",
      "px-3.5",
      "text-base",
      "leading-6",
      "gap-2.5",
    )
    expect(screen.getByRole("button", { name: "Small map pin" })).toHaveClass(
      "size-6",
      "p-0",
      "shrink-0",
      "[&_svg]:size-3",
    )
    expect(screen.getByRole("button", { name: "Map pin" })).toHaveClass(
      "size-8",
      "p-0",
      "shrink-0",
      "[&_svg]:size-4",
    )
    expect(screen.getByRole("button", { name: "Large map pin" })).toHaveClass(
      "size-10",
      "p-0",
      "shrink-0",
      "[&_svg]:size-5",
    )
    expect(screen.getByRole("button", { name: "Ghost" })).toHaveClass(
      "h-8",
      "px-2.5",
      "text-sm",
      "leading-5",
      "gap-2",
      "bg-transparent",
    )
    expect(screen.getByRole("button", { name: "Ghost" })).not.toHaveClass("glass")
    expect(screen.getByRole("button", { name: "Transparent" })).toHaveClass(
      "h-8",
      "px-2.5",
      "text-sm",
      "leading-5",
      "gap-2",
      "glass-outline",
    )
    expect(screen.getByRole("button", { name: "Transparent" })).not.toHaveClass("glass")
  })

  it("keeps className as an escape hatch", () => {
    render(
      <Button variant="strong" size="icon-lg" className="tracking-wide rounded-full">
        Continue
      </Button>,
    )

    const button = screen.getByRole("button", { name: "Continue" })

    expect(button).toHaveClass(
      "glass",
      "glass-strong",
      "size-10",
      "p-0",
      "tracking-wide",
      "rounded-full",
    )
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

  it("renders the child element when `asChild` is set", () => {
    render(
      <Button asChild variant="strong" size="lg">
        <a href="/docs">Docs</a>
      </Button>,
    )

    const link = screen.getByRole("link", { name: "Docs" })

    expect(link.tagName).toBe("A")
    expect(link).toHaveAttribute("href", "/docs")
    expect(screen.queryByRole("button", { name: "Docs" })).not.toBeInTheDocument()
    expect(link).toHaveClass("glass", "glass-strong", "h-10", "px-3.5", "text-base", "leading-6")
  })

  it("forwards refs to slotted targets when `asChild` is used", () => {
    const ref = createRef<HTMLElement>()

    render(
      <Button ref={ref} asChild aria-label="Docs link">
        <a href="/docs">Docs</a>
      </Button>,
    )

    expect(ref.current).toBe(screen.getByRole("link", { name: "Docs link" }))
    expect(ref.current).toHaveAttribute("href", "/docs")
  })

  it("exposes disabled state to slotted elements", () => {
    render(
      <Button asChild disabled>
        <a href="/docs">Docs</a>
      </Button>,
    )

    expect(screen.getByRole("link", { name: "Docs" })).toHaveAttribute("aria-disabled", "true")
    expect(screen.getByRole("link", { name: "Docs" })).toHaveAttribute("data-disabled")
  })

  it("prevents interaction for disabled slotted anchors", async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()

    render(
      <Button asChild disabled onClick={onClick}>
        <a href="/docs">Docs</a>
      </Button>,
    )

    const link = screen.getByRole("link", { name: "Docs" })

    await user.click(link)

    expect(onClick).not.toHaveBeenCalled()
    expect(link).toHaveAttribute("href", "/docs")
    expect(link).toHaveAttribute("aria-disabled", "true")
    expect(link).toHaveAttribute("data-disabled")
    expect(link).toHaveAttribute("tabindex", "-1")
  })
})

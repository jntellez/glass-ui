import { act, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import CommandTabs from "./CommandTabs"

describe("CommandTabs", () => {
  beforeEach(() => {
    localStorage.clear()
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: vi.fn(),
      },
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("uses the saved package manager when it is available", () => {
    localStorage.setItem("glass-ui-settings", JSON.stringify({ packageManager: "pnpm" }))

    render(<CommandTabs npm="npm add glass" pnpm="pnpm add glass" yarn="yarn add glass" />)

    expect(screen.getByText("pnpm add glass")).toBeInTheDocument()
  })

  it("updates the active command and persists the new package manager", async () => {
    const user = userEvent.setup()

    render(<CommandTabs npm="npm add glass" pnpm="pnpm add glass" bun="bun add glass" />)

    await user.click(screen.getByRole("button", { name: "bun" }))

    expect(screen.getByText("bun add glass")).toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem("glass-ui-settings") || "{}")).toEqual({
      packageManager: "bun",
    })
  })

  it("responds to package manager change events from elsewhere", () => {
    render(<CommandTabs npm="npm add glass" pnpm="pnpm add glass" bun="bun add glass" />)

    act(() => {
      window.dispatchEvent(new CustomEvent("pm-change", { detail: "pnpm" }))
    })

    expect(screen.getByText("pnpm add glass")).toBeInTheDocument()
  })
})

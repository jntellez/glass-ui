import { fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { afterEach, describe, expect, it, vi } from "vitest"
import DocsCommand, { isEditableTarget } from "./DocsCommand"

describe("DocsCommand", () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("opens from the trigger and navigates with filtered command results", async () => {
    const user = userEvent.setup()
    const handleNavigate = vi.fn()

    render(<DocsCommand onNavigate={handleNavigate} />)

    await user.click(screen.getByRole("button", { name: "Open documentation search" }))
    expect(screen.getByRole("dialog", { name: "Documentation search" })).toBeVisible()

    await user.type(screen.getByPlaceholderText("Search docs and components..."), "command")
    await user.keyboard("{ArrowDown}{Enter}")

    expect(handleNavigate).toHaveBeenCalledWith("/docs/components/command")
  })

  it("opens with the keyboard shortcut outside editable targets", async () => {
    render(<DocsCommand />)

    fireEvent.keyDown(window, { key: "k", metaKey: true })

    expect(screen.getByPlaceholderText("Search docs and components...")).toBeVisible()
  })

  it("ignores the keyboard shortcut inside editable targets", () => {
    const input = document.createElement("input")

    expect(isEditableTarget(input)).toBe(true)
    expect(isEditableTarget(document.createElement("div"))).toBe(false)
  })
})

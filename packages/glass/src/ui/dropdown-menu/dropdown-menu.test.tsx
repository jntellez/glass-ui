import { createRef, useState } from "react"
import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"
import { Button } from "../button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  dropdownMenuVariants,
} from "./index"

describe("DropdownMenu", () => {
  it("renders closed by default and toggles on click", async () => {
    const user = userEvent.setup()

    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Profile</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    )

    expect(screen.queryByRole("menu")).not.toBeInTheDocument()

    await user.click(screen.getByRole("button", { name: "Open menu" }))

    expect(screen.getByRole("menu")).toBeVisible()
    expect(screen.getByRole("menuitem", { name: "Profile" })).toBeVisible()
  })

  it("supports keyboard interaction and escape to close", async () => {
    const user = userEvent.setup()

    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Profile</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    )

    await user.tab()
    await user.keyboard("{Enter}")

    expect(screen.getByRole("menu")).toBeVisible()

    await user.keyboard("{Escape}")

    expect(screen.queryByRole("menu")).not.toBeInTheDocument()
  })

  it("supports trigger asChild composition", async () => {
    const user = userEvent.setup()

    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="strong">Actions</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Archive</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    )

    const trigger = screen.getByRole("button", { name: "Actions" })
    expect(trigger).toHaveClass("glass", "glass-strong")

    await user.click(trigger)

    expect(screen.getByRole("menuitem", { name: "Archive" })).toBeVisible()
  })

  it("supports checkbox and radio items in controlled mode", async () => {
    const user = userEvent.setup()

    function ControlledMenu() {
      const [bookmarked, setBookmarked] = useState(true)
      const [density, setDensity] = useState("comfortable")

      return (
        <>
          <p data-testid="bookmark-state">{bookmarked ? "bookmarked" : "not-bookmarked"}</p>
          <p data-testid="density-state">{density}</p>
          <DropdownMenu>
            <DropdownMenuTrigger>Preferences</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuCheckboxItem checked={bookmarked} onCheckedChange={setBookmarked}>
                Bookmarked
              </DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={density} onValueChange={setDensity}>
                <DropdownMenuRadioItem value="comfortable">Comfortable</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="compact">Compact</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )
    }

    render(<ControlledMenu />)

    await user.click(screen.getByRole("button", { name: "Preferences" }))

    const bookmarkItem = screen.getByRole("menuitemcheckbox", { name: "Bookmarked" })
    const compactItem = screen.getByRole("menuitemradio", { name: "Compact" })

    expect(bookmarkItem).toHaveAttribute("aria-checked", "true")
    expect(screen.getByRole("menuitemradio", { name: "Comfortable" })).toHaveAttribute(
      "aria-checked",
      "true",
    )

    await user.click(bookmarkItem)

    expect(screen.getByTestId("bookmark-state")).toHaveTextContent("not-bookmarked")

    await user.click(screen.getByRole("button", { name: "Preferences" }))
    await user.click(screen.getByRole("menuitemradio", { name: "Compact" }))

    expect(screen.getByTestId("density-state")).toHaveTextContent("compact")
  })

  it("renders submenu content, helpers, variants, and forwarded refs", async () => {
    const user = userEvent.setup()
    const ref = createRef<HTMLDivElement>()

    expect(dropdownMenuVariants({ variant: "default" })).toContain("glass")
    expect(dropdownMenuVariants({ variant: "soft" })).toContain("glass-soft")
    expect(dropdownMenuVariants({ variant: "strong" })).toContain("glass-strong")

    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Workspace</DropdownMenuTrigger>
        <DropdownMenuContent ref={ref} variant="strong" className="w-56" data-testid="menu-content">
          <DropdownMenuLabel>Project</DropdownMenuLabel>
          <DropdownMenuItem>
            Rename
            <DropdownMenuShortcut>⌘R</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Share</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Copy link</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>,
    )

    await user.click(screen.getByRole("button", { name: "Workspace" }))

    const menu = screen.getByRole("menu")
    expect(ref.current).toBe(screen.getByTestId("menu-content"))
    expect(screen.getByTestId("menu-content")).toHaveClass("glass", "glass-strong", "w-56")
    expect(within(menu).getByText("Project")).toBeVisible()
    expect(within(menu).getByText("⌘R")).toBeVisible()
    expect(screen.getByRole("menuitem", { name: "Share" })).toBeVisible()
  })
})

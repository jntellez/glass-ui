import { createRef } from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "./index"

describe("Command", () => {
  it("filters items from the input value", async () => {
    const user = userEvent.setup()

    render(
      <Command>
        <CommandInput placeholder="Search items" />
        <CommandList>
          <CommandEmpty>No results.</CommandEmpty>
          <CommandGroup heading="Pages">
            <CommandItem>Accordion</CommandItem>
            <CommandItem>Command</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>,
    )

    await user.type(screen.getByPlaceholderText("Search items"), "comm")

    expect(screen.getByText("Command")).toBeVisible()
    expect(screen.queryByText("Accordion")).not.toBeInTheDocument()
  })

  it("shows the empty state when nothing matches", async () => {
    const user = userEvent.setup()

    render(
      <Command>
        <CommandInput placeholder="Search items" />
        <CommandList>
          <CommandEmpty>No results.</CommandEmpty>
          <CommandGroup heading="Pages">
            <CommandItem>Accordion</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>,
    )

    await user.type(screen.getByPlaceholderText("Search items"), "missing")

    expect(screen.getByText("No results.")).toBeVisible()
  })

  it("supports keyboard selection", async () => {
    const user = userEvent.setup()
    const handleSelect = vi.fn()

    render(
      <Command>
        <CommandInput placeholder="Search items" />
        <CommandList>
          <CommandGroup heading="Pages">
            <CommandItem onSelect={handleSelect}>Accordion</CommandItem>
            <CommandItem>Badge</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>,
    )

    await user.click(screen.getByPlaceholderText("Search items"))
    await user.type(screen.getByPlaceholderText("Search items"), "acc")
    await user.keyboard("{ArrowDown}{Enter}")

    expect(handleSelect).toHaveBeenCalledWith("Accordion")
  })

  it("renders groups, separators, and shortcuts with glass classes", () => {
    render(
      <Command data-testid="command-root">
        <CommandInput placeholder="Search items" />
        <CommandList>
          <CommandGroup heading="Pages">
            <CommandItem>
              Command
              <CommandShortcut>⌘K</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator data-testid="separator" />
        </CommandList>
      </Command>,
    )

    expect(screen.getByTestId("command-root")).toHaveClass("glass", "glass-strong")
    expect(screen.getByText("Pages")).toBeVisible()
    expect(screen.getByText("⌘K")).toHaveClass("ml-auto")
    expect(screen.getByTestId("separator")).toHaveClass("bg-glass-border/80")
  })

  it("forwards refs to the input and item elements", () => {
    const inputRef = createRef<HTMLInputElement>()
    const itemRef = createRef<HTMLDivElement>()

    render(
      <Command>
        <CommandInput ref={inputRef} placeholder="Search items" />
        <CommandList>
          <CommandItem ref={itemRef}>Command</CommandItem>
        </CommandList>
      </Command>,
    )

    expect(inputRef.current).toBe(screen.getByPlaceholderText("Search items"))
    expect(itemRef.current).toBe(screen.getByText("Command"))
  })
})

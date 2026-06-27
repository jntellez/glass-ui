import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { ThemeSelector } from "./ThemeSelector"

describe("ThemeSelector", () => {
  it("renders the current preset name and swatches", () => {
    render(<ThemeSelector value="default" previewMode="light" onPresetChange={vi.fn()} />)

    expect(screen.getByRole("button", { name: /select theme/i })).toHaveTextContent("Default")
    expect(screen.getByRole("button", { name: "Select theme: Default" })).toBeInTheDocument()
  })

  it("announces the current preset name in the trigger aria-label", () => {
    render(<ThemeSelector value="clean-slate" previewMode="light" onPresetChange={vi.fn()} />)

    expect(screen.getByRole("button", { name: "Select theme: Clean Slate" })).toBeInTheDocument()
  })

  it("opens a popover with searchable presets when clicked", async () => {
    const user = userEvent.setup()

    render(<ThemeSelector value="default" previewMode="light" onPresetChange={vi.fn()} />)

    await user.click(screen.getByRole("button", { name: /select theme/i }))

    expect(screen.getByRole("dialog")).toBeInTheDocument()
    expect(screen.getByRole("searchbox", { name: /search themes/i })).toBeInTheDocument()
    const themes = screen.getByLabelText("Themes")
    expect(within(themes).getByRole("button", { name: /midnight bloom/i })).toBeInTheDocument()
    expect(within(themes).getByRole("button", { name: /cosmic night/i })).toBeInTheDocument()
  })

  it("filters presets by name", async () => {
    const user = userEvent.setup()

    render(<ThemeSelector value="default" previewMode="light" onPresetChange={vi.fn()} />)

    await user.click(screen.getByRole("button", { name: /select theme/i }))
    await user.type(screen.getByRole("searchbox", { name: /search themes/i }), "grove")

    const themes = screen.getByLabelText("Themes")
    expect(within(themes).getByRole("button", { name: /kodama grove/i })).toBeInTheDocument()
    expect(within(themes).queryByRole("button", { name: /graphite/i })).not.toBeInTheDocument()
  })

  it("calls onPresetChange when a preset is selected and closes the popover", async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()

    render(<ThemeSelector value="default" previewMode="light" onPresetChange={handleChange} />)

    await user.click(screen.getByRole("button", { name: /select theme/i }))
    await user.click(
      within(screen.getByLabelText("Themes")).getByRole("button", { name: /midnight bloom/i }),
    )

    expect(handleChange).toHaveBeenCalledWith("midnight-bloom")
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
  })

  it("marks the active preset as selected in the list", async () => {
    const user = userEvent.setup()

    render(<ThemeSelector value="graphite" previewMode="light" onPresetChange={vi.fn()} />)

    await user.click(screen.getByRole("button", { name: /select theme/i }))

    const graphiteOption = within(screen.getByLabelText("Themes")).getByRole("button", {
      name: /graphite/i,
    })
    expect(graphiteOption).toHaveAttribute("aria-pressed", "true")
  })

  it("resolves swatches from preset values for the current mode", async () => {
    const user = userEvent.setup()

    render(<ThemeSelector value="candyland" previewMode="dark" onPresetChange={vi.fn()} />)

    await user.click(screen.getByRole("button", { name: /select theme/i }))

    const options = within(screen.getByLabelText("Themes")).getAllByRole("button")
    expect(options).toHaveLength(8)

    const candylandOption = within(screen.getByLabelText("Themes")).getByRole("button", {
      name: /candyland/i,
    })
    const candylandSwatches = within(candylandOption).getAllByTestId("preset-swatch")

    expect(candylandSwatches[0]).toHaveStyle({ backgroundColor: "rgb(255, 228, 243)" })
    expect(candylandSwatches[1]).toHaveStyle({ backgroundColor: "rgb(103, 232, 249)" })
  })
})

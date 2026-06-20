import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { ThemeSelector } from "./ThemeSelector"
import { DEFAULT_DARK_TOKENS } from "./customization-tokens"

describe("ThemeSelector", () => {
  it("renders the current preset name and swatches", () => {
    render(<ThemeSelector value="default" onPresetChange={vi.fn()} />)

    expect(screen.getByRole("button", { name: /select theme/i })).toHaveTextContent("Default")
    expect(screen.getByRole("button", { name: "Select theme: Default" })).toBeInTheDocument()
  })

  it("announces the current preset name in the trigger aria-label", () => {
    render(<ThemeSelector value="soft" onPresetChange={vi.fn()} />)

    expect(screen.getByRole("button", { name: "Select theme: Soft" })).toBeInTheDocument()
  })

  it("opens a popover with searchable presets when clicked", async () => {
    const user = userEvent.setup()

    render(<ThemeSelector value="default" onPresetChange={vi.fn()} />)

    await user.click(screen.getByRole("button", { name: /select theme/i }))

    expect(screen.getByRole("dialog")).toBeInTheDocument()
    expect(screen.getByRole("searchbox", { name: /search themes/i })).toBeInTheDocument()
    const themes = screen.getByLabelText("Themes")
    expect(within(themes).getByRole("button", { name: /soft/i })).toBeInTheDocument()
    expect(within(themes).getByRole("button", { name: /strong/i })).toBeInTheDocument()
  })

  it("filters presets by name", async () => {
    const user = userEvent.setup()

    render(<ThemeSelector value="default" onPresetChange={vi.fn()} />)

    await user.click(screen.getByRole("button", { name: /select theme/i }))
    await user.type(screen.getByRole("searchbox", { name: /search themes/i }), "soft")

    const themes = screen.getByLabelText("Themes")
    expect(within(themes).getByRole("button", { name: /soft/i })).toBeInTheDocument()
    expect(within(themes).queryByRole("button", { name: /strong/i })).not.toBeInTheDocument()
  })

  it("calls onPresetChange when a preset is selected and closes the popover", async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()

    render(<ThemeSelector value="default" onPresetChange={handleChange} />)

    await user.click(screen.getByRole("button", { name: /select theme/i }))
    await user.click(
      within(screen.getByLabelText("Themes")).getByRole("button", { name: /strong/i }),
    )

    expect(handleChange).toHaveBeenCalledWith("strong")
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
  })

  it("marks the active preset as selected in the list", async () => {
    const user = userEvent.setup()

    render(<ThemeSelector value="soft" onPresetChange={vi.fn()} />)

    await user.click(screen.getByRole("button", { name: /select theme/i }))

    const softOption = within(screen.getByLabelText("Themes")).getByRole("button", {
      name: /soft/i,
    })
    expect(softOption).toHaveAttribute("aria-pressed", "true")
  })

  it("resolves swatches from the provided token values", async () => {
    const user = userEvent.setup()

    render(<ThemeSelector value="default" values={DEFAULT_DARK_TOKENS} onPresetChange={vi.fn()} />)

    await user.click(screen.getByRole("button", { name: /select theme/i }))

    const options = within(screen.getByLabelText("Themes")).getAllByRole("button")
    expect(options).toHaveLength(3)

    const defaultSwatches = within(options[0]).getAllByTestId("preset-swatch")
    expect(defaultSwatches[0]).toHaveStyle({
      backgroundColor: DEFAULT_DARK_TOKENS["--foreground"],
    })
  })
})

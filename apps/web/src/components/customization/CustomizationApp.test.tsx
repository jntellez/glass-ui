import { fireEvent, render, screen, waitFor, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeEach, describe, expect, it, vi } from "vitest"
import {
  DEFAULT_DARK_TOKENS,
  DEFAULT_LIGHT_TOKENS,
  DEFAULT_RADIUS_TOKENS,
} from "./customization-tokens"
import { serializeCss } from "./export-css"
import { CustomizationApp } from "./CustomizationApp"

describe("CustomizationApp", () => {
  const matchMedia = vi.fn()

  beforeEach(() => {
    localStorage.clear()
    document.documentElement.className = ""
    document.documentElement.style.colorScheme = ""
    matchMedia.mockReset()
    matchMedia.mockReturnValue({ matches: false })
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: matchMedia,
    })

    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: vi.fn(),
      },
    })
  })

  it("initializes the editor from the current global site theme", () => {
    localStorage.setItem("theme", "system")
    matchMedia.mockReturnValue({ matches: true })

    render(<CustomizationApp />)

    const glassBgInput = screen.getByRole("textbox", { name: "Background" }) as HTMLInputElement
    const foregroundInput = screen.getByRole("textbox", { name: "Foreground" }) as HTMLInputElement
    const previewScope = screen.getByTestId("preview-scope")

    expect(glassBgInput.value).toBe(DEFAULT_DARK_TOKENS["--glass-bg"])
    expect(foregroundInput.value).toBe(DEFAULT_DARK_TOKENS["--foreground"])
    expect(previewScope).toHaveAttribute("data-preview-mode", "dark")
  })

  it("updates only the edited token in the active mode", () => {
    render(<CustomizationApp />)

    const glassBgInput = screen.getByRole("textbox", { name: "Background" }) as HTMLInputElement
    const glassBorderInput = screen.getByRole("textbox", { name: "Border" }) as HTMLInputElement

    fireEvent.change(glassBgInput, { target: { value: "rgba(12, 34, 56, 0.7)" } })

    expect(glassBgInput.value).toBe("rgba(12, 34, 56, 0.7)")
    expect(glassBorderInput.value).toBe(DEFAULT_LIGHT_TOKENS["--glass-border"])
  })

  it("applies radius edits across both preview themes because radius is shared", async () => {
    const user = userEvent.setup()

    render(<CustomizationApp />)

    await user.click(screen.getByRole("tab", { name: "Other" }))

    const radiusInput = screen.getByRole("textbox", {
      name: "Radius extra large",
    }) as HTMLInputElement
    const previewScope = screen.getByTestId("preview-scope")

    fireEvent.change(radiusInput, { target: { value: "2" } })

    expect(radiusInput.value).toBe("2")
    expect(previewScope.style.getPropertyValue("--radius-glass-xl")).toBe("2rem")

    await user.click(screen.getByRole("button", { name: "Dark" }))

    expect(
      (screen.getByRole("textbox", { name: "Radius extra large" }) as HTMLInputElement).value,
    ).toBe("2")
    expect(previewScope.style.getPropertyValue("--radius-glass-xl")).toBe("2rem")
  })

  it("resets edited values back to canonical defaults", () => {
    render(<CustomizationApp />)

    const glassBgInput = screen.getByRole("textbox", { name: "Background" }) as HTMLInputElement

    fireEvent.change(glassBgInput, { target: { value: "rgba(12, 34, 56, 0.7)" } })
    fireEvent.click(screen.getByRole("button", { name: /reset/i }))

    expect(glassBgInput.value).toBe(DEFAULT_LIGHT_TOKENS["--glass-bg"])
  })

  it("updates the global document theme when the toolbar theme changes", () => {
    render(<CustomizationApp />)

    fireEvent.click(screen.getByRole("button", { name: "Dark" }))

    const glassBgInput = screen.getByRole("textbox", { name: "Background" }) as HTMLInputElement
    const previewScope = screen.getByTestId("preview-scope")

    expect(glassBgInput.value).toBe(DEFAULT_DARK_TOKENS["--glass-bg"])
    expect(document.documentElement.className).toBe("dark")
    expect(document.documentElement.style.colorScheme).toBe("dark")
    expect(previewScope).toHaveAttribute("data-preview-mode", "dark")
  })

  it("persists explicit toolbar theme changes and overrides a previous system choice", async () => {
    const user = userEvent.setup()
    localStorage.setItem("theme", "system")
    matchMedia.mockReturnValue({ matches: true })

    render(<CustomizationApp />)

    const previewScope = screen.getByTestId("preview-scope")

    expect(previewScope).toHaveAttribute("data-preview-mode", "dark")
    expect(localStorage.getItem("theme")).toBe("system")

    await user.click(screen.getByRole("button", { name: "Light" }))

    expect(previewScope).toHaveAttribute("data-preview-mode", "light")
    expect(document.documentElement.className).toBe("light")
    expect(document.documentElement.style.colorScheme).toBe("light")
    expect(localStorage.getItem("theme")).toBe("light")
  })

  it("copies the deterministic css export for the current editor state", async () => {
    const user = userEvent.setup()
    const writeTextSpy = vi.spyOn(navigator.clipboard, "writeText")

    render(<CustomizationApp />)

    fireEvent.change(screen.getByRole("textbox", { name: "Background" }), {
      target: { value: "rgba(12, 34, 56, 0.7)" },
    })
    fireEvent.click(screen.getByRole("button", { name: "Dark" }))
    fireEvent.change(screen.getByRole("textbox", { name: "Border" }), {
      target: { value: "rgba(90, 87, 210, 0.3)" },
    })
    await user.click(screen.getByRole("button", { name: /copy export/i }))

    await waitFor(() => {
      expect(writeTextSpy).toHaveBeenCalledWith(
        serializeCss(
          {
            ...DEFAULT_LIGHT_TOKENS,
            "--glass-bg": "rgba(12, 34, 56, 0.7)",
          },
          {
            ...DEFAULT_DARK_TOKENS,
            "--glass-border": "rgba(90, 87, 210, 0.3)",
          },
          DEFAULT_RADIUS_TOKENS,
        ),
      )
    })
  })

  it("announces copy success in a live region after exporting css", async () => {
    const user = userEvent.setup()

    render(<CustomizationApp />)

    await user.click(screen.getByRole("button", { name: /copy export/i }))

    expect(screen.getByRole("status")).toHaveTextContent("CSS export copied to clipboard.")
  })

  it("announces copy failure feedback when clipboard export rejects", async () => {
    const user = userEvent.setup()
    vi.spyOn(navigator.clipboard, "writeText").mockRejectedValueOnce(new Error("blocked"))

    render(<CustomizationApp />)

    await user.click(screen.getByRole("button", { name: /copy export/i }))

    expect(screen.getByRole("status")).toHaveTextContent(
      "Copy failed. Select the generated CSS and copy it manually.",
    )
  })

  it("renders token categories as tabs inside the named controls region", () => {
    render(<CustomizationApp />)

    const controlsRegion = screen.getByRole("region", { name: /token controls/i })
    const categoryTabs = within(controlsRegion).getByRole("tablist", { name: /token categories/i })

    expect(within(categoryTabs).getByRole("tab", { name: "Colors" })).toBeInTheDocument()
    expect(within(categoryTabs).getByRole("tab", { name: "Typography" })).toBeInTheDocument()
    expect(within(categoryTabs).getByRole("tab", { name: "Other" })).toBeInTheDocument()

    expect(
      within(controlsRegion).getByRole("searchbox", { name: /search colors/i }),
    ).toBeInTheDocument()

    for (const group of ["Text", "Accent", "Status", "Base glass", "Variant tokens"]) {
      expect(within(controlsRegion).getByRole("button", { name: group })).toBeInTheDocument()
    }

    expect(
      within(controlsRegion).queryByRole("textbox", { name: "--background" }),
    ).not.toBeInTheDocument()
    expect(within(controlsRegion).queryByText("--foreground")).not.toBeInTheDocument()
  })

  it("shows color token rows grouped under collapsible sections on the Colors tab", () => {
    render(<CustomizationApp />)

    const controlsRegion = screen.getByRole("region", { name: /token controls/i })

    expect(within(controlsRegion).getByRole("textbox", { name: "Foreground" })).toBeInTheDocument()
    expect(within(controlsRegion).getByRole("textbox", { name: "Accent" })).toBeInTheDocument()
    expect(within(controlsRegion).getByRole("textbox", { name: "Background" })).toBeInTheDocument()
    expect(
      within(controlsRegion).getByRole("textbox", { name: "Strong background" }),
    ).toBeInTheDocument()

    expect(
      within(controlsRegion).queryByRole("textbox", { name: "Shadow" }),
    ).not.toBeInTheDocument()
    expect(within(controlsRegion).queryByRole("textbox", { name: "Blur" })).not.toBeInTheDocument()
  })

  it("shows non-color token rows on the Other tab", async () => {
    const user = userEvent.setup()

    render(<CustomizationApp />)

    await user.click(screen.getByRole("tab", { name: "Other" }))

    const controlsRegion = screen.getByRole("region", { name: /token controls/i })

    expect(
      within(controlsRegion).queryByRole("textbox", { name: "Shadow" }),
    ).not.toBeInTheDocument()
    expect(
      within(controlsRegion).getByRole("textbox", { name: "Radius extra large" }),
    ).toBeInTheDocument()
    expect(within(controlsRegion).getByRole("textbox", { name: "Blur" })).toBeInTheDocument()
    expect(
      within(controlsRegion).getByRole("textbox", { name: "Shadow small color" }),
    ).toBeInTheDocument()
    expect(
      within(controlsRegion).getByRole("slider", { name: "Shadow small Blur slider" }),
    ).toBeInTheDocument()
    expect(
      within(controlsRegion).getByRole("slider", { name: "Radius extra large slider" }),
    ).toBeInTheDocument()
    expect(within(controlsRegion).getByRole("slider", { name: "Blur slider" })).toBeInTheDocument()

    expect(
      within(controlsRegion).queryByRole("textbox", { name: "Foreground" }),
    ).not.toBeInTheDocument()
  })

  it("updates shared radius tokens from the slider control", async () => {
    const user = userEvent.setup()

    render(<CustomizationApp />)

    await user.click(screen.getByRole("tab", { name: "Other" }))

    const radiusSlider = screen.getByRole("slider", { name: "Radius medium slider" })
    const previewScope = screen.getByTestId("preview-scope")

    radiusSlider.focus()
    await user.keyboard("{ArrowRight}")

    expect(screen.getByRole("textbox", { name: "Radius medium" })).toHaveValue("0.775")
    expect(previewScope.style.getPropertyValue("--radius-glass-md")).toBe("0.775rem")
  })

  it("updates blur tokens from the slider control", async () => {
    const user = userEvent.setup()

    render(<CustomizationApp />)

    await user.click(screen.getByRole("tab", { name: "Other" }))

    const blurSlider = screen.getByRole("slider", { name: "Blur slider" })
    const previewScope = screen.getByTestId("preview-scope")

    blurSlider.focus()
    await user.keyboard("{ArrowRight}")

    expect(screen.getByRole("textbox", { name: "Blur" })).toHaveValue("7")
    expect(previewScope.style.getPropertyValue("--glass-blur")).toBe("7px")
  })

  it("updates shadow tokens from the shadow controls", async () => {
    const user = userEvent.setup()

    render(<CustomizationApp />)

    await user.click(screen.getByRole("tab", { name: "Other" }))

    const shadowBlurSlider = screen.getByRole("slider", { name: "Shadow medium Blur slider" })
    const previewScope = screen.getByTestId("preview-scope")

    shadowBlurSlider.focus()
    await user.keyboard("{ArrowRight}")

    expect(screen.getByRole("textbox", { name: "Shadow medium Blur" })).toHaveValue("31")
    expect(previewScope.style.getPropertyValue("--glass-shadow-md")).toBe(
      "0px 4px 31px 0px rgba(0, 0, 0, 0.1)",
    )
  })

  it("shows an empty state on the Typography tab", async () => {
    const user = userEvent.setup()

    render(<CustomizationApp />)

    await user.click(screen.getByRole("tab", { name: "Typography" }))

    expect(screen.getByText("Typography tokens coming soon.")).toBeInTheDocument()
  })

  it("shows accent controls and updates preview samples with accent tokens in the active mode", async () => {
    const user = userEvent.setup()

    render(<CustomizationApp />)

    expect(screen.getByRole("textbox", { name: "Accent" })).toHaveValue(
      DEFAULT_LIGHT_TOKENS["--accent"],
    )
    expect(screen.getByRole("textbox", { name: "Accent foreground" })).toHaveValue("#ffffff")

    await user.click(screen.getByRole("tab", { name: /content/i }))

    const defaultSample = screen.getByRole("article", { name: /default sample/i })

    expect(
      within(defaultSample).getByText(`Accent ${DEFAULT_LIGHT_TOKENS["--accent"]}`),
    ).toBeInTheDocument()
    expect(within(defaultSample).getByText("Accent foreground #ffffff")).toBeInTheDocument()

    fireEvent.change(screen.getByRole("textbox", { name: "Accent" }), {
      target: { value: "#8b5cf6" },
    })
    fireEvent.change(screen.getByRole("textbox", { name: "Accent foreground" }), {
      target: { value: "#faf5ff" },
    })

    expect(within(defaultSample).getByText("Accent #8b5cf6")).toBeInTheDocument()
    expect(within(defaultSample).getByText("Accent foreground #faf5ff")).toBeInTheDocument()

    await user.click(screen.getByRole("button", { name: "Dark" }))

    expect(
      within(defaultSample).getByText(`Accent ${DEFAULT_DARK_TOKENS["--accent"]}`),
    ).toBeInTheDocument()
    expect(within(defaultSample).getByText("Accent foreground #18181b")).toBeInTheDocument()
  })

  it("shows destructive controls and updates preview theme variables in the active mode", () => {
    render(<CustomizationApp />)

    const destructiveInput = screen.getByRole("textbox", { name: "Destructive" })
    const destructiveForegroundInput = screen.getByRole("textbox", {
      name: "Destructive foreground",
    })
    const previewScope = screen.getByTestId("preview-scope")

    expect(destructiveInput).toHaveValue("#dc2626")
    expect(destructiveForegroundInput).toHaveValue("#ffffff")

    fireEvent.change(destructiveInput, { target: { value: "#b91c1c" } })
    fireEvent.change(destructiveForegroundInput, { target: { value: "#fff1f2" } })

    expect(previewScope.style.getPropertyValue("--color-destructive")).toBe("#b91c1c")
    expect(previewScope.style.getPropertyValue("--color-destructive-foreground")).toBe("#fff1f2")
  })

  it("filters color token rows to matching controls and hides empty groups", async () => {
    const user = userEvent.setup()

    render(<CustomizationApp />)

    const controlsRegion = screen.getByRole("region", { name: /token controls/i })

    await user.type(screen.getByRole("searchbox", { name: /search colors/i }), "accent")

    const visibleRows = within(controlsRegion).getAllByRole("listitem")

    expect(visibleRows).toHaveLength(2)
    expect(within(controlsRegion).getByRole("button", { name: "Accent" })).toBeInTheDocument()
    expect(within(controlsRegion).queryByRole("button", { name: "Text" })).not.toBeInTheDocument()
    expect(
      within(controlsRegion).queryByRole("textbox", { name: "Foreground" }),
    ).not.toBeInTheDocument()
    expect(within(controlsRegion).getByRole("textbox", { name: "Accent" })).toBeInTheDocument()
  })

  it("preserves edited token values when non-matching rows are filtered out", async () => {
    const user = userEvent.setup()

    render(<CustomizationApp />)

    const glassBackgroundInput = screen.getByRole("textbox", { name: "Background" })

    await user.clear(glassBackgroundInput)
    await user.type(glassBackgroundInput, "rgba(12, 34, 56, 0.7)")
    await user.type(screen.getByRole("searchbox", { name: /search colors/i }), "foreground")

    expect(screen.queryByRole("textbox", { name: "Background" })).not.toBeInTheDocument()

    await user.clear(screen.getByRole("searchbox", { name: /search colors/i }))

    expect(screen.getByRole("textbox", { name: "Background" })).toHaveValue("rgba(12, 34, 56, 0.7)")
  })

  it("keeps toolbar actions, theme selector, and token inputs keyboard reachable with stable names", async () => {
    const user = userEvent.setup()

    render(<CustomizationApp />)

    async function tabTo(target: HTMLElement, limit = 50) {
      for (let index = 0; index < limit; index += 1) {
        if (target === document.activeElement) {
          return
        }

        await user.tab()
      }

      throw new Error(
        `Timed out waiting for ${target.getAttribute("aria-label") ?? target.textContent}`,
      )
    }

    const workspace = screen.getByRole("region", { name: /customization workspace/i })
    const toolbar = within(workspace).getByRole("toolbar", { name: /customization actions/i })

    expect(toolbar).toHaveAttribute("data-sticky", "desktop")
    expect(screen.getByRole("button", { name: "Light" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Dark" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /^reset$/i })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /copy export/i })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /select theme/i })).toBeInTheDocument()

    await user.tab()
    expect(screen.getByRole("button", { name: /select theme/i })).toHaveFocus()

    await tabTo(screen.getByRole("tab", { name: "Colors" }))
    await tabTo(screen.getByRole("button", { name: "Light" }))
    await tabTo(screen.getByRole("button", { name: /copy export/i }))
    await tabTo(screen.getByRole("textbox", { name: "Foreground" }))
  })

  it("describes which preview mode is currently active", async () => {
    const user = userEvent.setup()

    render(<CustomizationApp />)

    expect(screen.getByTestId("preview-scope")).toHaveAttribute("data-preview-mode", "light")

    await user.click(screen.getByRole("button", { name: "Dark" }))

    expect(screen.getByTestId("preview-scope")).toHaveAttribute("data-preview-mode", "dark")
  })

  it("renders named default, soft, and strong preview samples and updates them for the active mode", async () => {
    const user = userEvent.setup()

    render(<CustomizationApp />)

    await user.click(screen.getByRole("tab", { name: /content/i }))

    const defaultSample = screen.getByRole("article", { name: /default sample/i })
    const softSample = screen.getByRole("article", { name: /soft sample/i })
    const strongSample = screen.getByRole("article", { name: /strong sample/i })

    expect(within(defaultSample).getByText(DEFAULT_LIGHT_TOKENS["--glass-bg"])).toBeInTheDocument()
    expect(
      within(softSample).getByText(DEFAULT_LIGHT_TOKENS["--glass-bg-soft"]),
    ).toBeInTheDocument()
    expect(
      within(strongSample).getByText(DEFAULT_LIGHT_TOKENS["--glass-bg-strong"]),
    ).toBeInTheDocument()

    await user.click(screen.getByRole("button", { name: "Dark" }))

    expect(within(defaultSample).getByText(DEFAULT_DARK_TOKENS["--glass-bg"])).toBeInTheDocument()
    expect(within(softSample).getByText(DEFAULT_DARK_TOKENS["--glass-bg-soft"])).toBeInTheDocument()
    expect(
      within(strongSample).getByText(DEFAULT_DARK_TOKENS["--glass-bg-strong"]),
    ).toBeInTheDocument()
  })

  it("renders a richer preview canvas with representative glass-ui surfaces", () => {
    render(<CustomizationApp />)

    const previewRegion = screen.getByRole("complementary", { name: /preview/i })
    const tablist = screen.getByRole("tablist", { name: /preview scenes/i })
    const overviewTab = within(tablist).getByRole("tab", { name: /overview/i })
    const componentsTab = within(tablist).getByRole("tab", { name: /components/i })
    const contentTab = within(tablist).getByRole("tab", { name: /content/i })
    const activePanel = within(previewRegion).getByRole("tabpanel", { name: /overview/i })

    expect(overviewTab).toHaveAttribute("aria-selected", "true")
    expect(componentsTab).toHaveAttribute("aria-selected", "false")
    expect(contentTab).toHaveAttribute("aria-selected", "false")
    expect(within(activePanel).getByText("Revenue snapshot")).toBeInTheDocument()
    expect(within(activePanel).getByRole("button", { name: /share preview/i })).toBeInTheDocument()
    expect(within(activePanel).queryByText("Team inbox")).not.toBeInTheDocument()
    expect(within(activePanel).queryByText("Weekly sync notes")).not.toBeInTheDocument()
  })

  it("switches preview scenes with accessible tab semantics", async () => {
    const user = userEvent.setup()

    render(<CustomizationApp />)

    const previewRegion = screen.getByRole("complementary", { name: /preview/i })
    const tablist = screen.getByRole("tablist", { name: /preview scenes/i })
    const overviewTab = within(tablist).getByRole("tab", { name: /overview/i })
    const componentsTab = within(tablist).getByRole("tab", { name: /components/i })
    const contentTab = within(tablist).getByRole("tab", { name: /content/i })

    expect(screen.getByRole("tabpanel", { name: /overview/i })).toBeInTheDocument()

    await user.click(componentsTab)

    expect(overviewTab).toHaveAttribute("aria-selected", "false")
    expect(componentsTab).toHaveAttribute("aria-selected", "true")
    expect(contentTab).toHaveAttribute("aria-selected", "false")
    expect(screen.getByRole("tabpanel", { name: /components/i })).toBeInTheDocument()
    expect(screen.getByText("Team inbox")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /publish changes/i })).toBeInTheDocument()
    expect(screen.queryByText("Revenue snapshot")).not.toBeInTheDocument()

    await user.click(contentTab)

    expect(componentsTab).toHaveAttribute("aria-selected", "false")
    expect(contentTab).toHaveAttribute("aria-selected", "true")
    expect(screen.getByRole("tabpanel", { name: /content/i })).toBeInTheDocument()
    expect(screen.getByText("Weekly sync notes")).toBeInTheDocument()
    expect(screen.getByRole("article", { name: /default sample/i })).toBeInTheDocument()
  })

  it("updates the active preview scene immediately for token edits and preview-mode switches", async () => {
    const user = userEvent.setup()

    render(<CustomizationApp />)

    await user.click(screen.getByRole("tab", { name: /content/i }))

    const defaultSample = screen.getByRole("article", { name: /default sample/i })

    expect(
      within(defaultSample).getByText(`Background ${DEFAULT_LIGHT_TOKENS["--glass-bg"]}`),
    ).toBeInTheDocument()

    fireEvent.change(screen.getByRole("textbox", { name: "Background" }), {
      target: { value: "rgba(12, 34, 56, 0.7)" },
    })

    expect(within(defaultSample).getByText("Background rgba(12, 34, 56, 0.7)")).toBeInTheDocument()

    await user.click(screen.getByRole("button", { name: "Dark" }))

    expect(
      within(defaultSample).getByText(`Background ${DEFAULT_DARK_TOKENS["--glass-bg"]}`),
    ).toBeInTheDocument()
  })

  it("applies presets from the theme selector and updates the preview samples", async () => {
    const user = userEvent.setup()

    render(<CustomizationApp />)

    await user.click(screen.getByRole("tab", { name: /content/i }))

    const defaultSample = screen.getByRole("article", { name: /default sample/i })

    await user.click(screen.getByRole("button", { name: /select theme/i }))
    await user.click(
      within(screen.getByLabelText("Themes")).getByRole("button", { name: /strong/i }),
    )

    expect(
      within(defaultSample).getByText(`Background ${DEFAULT_LIGHT_TOKENS["--glass-bg-strong"]}`),
    ).toBeInTheDocument()
    expect(
      within(defaultSample).getByText(`Blur ${DEFAULT_LIGHT_TOKENS["--glass-blur-strong"]}`),
    ).toBeInTheDocument()

    await user.click(screen.getByRole("button", { name: /select theme/i }))
    await user.click(
      within(screen.getByLabelText("Themes")).getByRole("button", { name: /default/i }),
    )

    expect(
      within(defaultSample).getByText(`Background ${DEFAULT_LIGHT_TOKENS["--glass-bg"]}`),
    ).toBeInTheDocument()
    expect(
      within(defaultSample).getByText(`Blur ${DEFAULT_LIGHT_TOKENS["--glass-blur"]}`),
    ).toBeInTheDocument()
  })

  it("tracks active preset per preview mode", async () => {
    const user = userEvent.setup()

    render(<CustomizationApp />)

    await user.click(screen.getByRole("button", { name: /select theme/i }))
    await user.click(within(screen.getByLabelText("Themes")).getByRole("button", { name: /soft/i }))

    expect(screen.getByRole("button", { name: "Select theme: Soft" })).toBeInTheDocument()

    await user.click(screen.getByRole("button", { name: "Dark" }))

    expect(screen.getByRole("button", { name: "Select theme: Default" })).toBeInTheDocument()

    await user.click(screen.getByRole("button", { name: /select theme/i }))
    await user.click(
      within(screen.getByLabelText("Themes")).getByRole("button", { name: /strong/i }),
    )

    expect(screen.getByRole("button", { name: "Select theme: Strong" })).toBeInTheDocument()

    await user.click(screen.getByRole("button", { name: "Light" }))

    expect(screen.getByRole("button", { name: "Select theme: Soft" })).toBeInTheDocument()
  })

  it("resets the active preset for the current mode when a token is edited manually", async () => {
    const user = userEvent.setup()

    render(<CustomizationApp />)

    await user.click(screen.getByRole("button", { name: /select theme/i }))
    await user.click(
      within(screen.getByLabelText("Themes")).getByRole("button", { name: /strong/i }),
    )

    expect(screen.getByRole("button", { name: "Select theme: Strong" })).toBeInTheDocument()

    fireEvent.change(screen.getByRole("textbox", { name: "Background" }), {
      target: { value: "rgba(12, 34, 56, 0.7)" },
    })

    expect(screen.getByRole("button", { name: "Select theme: Default" })).toBeInTheDocument()
  })

  it("exposes derived preview theme variables for representative non-accent token edits", async () => {
    const user = userEvent.setup()

    render(<CustomizationApp />)

    const previewScope = screen.getByTestId("preview-scope")

    expect(previewScope.style.getPropertyValue("--color-foreground")).toBe(
      DEFAULT_LIGHT_TOKENS["--foreground"],
    )
    expect(previewScope.style.getPropertyValue("--color-muted-foreground")).toBe(
      DEFAULT_LIGHT_TOKENS["--muted-foreground"],
    )
    expect(previewScope.style.getPropertyValue("--color-glass-bg")).toBe(
      DEFAULT_LIGHT_TOKENS["--glass-bg"],
    )
    expect(previewScope.style.getPropertyValue("--shadow-glass")).toBe(
      DEFAULT_LIGHT_TOKENS["--glass-shadow"],
    )

    fireEvent.change(screen.getByRole("textbox", { name: "Foreground" }), {
      target: { value: "#102030" },
    })
    fireEvent.change(screen.getByRole("textbox", { name: "Muted foreground" }), {
      target: { value: "#405060" },
    })
    fireEvent.change(screen.getByRole("textbox", { name: "Background" }), {
      target: { value: "rgba(12, 34, 56, 0.7)" },
    })

    await user.click(screen.getByRole("tab", { name: "Other" }))
    fireEvent.change(screen.getByRole("textbox", { name: "Shadow small Blur" }), {
      target: { value: "9" },
    })
    fireEvent.change(screen.getByRole("textbox", { name: "Radius extra large" }), {
      target: { value: "2" },
    })

    expect(previewScope.style.getPropertyValue("--color-foreground")).toBe("#102030")
    expect(previewScope.style.getPropertyValue("--color-muted-foreground")).toBe("#405060")
    expect(previewScope.style.getPropertyValue("--color-glass-bg")).toBe("rgba(12, 34, 56, 0.7)")
    expect(previewScope.style.getPropertyValue("--shadow-glass")).toBe(
      DEFAULT_LIGHT_TOKENS["--glass-shadow"],
    )
    expect(previewScope.style.getPropertyValue("--shadow-glass-sm")).toBe(
      "0px 2px 9px 0px rgba(0, 0, 0, 0.06)",
    )
    expect(previewScope.style.getPropertyValue("--radius-glass-xl")).toBe("2rem")

    await user.click(screen.getByRole("button", { name: "Dark" }))

    expect(previewScope.style.getPropertyValue("--color-foreground")).toBe(
      DEFAULT_DARK_TOKENS["--foreground"],
    )
    expect(previewScope.style.getPropertyValue("--color-glass-bg")).toBe(
      DEFAULT_DARK_TOKENS["--glass-bg"],
    )
    expect(previewScope.style.getPropertyValue("--radius-glass-xl")).toBe("2rem")
  })

  it("keeps preview scene tabs and active panels in sync for the current editor view", async () => {
    const user = userEvent.setup()

    render(<CustomizationApp />)

    const previewRegion = screen.getByRole("complementary", { name: /preview/i })
    const tablist = screen.getByRole("tablist", { name: /preview scenes/i })

    expect(within(tablist).getByRole("tab", { name: /overview/i })).toHaveAttribute(
      "aria-selected",
      "true",
    )
    expect(within(previewRegion).getByRole("tabpanel", { name: /overview/i })).toBeInTheDocument()

    await user.type(screen.getByRole("searchbox", { name: /search colors/i }), "accent")
    await user.click(screen.getByRole("tab", { name: /components/i }))

    expect(within(tablist).getByRole("tab", { name: /components/i })).toHaveAttribute(
      "aria-selected",
      "true",
    )
    expect(within(previewRegion).getByRole("tabpanel", { name: /components/i })).toBeInTheDocument()
  })

  it("announces copy feedback in a live region", async () => {
    const user = userEvent.setup()

    render(<CustomizationApp />)

    await user.click(screen.getByRole("button", { name: /copy export/i }))

    expect(screen.getByRole("status")).toHaveTextContent("CSS export copied to clipboard.")
  })

  it("renders toolbar actions, controls, and preview region reachable on a narrow viewport", () => {
    window.innerWidth = 375

    render(<CustomizationApp />)

    expect(screen.getByRole("region", { name: /customization workspace/i })).toBeInTheDocument()
    expect(screen.getByRole("toolbar", { name: /customization actions/i })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Light" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Dark" })).toBeInTheDocument()
    expect(screen.getByRole("region", { name: /token controls/i })).toBeInTheDocument()
    expect(screen.getByRole("complementary", { name: /preview/i })).toBeInTheDocument()
    expect(screen.getByRole("tablist", { name: /preview scenes/i })).toBeInTheDocument()
    expect(screen.getByRole("textbox", { name: "Foreground" })).toBeInTheDocument()
    expect(screen.getByRole("tab", { name: /overview/i })).toBeInTheDocument()
  })
})

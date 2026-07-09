import { fireEvent, render, screen, waitFor, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { parseCustomizationConfig } from "./customization-config"
import { CUSTOMIZATION_STORAGE_KEY, readPersistedEditorState } from "./customization-storage"
import {
  DEFAULT_DARK_TOKENS,
  DEFAULT_LIGHT_TOKENS,
  DEFAULT_RADIUS_TOKENS,
} from "./customization-tokens"
import { serializeCss } from "./export-css"
import { CustomizationApp } from "./CustomizationApp"
import ThemeToggle from "../theme/ThemeToggle"

describe("CustomizationApp", () => {
  const matchMedia = vi.fn()

  beforeEach(() => {
    document.body
      .querySelectorAll("[data-fullscreen-test-root]")
      .forEach((element) => element.remove())
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

    Object.defineProperty(URL, "createObjectURL", {
      configurable: true,
      value: vi.fn(() => "blob:glass-ui-config"),
    })
    Object.defineProperty(URL, "revokeObjectURL", {
      configurable: true,
      value: vi.fn(),
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

  it("persists explicit toolbar theme changes and synchronizes the global header toggle", async () => {
    const user = userEvent.setup()
    localStorage.setItem("theme", "system")
    matchMedia.mockReturnValue({ matches: true })

    render(
      <>
        <ThemeToggle />
        <CustomizationApp />
      </>,
    )

    const previewScope = screen.getByTestId("preview-scope")

    expect(previewScope).toHaveAttribute("data-preview-mode", "dark")
    expect(localStorage.getItem("theme")).toBe("system")
    expect(screen.getByRole("radio", { name: /system theme/i })).toHaveAttribute(
      "aria-checked",
      "true",
    )

    await user.click(screen.getByRole("button", { name: "Light" }))

    expect(previewScope).toHaveAttribute("data-preview-mode", "light")
    expect(document.documentElement.className).toBe("light")
    expect(document.documentElement.style.colorScheme).toBe("light")
    expect(localStorage.getItem("theme")).toBe("light")
    expect(screen.getByRole("button", { name: "Light" })).toHaveAttribute("aria-pressed", "true")
    expect(screen.getByRole("radio", { name: /light theme/i })).toHaveAttribute(
      "aria-checked",
      "true",
    )

    await user.click(screen.getByRole("button", { name: "Dark" }))

    expect(previewScope).toHaveAttribute("data-preview-mode", "dark")
    expect(document.documentElement.className).toBe("dark")
    expect(document.documentElement.style.colorScheme).toBe("dark")
    expect(localStorage.getItem("theme")).toBe("dark")
    expect(screen.getByRole("button", { name: "Dark" })).toHaveAttribute("aria-pressed", "true")
    expect(screen.getByRole("radio", { name: /dark theme/i })).toHaveAttribute(
      "aria-checked",
      "true",
    )
  })

  it("updates the customization active mode when the header toggle changes the global theme", async () => {
    const user = userEvent.setup()

    render(
      <>
        <ThemeToggle />
        <CustomizationApp />
      </>,
    )

    const previewScope = screen.getByTestId("preview-scope")

    expect(previewScope).toHaveAttribute("data-preview-mode", "light")

    await user.click(screen.getByRole("radio", { name: /dark theme/i }))

    await waitFor(() => {
      expect(previewScope).toHaveAttribute("data-preview-mode", "dark")
    })

    expect(screen.getByRole("button", { name: "Dark" })).toHaveAttribute("aria-pressed", "true")
    expect(localStorage.getItem("theme")).toBe("dark")
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
    expect(within(categoryTabs).getByRole("tab", { name: "Other" })).toBeInTheDocument()
    expect(within(categoryTabs).queryByRole("tab", { name: "Typography" })).not.toBeInTheDocument()

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

  it("shows accent controls and updates preview samples with accent tokens in the active mode", async () => {
    const user = userEvent.setup()

    render(<CustomizationApp />)

    expect(screen.getByRole("textbox", { name: "Accent" })).toHaveValue(
      DEFAULT_LIGHT_TOKENS["--accent"],
    )
    expect(screen.getByRole("textbox", { name: "Accent foreground" })).toHaveValue("#ffffff")

    await user.click(screen.getByRole("tab", { name: /content/i }))

    const defaultSample = screen.getByRole("article", { name: /review checklist sample/i })

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
    expect(screen.getByRole("button", { name: /enter fullscreen preview/i })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /select theme/i })).toBeInTheDocument()

    await user.tab()
    expect(screen.getByRole("button", { name: /select theme/i })).toHaveFocus()

    await tabTo(screen.getByRole("tab", { name: "Colors" }))
    await tabTo(screen.getByRole("button", { name: "Light" }))
    await tabTo(screen.getByRole("button", { name: /copy export/i }))
    await tabTo(screen.getByRole("button", { name: /enter fullscreen preview/i }))
    await tabTo(screen.getByRole("textbox", { name: "Foreground" }))
  })

  it("opens fullscreen preview with inspection-only controls and syncs changes back to the workspace", async () => {
    const user = userEvent.setup()

    render(<CustomizationApp />)

    const openFullscreenButton = screen.getByRole("button", { name: /enter fullscreen preview/i })
    expect(openFullscreenButton.querySelector("svg")).not.toBeNull()
    expect(openFullscreenButton).toHaveTextContent("")

    await user.click(openFullscreenButton)

    const dialog = screen.getByRole("dialog", { name: /fullscreen preview/i })
    const dialogToolbar = within(dialog).getByRole("toolbar", { name: /customization actions/i })
    const dialogTablist = within(dialog).getByRole("tablist", { name: /preview scenes/i })

    expect(dialog).toHaveClass("app-background", "p-2")
    expect(dialog).not.toHaveClass("backdrop-blur-sm")
    expect(within(dialog).getByTestId("preview-scope")).toHaveClass(
      "!bg-[var(--color-background)]",
      "p-4",
    )
    expect(within(dialogToolbar).getByRole("button", { name: "Light" })).toBeInTheDocument()
    expect(within(dialogToolbar).getByRole("button", { name: "Dark" })).toBeInTheDocument()
    expect(
      within(dialogToolbar).getByRole("button", { name: /exit fullscreen preview/i }),
    ).toBeInTheDocument()
    expect(
      within(dialogToolbar).getByRole("button", { name: /exit fullscreen preview/i }),
    ).toHaveTextContent("")
    expect(
      within(dialogToolbar).queryByRole("button", { name: /^reset$/i }),
    ).not.toBeInTheDocument()
    expect(
      within(dialogToolbar).queryByRole("button", { name: /copy export/i }),
    ).not.toBeInTheDocument()
    expect(
      within(dialogToolbar).queryByRole("button", { name: /enter fullscreen preview/i }),
    ).not.toBeInTheDocument()
    expect(within(dialogTablist).getByRole("tab", { name: /dashboard/i })).toBeInTheDocument()
    expect(within(dialogTablist).getByRole("tab", { name: /settings/i })).toBeInTheDocument()
    expect(within(dialogTablist).getByRole("tab", { name: /content/i })).toBeInTheDocument()

    await user.click(within(dialogTablist).getByRole("tab", { name: /content/i }))
    await user.click(within(dialogToolbar).getByRole("button", { name: "Dark" }))

    expect(within(dialog).getByRole("tabpanel", { name: /content/i })).toBeInTheDocument()
    expect(within(dialog).getByTestId("preview-scope")).toHaveAttribute("data-preview-mode", "dark")

    await user.click(
      within(dialogToolbar).getByRole("button", { name: /exit fullscreen preview/i }),
    )

    expect(screen.queryByRole("dialog", { name: /fullscreen preview/i })).not.toBeInTheDocument()
    await waitFor(() => {
      expect(screen.getByRole("tab", { name: /content/i })).toHaveAttribute("aria-selected", "true")
      expect(screen.getByRole("button", { name: /enter fullscreen preview/i })).toBeInTheDocument()
    })
    expect(screen.getByTestId("preview-scope")).toHaveAttribute("data-preview-mode", "dark")
  })

  it("closes fullscreen preview when Escape is pressed", async () => {
    const user = userEvent.setup()

    render(<CustomizationApp />)

    await user.click(screen.getByRole("button", { name: /enter fullscreen preview/i }))

    expect(screen.getByRole("dialog", { name: /fullscreen preview/i })).toBeInTheDocument()

    await user.keyboard("{Escape}")

    expect(screen.queryByRole("dialog", { name: /fullscreen preview/i })).not.toBeInTheDocument()
    await waitFor(() => {
      expect(screen.getByRole("button", { name: /enter fullscreen preview/i })).toBeInTheDocument()
    })
  })

  it("traps focus inside the fullscreen dialog and restores focus on close", async () => {
    const user = userEvent.setup()

    const appContainer = document.createElement("div")
    appContainer.setAttribute("data-fullscreen-test-root", "")
    document.body.appendChild(appContainer)

    render(<CustomizationApp />, { container: appContainer })

    const openFullscreenButton = screen.getByRole("button", { name: /enter fullscreen preview/i })
    const resetButton = screen.getByRole("button", { name: /^reset$/i })
    const copyExportButton = screen.getByRole("button", { name: /copy export/i })

    await user.click(openFullscreenButton)

    const dialog = screen.getByRole("dialog", { name: /fullscreen preview/i })
    const exitFullscreenButton = within(dialog).getByRole("button", {
      name: /exit fullscreen preview/i,
    })

    expect(dialog.contains(document.activeElement)).toBe(true)
    expect(appContainer).toHaveAttribute("aria-hidden", "true")
    expect(appContainer.contains(document.activeElement)).toBe(false)

    for (let index = 0; index < 20; index += 1) {
      await user.tab()
      expect(dialog.contains(document.activeElement)).toBe(true)
      expect(document.activeElement).not.toBe(resetButton)
      expect(document.activeElement).not.toBe(copyExportButton)
      expect(document.activeElement).not.toBe(openFullscreenButton)
    }

    await user.tab({ shift: true })
    expect(dialog.contains(document.activeElement)).toBe(true)

    await user.click(exitFullscreenButton)

    expect(openFullscreenButton).toHaveFocus()
    appContainer.remove()
  })

  it.each(["Settings", "Content"])(
    "keeps fullscreen focus on tabbable controls when %s is the active scene",
    async (sceneName) => {
      const user = userEvent.setup()

      render(<CustomizationApp />)

      await user.click(screen.getByRole("tab", { name: sceneName }))
      await user.click(screen.getByRole("button", { name: /enter fullscreen preview/i }))

      const dialog = screen.getByRole("dialog", { name: /fullscreen preview/i })
      const inactiveTabs = within(dialog)
        .getAllByRole("tab")
        .filter((tab) => tab.getAttribute("tabindex") === "-1")

      expect(dialog.contains(document.activeElement)).toBe(true)
      expect(document.activeElement).toBeInstanceOf(HTMLElement)
      expect((document.activeElement as HTMLElement).tabIndex).toBeGreaterThanOrEqual(0)
      expect(inactiveTabs).not.toContain(document.activeElement as HTMLElement)

      for (let index = 0; index < 12; index += 1) {
        await user.tab()
        expect(dialog.contains(document.activeElement)).toBe(true)
        expect(inactiveTabs).not.toContain(document.activeElement as HTMLElement)
      }

      for (let index = 0; index < 12; index += 1) {
        await user.tab({ shift: true })
        expect(dialog.contains(document.activeElement)).toBe(true)
        expect(inactiveTabs).not.toContain(document.activeElement as HTMLElement)
      }
    },
  )

  it("inerts external top-level controls while fullscreen is open and restores them on close", async () => {
    const user = userEvent.setup()
    const headerContainer = document.createElement("div")
    const appContainer = document.createElement("div")
    const footerContainer = document.createElement("div")

    headerContainer.setAttribute("data-fullscreen-test-root", "")
    appContainer.setAttribute("data-fullscreen-test-root", "")
    footerContainer.setAttribute("data-fullscreen-test-root", "")

    headerContainer.innerHTML = '<button type="button">Global search</button>'
    footerContainer.innerHTML = '<button type="button">Theme toggle</button>'

    document.body.append(headerContainer, appContainer, footerContainer)

    render(<CustomizationApp />, { container: appContainer })

    const openFullscreenButton = screen.getByRole("button", { name: /enter fullscreen preview/i })

    await user.click(openFullscreenButton)

    const dialog = screen.getByRole("dialog", { name: /fullscreen preview/i })

    expect(dialog.contains(document.activeElement)).toBe(true)
    expect(headerContainer).toHaveAttribute("aria-hidden", "true")
    expect(appContainer).toHaveAttribute("aria-hidden", "true")
    expect(footerContainer).toHaveAttribute("aria-hidden", "true")
    expect(headerContainer.inert).toBe(true)
    expect(appContainer.inert).toBe(true)
    expect(footerContainer.inert).toBe(true)

    await user.keyboard("{Escape}")

    expect(screen.queryByRole("dialog", { name: /fullscreen preview/i })).not.toBeInTheDocument()
    expect(headerContainer).not.toHaveAttribute("aria-hidden")
    expect(appContainer).not.toHaveAttribute("aria-hidden")
    expect(footerContainer).not.toHaveAttribute("aria-hidden")
    expect(headerContainer.inert).not.toBe(true)
    expect(appContainer.inert).not.toBe(true)
    expect(footerContainer.inert).not.toBe(true)
    expect(openFullscreenButton).toHaveFocus()

    headerContainer.remove()
    appContainer.remove()
    footerContainer.remove()
  })

  it("keeps external page controls out of the fullscreen tab sequence", async () => {
    const user = userEvent.setup()

    render(
      <>
        <button type="button">Global search</button>
        <CustomizationApp />
        <button type="button">Theme toggle</button>
      </>,
    )

    const globalSearchButton = screen.getByRole("button", { name: /global search/i })
    const themeToggleButton = screen.getByRole("button", { name: /theme toggle/i })
    const openFullscreenButton = screen.getByRole("button", { name: /enter fullscreen preview/i })

    await user.click(openFullscreenButton)

    const dialog = screen.getByRole("dialog", { name: /fullscreen preview/i })

    expect(dialog.contains(document.activeElement)).toBe(true)

    for (let index = 0; index < 20; index += 1) {
      await user.tab()
      expect(dialog.contains(document.activeElement)).toBe(true)
      expect(document.activeElement).not.toBe(globalSearchButton)
      expect(document.activeElement).not.toBe(themeToggleButton)
    }

    for (let index = 0; index < 20; index += 1) {
      await user.tab({ shift: true })
      expect(dialog.contains(document.activeElement)).toBe(true)
      expect(document.activeElement).not.toBe(globalSearchButton)
      expect(document.activeElement).not.toBe(themeToggleButton)
    }

    globalSearchButton.focus()
    expect(dialog.contains(document.activeElement)).toBe(true)

    themeToggleButton.focus()
    expect(dialog.contains(document.activeElement)).toBe(true)

    await user.keyboard("{Escape}")

    expect(screen.queryByRole("dialog", { name: /fullscreen preview/i })).not.toBeInTheDocument()
    expect(openFullscreenButton).toHaveFocus()
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

    const defaultSample = screen.getByRole("article", { name: /review checklist sample/i })
    const softSample = screen.getByRole("article", { name: /inline callout sample/i })
    const strongSample = screen.getByRole("article", { name: /publication blocker sample/i })

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
    const overviewTab = within(tablist).getByRole("tab", { name: /dashboard/i })
    const settingsTab = within(tablist).getByRole("tab", { name: /settings/i })
    const contentTab = within(tablist).getByRole("tab", { name: /content/i })
    const activePanel = within(previewRegion).getByRole("tabpanel", { name: /dashboard/i })

    expect(overviewTab).toHaveAttribute("aria-selected", "true")
    expect(settingsTab).toHaveAttribute("aria-selected", "false")
    expect(contentTab).toHaveAttribute("aria-selected", "false")
    expect(within(activePanel).getByText("Revenue command center")).toBeInTheDocument()
    expect(within(activePanel).getByRole("button", { name: /share report/i })).toBeInTheDocument()
    expect(within(activePanel).getByText("Traffic mix")).toBeInTheDocument()
    expect(within(activePanel).queryByText("Workspace administration")).not.toBeInTheDocument()
    expect(within(activePanel).queryByText("Launch narrative workspace")).not.toBeInTheDocument()
  })

  it("switches preview scenes with accessible tab semantics", async () => {
    const user = userEvent.setup()

    render(<CustomizationApp />)

    const previewRegion = screen.getByRole("complementary", { name: /preview/i })
    const tablist = screen.getByRole("tablist", { name: /preview scenes/i })
    const overviewTab = within(tablist).getByRole("tab", { name: /dashboard/i })
    const settingsTab = within(tablist).getByRole("tab", { name: /settings/i })
    const contentTab = within(tablist).getByRole("tab", { name: /content/i })

    expect(screen.getByRole("tabpanel", { name: /dashboard/i })).toBeInTheDocument()

    await user.click(settingsTab)

    expect(overviewTab).toHaveAttribute("aria-selected", "false")
    expect(settingsTab).toHaveAttribute("aria-selected", "true")
    expect(contentTab).toHaveAttribute("aria-selected", "false")
    expect(screen.getByRole("tabpanel", { name: /settings/i })).toBeInTheDocument()
    expect(screen.getByText("Workspace administration")).toBeInTheDocument()
    expect(screen.getByText("Connected destinations")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /save changes/i })).toBeInTheDocument()
    expect(screen.queryByText("Revenue command center")).not.toBeInTheDocument()

    await user.click(contentTab)

    expect(settingsTab).toHaveAttribute("aria-selected", "false")
    expect(contentTab).toHaveAttribute("aria-selected", "true")
    expect(screen.getByRole("tabpanel", { name: /content/i })).toBeInTheDocument()
    expect(screen.getByText("Launch narrative workspace")).toBeInTheDocument()
    expect(screen.getByText("Publishing queue")).toBeInTheDocument()
    expect(screen.getByRole("article", { name: /review checklist sample/i })).toBeInTheDocument()
  })

  it("persists customized tokens, preview mode, active scene, and presets in local storage", async () => {
    const user = userEvent.setup()

    const { unmount } = render(<CustomizationApp />)

    fireEvent.change(screen.getByRole("textbox", { name: "Background" }), {
      target: { value: "rgba(12, 34, 56, 0.7)" },
    })
    await user.click(screen.getByRole("button", { name: "Dark" }))
    await user.click(screen.getByRole("button", { name: /select theme/i }))
    await user.click(
      within(screen.getByLabelText("Themes")).getByRole("button", { name: /cosmic night/i }),
    )
    fireEvent.change(screen.getByRole("textbox", { name: "Border" }), {
      target: { value: "rgba(90, 87, 210, 0.3)" },
    })
    await user.click(screen.getByRole("tab", { name: "Other" }))
    fireEvent.change(screen.getByRole("textbox", { name: "Radius medium" }), {
      target: { value: "1.25" },
    })
    await user.click(screen.getByRole("tab", { name: /content/i }))

    expect(readPersistedEditorState("light")).toMatchObject({
      previewMode: "dark",
      activeScene: "content",
      activePreset: {
        light: null,
        dark: null,
      },
    })

    unmount()
    render(<CustomizationApp />)

    expect(screen.getByTestId("preview-scope")).toHaveAttribute("data-preview-mode", "dark")
    expect(screen.getByRole("tab", { name: /content/i })).toHaveAttribute("aria-selected", "true")
    expect(screen.getByRole("textbox", { name: "Border" })).toHaveValue("rgba(90, 87, 210, 0.3)")
    expect(screen.getByRole("button", { name: "Select theme: Default" })).toBeInTheDocument()

    await user.click(screen.getByRole("button", { name: "Light" }))

    expect(screen.getByRole("textbox", { name: "Background" })).toHaveValue("rgba(12, 34, 56, 0.7)")

    await user.click(screen.getByRole("tab", { name: "Other" }))

    expect(screen.getByRole("textbox", { name: "Radius medium" })).toHaveValue("1.25")
  })

  it("falls back to defaults when persisted customization storage is corrupted", () => {
    localStorage.setItem(CUSTOMIZATION_STORAGE_KEY, "{not-json")

    render(<CustomizationApp />)

    expect(screen.getByRole("textbox", { name: "Background" })).toHaveValue(
      DEFAULT_LIGHT_TOKENS["--glass-bg"],
    )
    expect(screen.getByTestId("preview-scope")).toHaveAttribute("data-preview-mode", "light")
  })

  it("migrates legacy persisted preset ids to the default preset tokens", async () => {
    const user = userEvent.setup()

    localStorage.setItem(
      CUSTOMIZATION_STORAGE_KEY,
      JSON.stringify({
        version: 1,
        light: {
          ...DEFAULT_LIGHT_TOKENS,
          "--glass-bg": "rgba(255, 255, 255, 0.35)",
        },
        dark: {
          ...DEFAULT_DARK_TOKENS,
          "--glass-bg": "rgba(17, 24, 39, 0.92)",
        },
        radius: DEFAULT_RADIUS_TOKENS,
        previewMode: "light",
        activeScene: "overview",
        activePreset: {
          light: "soft",
          dark: "strong",
        },
      }),
    )

    render(<CustomizationApp />)

    expect(screen.getByRole("button", { name: "Select theme: Default" })).toBeInTheDocument()
    expect(screen.getByRole("textbox", { name: "Background" })).toHaveValue(
      DEFAULT_LIGHT_TOKENS["--glass-bg"],
    )

    await user.click(screen.getByRole("button", { name: "Dark" }))

    expect(screen.getByRole("textbox", { name: "Background" })).toHaveValue(
      DEFAULT_DARK_TOKENS["--glass-bg"],
    )
    expect(readPersistedEditorState("light")?.activePreset).toEqual({
      light: "default",
      dark: "default",
    })
  })

  it("normalizes invalid persisted preset ids to default before reuse", () => {
    localStorage.setItem(
      CUSTOMIZATION_STORAGE_KEY,
      JSON.stringify({
        version: 1,
        light: {
          ...DEFAULT_LIGHT_TOKENS,
          "--accent": "#ff00aa",
        },
        dark: DEFAULT_DARK_TOKENS,
        radius: DEFAULT_RADIUS_TOKENS,
        previewMode: "light",
        activeScene: "overview",
        activePreset: {
          light: "totally-invalid",
          dark: null,
        },
      }),
    )

    render(<CustomizationApp />)

    expect(screen.getByRole("button", { name: "Select theme: Default" })).toBeInTheDocument()
    expect(screen.getByRole("textbox", { name: "Accent" })).toHaveValue(
      DEFAULT_LIGHT_TOKENS["--accent"],
    )
    expect(readPersistedEditorState("light")?.activePreset).toEqual({
      light: "default",
      dark: null,
    })
  })

  it("returns null when localStorage is unavailable", () => {
    const originalDescriptor = Object.getOwnPropertyDescriptor(window, "localStorage")

    Object.defineProperty(window, "localStorage", {
      configurable: true,
      get() {
        throw new Error("blocked")
      },
    })

    try {
      expect(readPersistedEditorState("light")).toBeNull()
    } finally {
      if (originalDescriptor) {
        Object.defineProperty(window, "localStorage", originalDescriptor)
      }
    }
  })

  it("renders and applies preview theme changes when localStorage is unavailable", () => {
    const originalDescriptor = Object.getOwnPropertyDescriptor(window, "localStorage")

    Object.defineProperty(window, "localStorage", {
      configurable: true,
      get() {
        throw new Error("blocked")
      },
    })

    try {
      render(<CustomizationApp />)

      expect(screen.getByRole("textbox", { name: "Background" })).toHaveValue(
        DEFAULT_LIGHT_TOKENS["--glass-bg"],
      )
      expect(screen.getByTestId("preview-scope")).toHaveAttribute("data-preview-mode", "light")

      fireEvent.click(screen.getByRole("button", { name: "Dark" }))

      expect(document.documentElement.className).toBe("dark")
      expect(document.documentElement.style.colorScheme).toBe("dark")
      expect(screen.getByTestId("preview-scope")).toHaveAttribute("data-preview-mode", "dark")
    } finally {
      if (originalDescriptor) {
        Object.defineProperty(window, "localStorage", originalDescriptor)
      }
    }
  })

  it("updates the active preview scene immediately for token edits and preview-mode switches", async () => {
    const user = userEvent.setup()

    render(<CustomizationApp />)

    await user.click(screen.getByRole("tab", { name: /content/i }))

    const defaultSample = screen.getByRole("article", { name: /review checklist sample/i })

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

    const defaultSample = screen.getByRole("article", { name: /review checklist sample/i })

    await user.click(screen.getByRole("button", { name: /select theme/i }))
    await user.click(
      within(screen.getByLabelText("Themes")).getByRole("button", { name: /midnight bloom/i }),
    )

    expect(screen.getByRole("textbox", { name: "Background" })).toHaveValue(
      "rgba(245, 240, 255, 0.84)",
    )
    expect(
      within(defaultSample).getByText("Background rgba(245, 240, 255, 0.84)"),
    ).toBeInTheDocument()
    expect(within(defaultSample).getByText("Blur 16px")).toBeInTheDocument()

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
    await user.click(
      within(screen.getByLabelText("Themes")).getByRole("button", { name: /clean slate/i }),
    )

    expect(screen.getByRole("button", { name: "Select theme: Clean Slate" })).toBeInTheDocument()

    await user.click(screen.getByRole("button", { name: "Dark" }))

    expect(screen.getByRole("button", { name: "Select theme: Default" })).toBeInTheDocument()

    await user.click(screen.getByRole("button", { name: /select theme/i }))
    await user.click(
      within(screen.getByLabelText("Themes")).getByRole("button", { name: /cosmic night/i }),
    )

    expect(screen.getByRole("button", { name: "Select theme: Cosmic Night" })).toBeInTheDocument()

    await user.click(screen.getByRole("button", { name: "Light" }))

    expect(screen.getByRole("button", { name: "Select theme: Clean Slate" })).toBeInTheDocument()
  })

  it("resets the active preset for the current mode when a token is edited manually", async () => {
    const user = userEvent.setup()

    render(<CustomizationApp />)

    await user.click(screen.getByRole("button", { name: /select theme/i }))
    await user.click(
      within(screen.getByLabelText("Themes")).getByRole("button", { name: /graphite/i }),
    )

    expect(screen.getByRole("button", { name: "Select theme: Graphite" })).toBeInTheDocument()

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

    expect(within(tablist).getByRole("tab", { name: /dashboard/i })).toHaveAttribute(
      "aria-selected",
      "true",
    )
    expect(within(previewRegion).getByRole("tabpanel", { name: /dashboard/i })).toBeInTheDocument()

    await user.type(screen.getByRole("searchbox", { name: /search colors/i }), "accent")
    await user.click(screen.getByRole("tab", { name: /settings/i }))

    expect(within(tablist).getByRole("tab", { name: /settings/i })).toHaveAttribute(
      "aria-selected",
      "true",
    )
    expect(within(previewRegion).getByRole("tabpanel", { name: /settings/i })).toBeInTheDocument()
  })

  it("switches preview scenes with keyboard navigation in the workspace toolbar", async () => {
    const user = userEvent.setup()

    render(<CustomizationApp />)

    const previewRegion = screen.getByRole("complementary", { name: /preview/i })
    const tablist = screen.getByRole("tablist", { name: /preview scenes/i })
    const dashboardTab = within(tablist).getByRole("tab", { name: /dashboard/i })

    dashboardTab.focus()
    await user.keyboard("{ArrowRight}")

    const settingsTab = within(tablist).getByRole("tab", { name: /settings/i })

    expect(settingsTab).toHaveFocus()
    expect(settingsTab).toHaveAttribute("aria-selected", "true")
    expect(within(previewRegion).getByRole("tabpanel", { name: /settings/i })).toBeInTheDocument()

    await user.keyboard("{ArrowLeft}")

    expect(dashboardTab).toHaveFocus()
    expect(dashboardTab).toHaveAttribute("aria-selected", "true")
    expect(within(previewRegion).getByRole("tabpanel", { name: /dashboard/i })).toBeInTheDocument()

    await user.keyboard("{ArrowUp}")

    const contentTab = within(tablist).getByRole("tab", { name: /content/i })

    expect(contentTab).toHaveFocus()
    expect(contentTab).toHaveAttribute("aria-selected", "true")
    expect(within(previewRegion).getByRole("tabpanel", { name: /content/i })).toBeInTheDocument()

    await user.keyboard("{Home}")

    expect(dashboardTab).toHaveFocus()
    expect(dashboardTab).toHaveAttribute("aria-selected", "true")
    expect(within(previewRegion).getByRole("tabpanel", { name: /dashboard/i })).toBeInTheDocument()

    await user.keyboard("{End}")

    expect(contentTab).toHaveFocus()
    expect(contentTab).toHaveAttribute("aria-selected", "true")
    expect(within(previewRegion).getByRole("tabpanel", { name: /content/i })).toBeInTheDocument()
  })

  it("switches fullscreen preview scenes with keyboard navigation", async () => {
    const user = userEvent.setup()

    render(<CustomizationApp />)

    await user.click(screen.getByRole("button", { name: /enter fullscreen preview/i }))

    const dialog = screen.getByRole("dialog", { name: /fullscreen preview/i })
    const previewRegion = within(dialog).getByRole("complementary", { name: /preview/i })
    const tablist = within(dialog).getByRole("tablist", { name: /preview scenes/i })
    const dashboardTab = within(tablist).getByRole("tab", { name: /dashboard/i })

    dashboardTab.focus()
    await user.keyboard("{End}")

    const contentTab = within(tablist).getByRole("tab", { name: /content/i })

    expect(contentTab).toHaveFocus()
    expect(contentTab).toHaveAttribute("aria-selected", "true")
    expect(within(previewRegion).getByRole("tabpanel", { name: /content/i })).toBeInTheDocument()

    await user.keyboard("{Home}")

    expect(dashboardTab).toHaveFocus()
    expect(dashboardTab).toHaveAttribute("aria-selected", "true")
    expect(within(previewRegion).getByRole("tabpanel", { name: /dashboard/i })).toBeInTheDocument()

    await user.keyboard("{ArrowDown}")

    const settingsTab = within(tablist).getByRole("tab", { name: /settings/i })

    expect(settingsTab).toHaveFocus()
    expect(settingsTab).toHaveAttribute("aria-selected", "true")
    expect(within(previewRegion).getByRole("tabpanel", { name: /settings/i })).toBeInTheDocument()

    await user.keyboard("{ArrowLeft}")

    expect(dashboardTab).toHaveFocus()
    expect(dashboardTab).toHaveAttribute("aria-selected", "true")
    expect(within(previewRegion).getByRole("tabpanel", { name: /dashboard/i })).toBeInTheDocument()
  })

  it("keeps visible preview tab aria-controls references pointed at existing panels", async () => {
    const user = userEvent.setup()

    render(<CustomizationApp />)

    const workspaceTablist = screen.getByRole("tablist", { name: /preview scenes/i })

    for (const tab of within(workspaceTablist).getAllByRole("tab")) {
      const controlsId = tab.getAttribute("aria-controls")

      expect(controlsId).toBeTruthy()
      expect(document.getElementById(controlsId ?? "")).not.toBeNull()
    }

    await user.click(screen.getByRole("button", { name: /enter fullscreen preview/i }))

    const dialog = screen.getByRole("dialog", { name: /fullscreen preview/i })
    const fullscreenTablist = within(dialog).getByRole("tablist", { name: /preview scenes/i })

    for (const tab of within(fullscreenTablist).getAllByRole("tab")) {
      const controlsId = tab.getAttribute("aria-controls")

      expect(controlsId).toBeTruthy()
      expect(document.getElementById(controlsId ?? "")).not.toBeNull()
    }
  })

  it("uses unique preview tab and panel ids across workspace and fullscreen", async () => {
    const user = userEvent.setup()

    render(<CustomizationApp />)

    await user.click(screen.getByRole("button", { name: /enter fullscreen preview/i }))

    const ids = Array.from(document.querySelectorAll<HTMLElement>("[id]"))
      .map((element) => element.id)
      .filter((id) => id.includes("preview-tab-") || id.includes("preview-panel-"))

    expect(new Set(ids).size).toBe(ids.length)
  })

  it("announces copy feedback in a live region", async () => {
    const user = userEvent.setup()

    render(<CustomizationApp />)

    await user.click(screen.getByRole("button", { name: /copy export/i }))

    expect(screen.getByRole("status")).toHaveTextContent("CSS export copied to clipboard.")
  })

  it("downloads the current configuration as JSON", async () => {
    const user = userEvent.setup()
    const clickSpy = vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(() => {})
    const createObjectURLSpy = vi.mocked(URL.createObjectURL)

    render(<CustomizationApp />)

    fireEvent.change(screen.getByRole("textbox", { name: "Background" }), {
      target: { value: "rgba(12, 34, 56, 0.7)" },
    })

    await user.click(screen.getByRole("button", { name: /download configuration/i }))

    expect(createObjectURLSpy).toHaveBeenCalledTimes(1)

    const blob = createObjectURLSpy.mock.calls[0]?.[0]
    expect(blob).toBeInstanceOf(Blob)
    expect(clickSpy).toHaveBeenCalledTimes(1)

    const exportedText = await (blob as Blob).text()
    const parsedConfig = parseCustomizationConfig(exportedText)

    expect(parsedConfig).toEqual(
      expect.objectContaining({
        ok: true,
      }),
    )
    expect(exportedText).toContain('"previewMode": "light"')
    expect(exportedText).toContain('"--glass-bg": "rgba(12, 34, 56, 0.7)"')
    expect(screen.getByRole("status")).toHaveTextContent("Configuration JSON downloaded.")

    clickSpy.mockRestore()
  })

  it("imports a customization config and restores editor state", async () => {
    const user = userEvent.setup()

    render(<CustomizationApp />)

    await user.click(screen.getByRole("button", { name: /import configuration/i }))
    fireEvent.change(screen.getByRole("textbox", { name: /customization config json/i }), {
      target: {
        value: JSON.stringify({
          version: 1,
          light: {
            ...DEFAULT_LIGHT_TOKENS,
            "--accent": "#123456",
          },
          dark: {
            ...DEFAULT_DARK_TOKENS,
            "--glass-bg": "rgba(17, 24, 39, 0.92)",
          },
          radius: {
            ...DEFAULT_RADIUS_TOKENS,
            "--glass-radius-md": "1.25rem",
          },
          editor: {
            previewMode: "dark",
            activeScene: "content",
            activePreset: {
              light: null,
              dark: null,
            },
          },
        }),
      },
    })

    await user.click(screen.getByRole("button", { name: /apply import/i }))

    expect(screen.getByRole("status")).toHaveTextContent("Configuration imported.")
    expect(
      screen.queryByRole("textbox", { name: /customization config json/i }),
    ).not.toBeInTheDocument()
    expect(screen.getByTestId("preview-scope")).toHaveAttribute("data-preview-mode", "dark")
    expect(screen.getByRole("tab", { name: /content/i })).toHaveAttribute("aria-selected", "true")
    expect(screen.getByRole("textbox", { name: "Border" })).toHaveValue("rgba(255, 255, 255, 0.1)")
    expect(screen.getByRole("button", { name: "Select theme: Default" })).toBeInTheDocument()

    await user.click(screen.getByRole("button", { name: "Light" }))
    expect(screen.getByRole("textbox", { name: "Accent" })).toHaveValue("#123456")

    await user.click(screen.getByRole("tab", { name: "Other" }))
    expect(screen.getByRole("textbox", { name: "Radius medium" })).toHaveValue("1.25")
  })

  it("shows an error for invalid imported config without crashing", async () => {
    const user = userEvent.setup()

    render(<CustomizationApp />)

    await user.click(screen.getByRole("button", { name: /import configuration/i }))
    fireEvent.change(screen.getByRole("textbox", { name: /customization config json/i }), {
      target: { value: "{oops" },
    })
    await user.click(screen.getByRole("button", { name: /apply import/i }))

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Invalid JSON. Paste a valid customization config.",
    )
    expect(screen.getByRole("textbox", { name: "Background" })).toHaveValue(
      DEFAULT_LIGHT_TOKENS["--glass-bg"],
    )
  })

  it("renders toolbar actions, controls, and preview region reachable on a narrow viewport", () => {
    window.innerWidth = 375

    render(<CustomizationApp />)

    expect(screen.getByRole("region", { name: /customization workspace/i })).toBeInTheDocument()
    expect(screen.getByRole("toolbar", { name: /customization actions/i })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Light" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Dark" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /enter fullscreen preview/i })).toBeInTheDocument()
    expect(screen.getByRole("region", { name: /token controls/i })).toBeInTheDocument()
    expect(screen.getByRole("complementary", { name: /preview/i })).toBeInTheDocument()
    expect(screen.getByRole("tablist", { name: /preview scenes/i })).toBeInTheDocument()
    expect(screen.getByRole("textbox", { name: "Foreground" })).toBeInTheDocument()
    expect(screen.getByRole("tab", { name: /dashboard/i })).toBeInTheDocument()
  })
})

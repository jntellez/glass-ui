import { fireEvent, render, screen, waitFor, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeEach, describe, expect, it, vi } from "vitest"
import {
  CANONICAL_TOKEN_ORDER,
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

    const glassBgInput = screen.getByLabelText("--glass-bg") as HTMLInputElement
    const foregroundInput = screen.getByLabelText("--foreground") as HTMLInputElement
    const previewScope = screen.getByTestId("preview-scope")

    expect(screen.getByText("Preview mode: dark")).toBeInTheDocument()
    expect(glassBgInput.value).toBe(DEFAULT_DARK_TOKENS["--glass-bg"])
    expect(foregroundInput.value).toBe(DEFAULT_DARK_TOKENS["--foreground"])
    expect(previewScope).toHaveAttribute("data-preview-mode", "dark")
  })

  it("updates only the edited token in the active mode", () => {
    render(<CustomizationApp />)

    const glassBgInput = screen.getByLabelText("--glass-bg") as HTMLInputElement
    const glassBorderInput = screen.getByLabelText("--glass-border") as HTMLInputElement

    fireEvent.change(glassBgInput, { target: { value: "rgba(12, 34, 56, 0.7)" } })

    expect(glassBgInput.value).toBe("rgba(12, 34, 56, 0.7)")
    expect(glassBorderInput.value).toBe(DEFAULT_LIGHT_TOKENS["--glass-border"])
  })

  it("applies radius edits across both preview themes because radius is shared", async () => {
    const user = userEvent.setup()

    render(<CustomizationApp />)

    const radiusInput = screen.getByLabelText("--glass-radius-xl") as HTMLInputElement
    const previewScope = screen.getByTestId("preview-scope")

    fireEvent.change(radiusInput, { target: { value: "2rem" } })

    expect(radiusInput.value).toBe("2rem")
    expect(previewScope.style.getPropertyValue("--radius-glass-xl")).toBe("2rem")

    await user.click(screen.getByRole("button", { name: /dark preview/i }))

    expect((screen.getByLabelText("--glass-radius-xl") as HTMLInputElement).value).toBe("2rem")
    expect(previewScope.style.getPropertyValue("--radius-glass-xl")).toBe("2rem")
  })

  it("resets edited values back to canonical defaults", () => {
    render(<CustomizationApp />)

    const glassBgInput = screen.getByLabelText("--glass-bg") as HTMLInputElement

    fireEvent.change(glassBgInput, { target: { value: "rgba(12, 34, 56, 0.7)" } })
    fireEvent.click(screen.getByRole("button", { name: /reset/i }))

    expect(glassBgInput.value).toBe(DEFAULT_LIGHT_TOKENS["--glass-bg"])
  })

  it("updates the global document theme when the toolbar theme changes", () => {
    render(<CustomizationApp />)

    fireEvent.click(screen.getByRole("button", { name: /dark preview/i }))

    const glassBgInput = screen.getByLabelText("--glass-bg") as HTMLInputElement
    const previewScope = screen.getByTestId("preview-scope")

    expect(screen.getByText("Preview mode: dark")).toBeInTheDocument()
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

    await user.click(screen.getByRole("button", { name: /light preview/i }))

    expect(previewScope).toHaveAttribute("data-preview-mode", "light")
    expect(document.documentElement.className).toBe("light")
    expect(document.documentElement.style.colorScheme).toBe("light")
    expect(localStorage.getItem("theme")).toBe("light")
  })

  it("copies the deterministic css export for the current editor state", async () => {
    const user = userEvent.setup()
    const writeTextSpy = vi.spyOn(navigator.clipboard, "writeText")

    render(<CustomizationApp />)

    fireEvent.change(screen.getByLabelText("--glass-bg"), {
      target: { value: "rgba(12, 34, 56, 0.7)" },
    })
    fireEvent.click(screen.getByRole("button", { name: /dark preview/i }))
    fireEvent.change(screen.getByLabelText("--glass-border"), {
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

  it("renders only the canonical token controls inside the named controls region", () => {
    render(<CustomizationApp />)

    const controlsRegion = screen.getByRole("region", { name: /token controls/i })
    const tokenInputs = within(controlsRegion).getAllByRole("textbox")
    const tokenRows = within(controlsRegion).getAllByRole("listitem")

    expect(tokenInputs).toHaveLength(CANONICAL_TOKEN_ORDER.length)
    expect(tokenRows).toHaveLength(CANONICAL_TOKEN_ORDER.length)

    for (const group of ["Text", "Accent", "Base glass", "Shadows", "Radius", "Variant tokens"]) {
      expect(within(controlsRegion).getByRole("heading", { name: group })).toBeInTheDocument()
    }

    for (const token of CANONICAL_TOKEN_ORDER) {
      expect(within(controlsRegion).getByRole("textbox", { name: token })).toBeInTheDocument()
      expect(within(controlsRegion).getByText(token)).toBeInTheDocument()
    }

    expect(
      within(controlsRegion).queryByRole("textbox", { name: "--background" }),
    ).not.toBeInTheDocument()
  })

  it("shows accent controls and updates preview samples with accent tokens in the active mode", async () => {
    const user = userEvent.setup()

    render(<CustomizationApp />)

    expect(screen.getByRole("textbox", { name: "--accent" })).toHaveValue("#d946ef")
    expect(screen.getByRole("textbox", { name: "--accent-foreground" })).toHaveValue("#ffffff")

    await user.click(screen.getByRole("tab", { name: /content/i }))

    const defaultSample = screen.getByRole("article", { name: /default sample/i })

    expect(within(defaultSample).getByText("Accent #d946ef")).toBeInTheDocument()
    expect(within(defaultSample).getByText("Accent foreground #ffffff")).toBeInTheDocument()

    fireEvent.change(screen.getByLabelText("--accent"), { target: { value: "#8b5cf6" } })
    fireEvent.change(screen.getByLabelText("--accent-foreground"), { target: { value: "#faf5ff" } })

    expect(within(defaultSample).getByText("Accent #8b5cf6")).toBeInTheDocument()
    expect(within(defaultSample).getByText("Accent foreground #faf5ff")).toBeInTheDocument()

    await user.click(screen.getByRole("button", { name: /dark preview/i }))

    expect(within(defaultSample).getByText("Accent #c084fc")).toBeInTheDocument()
    expect(within(defaultSample).getByText("Accent foreground #18181b")).toBeInTheDocument()
  })

  it("filters token rows to matching controls and hides empty groups", async () => {
    const user = userEvent.setup()

    render(<CustomizationApp />)

    const controlsRegion = screen.getByRole("region", { name: /token controls/i })

    await user.type(screen.getByRole("searchbox", { name: /filter tokens/i }), "shadow")

    const visibleRows = within(controlsRegion).getAllByRole("listitem")

    expect(visibleRows).toHaveLength(4)
    expect(within(controlsRegion).getByRole("heading", { name: /base glass/i })).toBeInTheDocument()
    expect(within(controlsRegion).getByRole("heading", { name: /shadows/i })).toBeInTheDocument()
    expect(within(controlsRegion).queryByRole("heading", { name: /text/i })).not.toBeInTheDocument()
    expect(
      within(controlsRegion).queryByRole("heading", { name: /radius/i }),
    ).not.toBeInTheDocument()
    expect(
      within(controlsRegion).getByRole("textbox", { name: "--glass-shadow" }),
    ).toBeInTheDocument()
    expect(
      within(controlsRegion).getByRole("textbox", { name: "--glass-shadow-lg" }),
    ).toBeInTheDocument()
    expect(
      within(controlsRegion).queryByRole("textbox", { name: "--foreground" }),
    ).not.toBeInTheDocument()
  })

  it("preserves edited token values when non-matching rows are filtered out", async () => {
    const user = userEvent.setup()

    render(<CustomizationApp />)

    const glassBackgroundInput = screen.getByRole("textbox", { name: "--glass-bg" })

    await user.clear(glassBackgroundInput)
    await user.type(glassBackgroundInput, "rgba(12, 34, 56, 0.7)")
    await user.type(screen.getByRole("searchbox", { name: /filter tokens/i }), "foreground")

    expect(screen.queryByRole("textbox", { name: "--glass-bg" })).not.toBeInTheDocument()

    await user.clear(screen.getByRole("searchbox", { name: /filter tokens/i }))

    expect(screen.getByRole("textbox", { name: "--glass-bg" })).toHaveValue("rgba(12, 34, 56, 0.7)")
  })

  it("keeps toolbar actions and token inputs keyboard reachable with stable names", async () => {
    const user = userEvent.setup()

    render(<CustomizationApp />)

    const workspace = screen.getByRole("region", { name: /customization workspace/i })
    const toolbar = within(workspace).getByRole("toolbar", { name: /customization actions/i })

    expect(toolbar).toHaveAttribute("data-sticky", "desktop")
    expect(within(toolbar).getByRole("group", { name: /preview theme/i })).toBeInTheDocument()
    expect(within(toolbar).getByRole("group", { name: /presets/i })).toBeInTheDocument()
    expect(within(toolbar).getByRole("group", { name: /editor actions/i })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /light preview/i })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /dark preview/i })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /apply soft variant/i })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /apply strong variant/i })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /^reset$/i })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /copy export/i })).toBeInTheDocument()

    await user.tab()
    expect(screen.getByRole("button", { name: /light preview/i })).toHaveFocus()

    await user.tab()
    expect(screen.getByRole("button", { name: /dark preview/i })).toHaveFocus()

    await user.tab()
    expect(screen.getByRole("button", { name: /apply soft variant/i })).toHaveFocus()

    await user.tab()
    expect(screen.getByRole("button", { name: /apply strong variant/i })).toHaveFocus()

    await user.tab()
    expect(screen.getByRole("button", { name: /^reset$/i })).toHaveFocus()

    await user.tab()
    expect(screen.getByRole("button", { name: /copy export/i })).toHaveFocus()

    await user.tab()
    expect(screen.getByRole("searchbox", { name: /filter tokens/i })).toHaveFocus()

    await user.tab()
    expect(screen.getByRole("textbox", { name: "--foreground" })).toHaveFocus()
  })

  it("describes which preview mode is currently active", async () => {
    const user = userEvent.setup()

    render(<CustomizationApp />)

    expect(screen.getByText("Preview mode: light")).toBeInTheDocument()

    await user.click(screen.getByRole("button", { name: /dark preview/i }))

    expect(screen.getByText("Preview mode: dark")).toBeInTheDocument()
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

    await user.click(screen.getByRole("button", { name: /dark preview/i }))

    expect(within(defaultSample).getByText(DEFAULT_DARK_TOKENS["--glass-bg"])).toBeInTheDocument()
    expect(within(softSample).getByText(DEFAULT_DARK_TOKENS["--glass-bg-soft"])).toBeInTheDocument()
    expect(
      within(strongSample).getByText(DEFAULT_DARK_TOKENS["--glass-bg-strong"]),
    ).toBeInTheDocument()
  })

  it("renders a richer preview canvas with representative glass-ui surfaces", () => {
    render(<CustomizationApp />)

    const previewRegion = screen.getByRole("complementary", { name: /preview/i })
    const tablist = within(previewRegion).getByRole("tablist", { name: /preview scenes/i })
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
    const overviewTab = within(previewRegion).getByRole("tab", { name: /overview/i })
    const componentsTab = within(previewRegion).getByRole("tab", { name: /components/i })
    const contentTab = within(previewRegion).getByRole("tab", { name: /content/i })

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

    fireEvent.change(screen.getByLabelText("--glass-bg"), {
      target: { value: "rgba(12, 34, 56, 0.7)" },
    })

    expect(within(defaultSample).getByText("Background rgba(12, 34, 56, 0.7)")).toBeInTheDocument()

    await user.click(screen.getByRole("button", { name: /dark preview/i }))

    expect(
      within(defaultSample).getByText(`Background ${DEFAULT_DARK_TOKENS["--glass-bg"]}`),
    ).toBeInTheDocument()

    await user.click(screen.getByRole("button", { name: /apply strong variant/i }))

    expect(
      within(defaultSample).getByText(`Background ${DEFAULT_DARK_TOKENS["--glass-bg-strong"]}`),
    ).toBeInTheDocument()
    expect(
      within(defaultSample).getByText(`Blur ${DEFAULT_DARK_TOKENS["--glass-blur-strong"]}`),
    ).toBeInTheDocument()
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

    fireEvent.change(screen.getByLabelText("--foreground"), { target: { value: "#102030" } })
    fireEvent.change(screen.getByLabelText("--muted-foreground"), { target: { value: "#405060" } })
    fireEvent.change(screen.getByLabelText("--glass-bg"), {
      target: { value: "rgba(12, 34, 56, 0.7)" },
    })
    fireEvent.change(screen.getByLabelText("--glass-shadow"), {
      target: { value: "0 0 0 1px rgba(255, 0, 0, 0.4)" },
    })
    fireEvent.change(screen.getByLabelText("--glass-radius-xl"), { target: { value: "2rem" } })

    expect(previewScope.style.getPropertyValue("--color-foreground")).toBe("#102030")
    expect(previewScope.style.getPropertyValue("--color-muted-foreground")).toBe("#405060")
    expect(previewScope.style.getPropertyValue("--color-glass-bg")).toBe("rgba(12, 34, 56, 0.7)")
    expect(previewScope.style.getPropertyValue("--shadow-glass")).toBe(
      "0 0 0 1px rgba(255, 0, 0, 0.4)",
    )
    expect(previewScope.style.getPropertyValue("--radius-glass-xl")).toBe("2rem")

    await user.click(screen.getByRole("button", { name: /dark preview/i }))

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

    expect(within(previewRegion).getByRole("tab", { name: /overview/i })).toHaveAttribute(
      "aria-selected",
      "true",
    )
    expect(within(previewRegion).getByRole("tabpanel", { name: /overview/i })).toBeInTheDocument()

    await user.type(screen.getByRole("searchbox", { name: /filter tokens/i }), "shadow")
    await user.click(screen.getByRole("tab", { name: /components/i }))

    expect(within(previewRegion).getByRole("tab", { name: /components/i })).toHaveAttribute(
      "aria-selected",
      "true",
    )
    expect(within(previewRegion).getByRole("tabpanel", { name: /components/i })).toBeInTheDocument()
  })

  it("keeps copy feedback inside the editor actions group", async () => {
    const user = userEvent.setup()

    render(<CustomizationApp />)

    const toolbar = screen.getByRole("toolbar", { name: /customization actions/i })
    const editorActions = within(toolbar).getByRole("group", { name: /editor actions/i })

    await user.click(within(editorActions).getByRole("button", { name: /copy export/i }))

    expect(within(editorActions).getByRole("status")).toHaveTextContent(
      "CSS export copied to clipboard.",
    )
  })

  it("keeps toolbar actions, controls, and preview region reachable on a narrow viewport", () => {
    window.innerWidth = 375

    render(<CustomizationApp />)

    expect(screen.getByRole("region", { name: /customization workspace/i })).toBeInTheDocument()
    expect(screen.getByRole("toolbar", { name: /customization actions/i })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /light preview/i })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /dark preview/i })).toBeInTheDocument()
    expect(screen.getByRole("region", { name: /token controls/i })).toBeInTheDocument()
    expect(screen.getByRole("complementary", { name: /preview/i })).toBeInTheDocument()
    expect(screen.getByRole("tablist", { name: /preview scenes/i })).toBeInTheDocument()
    expect(screen.getByRole("textbox", { name: "--foreground" })).toBeInTheDocument()
    expect(screen.getByRole("tab", { name: /overview/i })).toBeInTheDocument()
  })
})

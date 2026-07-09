import * as React from "react"
import { createPortal } from "react-dom"
import {
  DEFAULT_DARK_TOKENS,
  DEFAULT_LIGHT_TOKENS,
  DEFAULT_RADIUS_TOKENS,
  getEditorTokenValues,
  isRadiusToken,
  type RadiusTokenValues,
  type TokenName,
  type ThemeTokenValues,
} from "./customization-tokens"
import { serializeCss } from "./export-css"
import { CustomizationToolbar, type PreviewMode } from "./CustomizationToolbar"
import { TokenControlsPanel } from "./TokenControlsPanel"
import { PreviewPanel } from "./PreviewPanel"
import type { PreviewSceneId } from "./preview-scenes"
import { applyTheme, getInitialResolvedTheme, subscribeToThemeChange } from "../theme/theme"
import { resolveThemePresetTokens } from "./theme-presets"
import {
  clearPersistedEditorState,
  persistEditorState,
  readPersistedEditorState,
} from "./customization-storage"
import {
  parseCustomizationConfig,
  serializeCustomizationConfig,
  type CustomizationConfigState,
} from "./customization-config"

interface EditorState {
  light: ThemeTokenValues
  dark: ThemeTokenValues
  radius: RadiusTokenValues
  previewMode: PreviewMode
  filterQuery: string
  activeScene: PreviewSceneId
  activePreset: { light: string | null; dark: string | null }
}

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",")

function getFocusableElements(container: HTMLElement) {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (element) => {
      if (element.hidden || element.closest("[hidden]")) {
        return false
      }

      return (
        element.tabIndex >= 0 &&
        !element.hasAttribute("disabled") &&
        element.getAttribute("aria-hidden") !== "true"
      )
    },
  )
}

function focusDialogElement(dialog: HTMLElement, direction: "forward" | "backward") {
  const focusableElements = getFocusableElements(dialog)

  if (focusableElements.length === 0) {
    dialog.focus()
    return
  }

  const targetElement =
    direction === "backward"
      ? focusableElements[focusableElements.length - 1]
      : focusableElements[0]

  targetElement.focus()
}

const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? React.useEffect : React.useLayoutEffect

function createInitialState(): EditorState {
  const previewMode = getInitialResolvedTheme()
  const persistedState = readPersistedEditorState(previewMode)

  if (persistedState) {
    return {
      light: persistedState.light,
      dark: persistedState.dark,
      radius: persistedState.radius,
      previewMode: persistedState.previewMode,
      filterQuery: "",
      activeScene: persistedState.activeScene,
      activePreset: persistedState.activePreset,
    }
  }

  return {
    light: { ...DEFAULT_LIGHT_TOKENS },
    dark: { ...DEFAULT_DARK_TOKENS },
    radius: { ...DEFAULT_RADIUS_TOKENS },
    previewMode,
    filterQuery: "",
    activeScene: "overview",
    activePreset: { light: "default", dark: "default" },
  }
}

export function CustomizationApp() {
  const [editorState, setEditorState] = React.useState<EditorState>(() => createInitialState())
  const [isFullscreenPreview, setIsFullscreenPreview] = React.useState(false)
  const workspaceRef = React.useRef<HTMLElement | null>(null)
  const fullscreenDialogRef = React.useRef<HTMLDivElement | null>(null)
  const lastFocusedElementRef = React.useRef<HTMLElement | null>(null)
  const lastTabDirectionRef = React.useRef<"forward" | "backward">("forward")
  const fullscreenPortalContainerRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    if (typeof document === "undefined") {
      return
    }

    const portalContainer = document.createElement("div")
    portalContainer.setAttribute("data-customization-fullscreen-portal", "")
    document.body.appendChild(portalContainer)
    fullscreenPortalContainerRef.current = portalContainer

    return () => {
      fullscreenPortalContainerRef.current = null
      portalContainer.remove()
    }
  }, [])

  const restoreLastFocusedElement = React.useCallback(() => {
    const lastFocusedElement = lastFocusedElementRef.current

    if (lastFocusedElement?.isConnected) {
      lastFocusedElement.focus()
    }

    lastFocusedElementRef.current = null
  }, [])

  React.useEffect(() => {
    if (getInitialResolvedTheme() !== editorState.previewMode) {
      applyTheme(editorState.previewMode)
    }
  }, [editorState.previewMode])

  React.useEffect(() => {
    return subscribeToThemeChange(({ resolvedTheme }) => {
      setEditorState((current) =>
        current.previewMode === resolvedTheme
          ? current
          : { ...current, previewMode: resolvedTheme },
      )
    })
  }, [])

  React.useEffect(() => {
    persistEditorState({
      light: editorState.light,
      dark: editorState.dark,
      radius: editorState.radius,
      previewMode: editorState.previewMode,
      activeScene: editorState.activeScene,
      activePreset: editorState.activePreset,
    })
  }, [
    editorState.activePreset,
    editorState.activeScene,
    editorState.dark,
    editorState.light,
    editorState.previewMode,
    editorState.radius,
  ])

  useIsomorphicLayoutEffect(() => {
    if (!isFullscreenPreview) {
      return
    }

    const dialog = fullscreenDialogRef.current

    if (!dialog) {
      return
    }

    focusDialogElement(dialog, "forward")

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault()
        setIsFullscreenPreview(false)
        return
      }

      if (event.key !== "Tab") {
        return
      }

      lastTabDirectionRef.current = event.shiftKey ? "backward" : "forward"

      const focusableElements = getFocusableElements(dialog)

      if (focusableElements.length === 0) {
        event.preventDefault()
        dialog.focus()
        return
      }

      const firstFocusableElement = focusableElements[0]
      const lastFocusableElement = focusableElements[focusableElements.length - 1]
      const activeElement = document.activeElement

      if (!activeElement || !dialog.contains(activeElement)) {
        event.preventDefault()
        focusDialogElement(dialog, lastTabDirectionRef.current)
        return
      }

      if (!event.shiftKey && activeElement === lastFocusableElement) {
        event.preventDefault()
        firstFocusableElement.focus()
        return
      }

      if (event.shiftKey && activeElement === firstFocusableElement) {
        event.preventDefault()
        lastFocusableElement.focus()
      }
    }

    const handleFocusIn = (event: FocusEvent) => {
      const target = event.target

      if (!(target instanceof Node) || dialog.contains(target)) {
        return
      }

      focusDialogElement(dialog, lastTabDirectionRef.current)
    }

    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("focusin", handleFocusIn)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("focusin", handleFocusIn)
    }
  }, [isFullscreenPreview])

  React.useEffect(() => {
    if (!isFullscreenPreview) {
      return
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isFullscreenPreview])

  React.useEffect(() => {
    const workspace = workspaceRef.current
    const portalContainer = fullscreenPortalContainerRef.current

    if (!workspace || !portalContainer || !isFullscreenPreview) {
      return
    }

    const affectedElements = Array.from(document.body.children).filter(
      (element) => element !== portalContainer,
    ) as HTMLElement[]

    const previousStates = affectedElements.map((element) => ({
      element,
      inert: element.inert,
      hasAriaHidden: element.hasAttribute("aria-hidden"),
      ariaHidden: element.getAttribute("aria-hidden"),
    }))

    for (const element of affectedElements) {
      element.inert = true
      element.setAttribute("aria-hidden", "true")
    }

    return () => {
      for (const previousState of previousStates) {
        previousState.element.inert = previousState.inert

        if (previousState.hasAriaHidden) {
          previousState.element.setAttribute("aria-hidden", previousState.ariaHidden ?? "true")
        } else {
          previousState.element.removeAttribute("aria-hidden")
        }
      }
    }
  }, [isFullscreenPreview])

  React.useEffect(() => {
    if (isFullscreenPreview) {
      return
    }

    restoreLastFocusedElement()
  }, [isFullscreenPreview, restoreLastFocusedElement])

  React.useEffect(() => restoreLastFocusedElement, [restoreLastFocusedElement])

  const activeValues = getEditorTokenValues(
    editorState[editorState.previewMode],
    editorState.radius,
  )

  const handleTokenChange = React.useCallback((token: TokenName, value: string) => {
    setEditorState((current) => {
      if (isRadiusToken(token)) {
        return {
          ...current,
          radius: {
            ...current.radius,
            [token]: value,
          },
        }
      }

      return {
        ...current,
        [current.previewMode]: {
          ...current[current.previewMode],
          [token]: value,
        },
        activePreset: {
          ...current.activePreset,
          [current.previewMode]: null,
        },
      }
    })
  }, [])

  const handleReset = React.useCallback(() => {
    clearPersistedEditorState()
    setEditorState(createInitialState())
  }, [])

  const handlePreviewModeChange = React.useCallback((previewMode: PreviewMode) => {
    applyTheme(previewMode)
    setEditorState((current) => ({ ...current, previewMode }))
  }, [])

  const handlePresetChange = React.useCallback((presetId: string) => {
    setEditorState((current) => {
      const nextValues = resolveThemePresetTokens(presetId, current.previewMode)

      return {
        ...current,
        [current.previewMode]: nextValues,
        activePreset: {
          ...current.activePreset,
          [current.previewMode]: presetId,
        },
      }
    })
  }, [])

  const handleFilterQueryChange = React.useCallback((filterQuery: string) => {
    setEditorState((current) => ({ ...current, filterQuery }))
  }, [])

  const handleSceneChange = React.useCallback((activeScene: PreviewSceneId) => {
    setEditorState((current) => ({ ...current, activeScene }))
  }, [])

  const handleCopyExport = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(
        serializeCss(editorState.light, editorState.dark, editorState.radius),
      )
      return true
    } catch {
      return false
    }
  }, [editorState.dark, editorState.light, editorState.radius])

  const handleDownloadExport = React.useCallback(() => {
    if (typeof document === "undefined" || typeof URL.createObjectURL !== "function") {
      return false
    }

    try {
      const configState: CustomizationConfigState = {
        light: editorState.light,
        dark: editorState.dark,
        radius: editorState.radius,
        previewMode: editorState.previewMode,
        activeScene: editorState.activeScene,
        activePreset: editorState.activePreset,
      }
      const blob = new Blob([serializeCustomizationConfig(configState)], {
        type: "application/json;charset=utf-8",
      })
      const href = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = href
      link.download = "glass-ui-customization-config.json"
      link.click()
      URL.revokeObjectURL(href)
      return true
    } catch {
      return false
    }
  }, [
    editorState.activePreset,
    editorState.activeScene,
    editorState.dark,
    editorState.light,
    editorState.previewMode,
    editorState.radius,
  ])

  const handleImportConfig = React.useCallback((value: string) => {
    const result = parseCustomizationConfig(value)

    if (!result.ok) {
      return result
    }

    setEditorState({
      ...result.state,
      filterQuery: "",
    })

    return { ok: true } as const
  }, [])

  const handleOpenFullscreen = React.useCallback(() => {
    const activeElement = document.activeElement
    lastFocusedElementRef.current = activeElement instanceof HTMLElement ? activeElement : null
    setIsFullscreenPreview(true)
  }, [])

  const handleCloseFullscreen = React.useCallback(() => {
    setIsFullscreenPreview(false)
  }, [])

  return (
    <>
      <section
        ref={workspaceRef}
        aria-label="Customization workspace"
        className="flex h-full min-h-0 flex-row gap-4 overflow-hidden"
      >
        <div className="flex h-full min-h-0 w-100 shrink-0 overflow-hidden">
          <TokenControlsPanel
            filterQuery={editorState.filterQuery}
            presetValue={editorState.activePreset[editorState.previewMode]}
            previewMode={editorState.previewMode}
            values={activeValues}
            onFilterQueryChange={handleFilterQueryChange}
            onPresetChange={handlePresetChange}
            onTokenChange={handleTokenChange}
          />
        </div>

        <div className="flex min-h-0 w-full flex-1 flex-col gap-4 overflow-hidden">
          <div className="shrink-0">
            <CustomizationToolbar
              previewMode={editorState.previewMode}
              onPreviewModeChange={handlePreviewModeChange}
              onReset={handleReset}
              onCopyExport={handleCopyExport}
              onDownloadExport={handleDownloadExport}
              onImportConfig={handleImportConfig}
              activeScene={editorState.activeScene}
              onSceneChange={handleSceneChange}
              onFullscreenToggle={handleOpenFullscreen}
              idNamespace="workspace"
            />
          </div>

          <PreviewPanel
            previewMode={editorState.previewMode}
            values={activeValues}
            activeScene={editorState.activeScene}
            idNamespace="workspace"
          />
        </div>
      </section>

      {isFullscreenPreview && fullscreenPortalContainerRef.current
        ? createPortal(
            <div
              ref={fullscreenDialogRef}
              role="dialog"
              aria-modal="true"
              aria-label="Fullscreen preview"
              tabIndex={-1}
              className="app-background fixed inset-0 z-50 p-2"
            >
              <div className="flex h-full min-h-0 flex-col gap-3">
                <CustomizationToolbar
                  previewMode={editorState.previewMode}
                  onPreviewModeChange={handlePreviewModeChange}
                  onReset={handleReset}
                  onCopyExport={handleCopyExport}
                  onDownloadExport={handleDownloadExport}
                  onImportConfig={handleImportConfig}
                  activeScene={editorState.activeScene}
                  onSceneChange={handleSceneChange}
                  onFullscreenToggle={handleCloseFullscreen}
                  variant="fullscreen"
                  idNamespace="fullscreen"
                />

                <PreviewPanel
                  previewMode={editorState.previewMode}
                  values={activeValues}
                  activeScene={editorState.activeScene}
                  idNamespace="fullscreen"
                  previewScopeClassName="h-full rounded-glass-lg border-[var(--glass-border-soft)] !bg-[var(--color-background)] p-4"
                />
              </div>
            </div>,
            fullscreenPortalContainerRef.current,
          )
        : null}
    </>
  )
}

import * as React from "react"
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

interface EditorState {
  light: ThemeTokenValues
  dark: ThemeTokenValues
  radius: RadiusTokenValues
  previewMode: PreviewMode
  filterQuery: string
  activeScene: PreviewSceneId
  activePreset: { light: string | null; dark: string | null }
}

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

  return (
    <section
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
            activeScene={editorState.activeScene}
            onSceneChange={handleSceneChange}
          />
        </div>

        <PreviewPanel
          previewMode={editorState.previewMode}
          values={activeValues}
          activeScene={editorState.activeScene}
          onSceneChange={handleSceneChange}
        />
      </div>
    </section>
  )
}

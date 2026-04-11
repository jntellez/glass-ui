import * as React from "react"
import {
  applyPreset,
  DEFAULT_DARK_TOKENS,
  DEFAULT_LIGHT_TOKENS,
  DEFAULT_RADIUS_TOKENS,
  getEditorTokenValues,
  isRadiusToken,
  type PresetVariant,
  type RadiusTokenValues,
  type TokenName,
  type ThemeTokenValues,
} from "./customization-tokens"
import { serializeCss } from "./export-css"
import { CustomizationToolbar, type PreviewMode } from "./CustomizationToolbar"
import { TokenControlsPanel } from "./TokenControlsPanel"
import { PreviewPanel } from "./PreviewPanel"
import type { PreviewSceneId } from "./preview-scenes"
import { applyTheme, getInitialResolvedTheme } from "../theme/theme"

interface EditorState {
  light: ThemeTokenValues
  dark: ThemeTokenValues
  radius: RadiusTokenValues
  previewMode: PreviewMode
  filterQuery: string
  activeScene: PreviewSceneId
}

function createInitialState(): EditorState {
  const previewMode = getInitialResolvedTheme()

  return {
    light: { ...DEFAULT_LIGHT_TOKENS },
    dark: { ...DEFAULT_DARK_TOKENS },
    radius: { ...DEFAULT_RADIUS_TOKENS },
    previewMode,
    filterQuery: "",
    activeScene: "overview",
  }
}

export function CustomizationApp() {
  const [editorState, setEditorState] = React.useState<EditorState>(() => createInitialState())

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
      }
    })
  }, [])

  const handleReset = React.useCallback(() => {
    setEditorState(createInitialState())
  }, [])

  const handlePreviewModeChange = React.useCallback((previewMode: PreviewMode) => {
    applyTheme(previewMode)
    setEditorState((current) => ({ ...current, previewMode }))
  }, [])

  const handleApplyPreset = React.useCallback((variant: PresetVariant) => {
    setEditorState((current) => ({
      ...current,
      [current.previewMode]: applyPreset(current[current.previewMode], variant),
    }))
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
          previewMode={editorState.previewMode}
          values={activeValues}
          onFilterQueryChange={handleFilterQueryChange}
          onTokenChange={handleTokenChange}
        />
      </div>

      <div className="flex min-h-0 w-full flex-1 flex-col gap-4 overflow-hidden">
        <div className="shrink-0">
          <CustomizationToolbar
            previewMode={editorState.previewMode}
            onPreviewModeChange={handlePreviewModeChange}
            onApplyPreset={handleApplyPreset}
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

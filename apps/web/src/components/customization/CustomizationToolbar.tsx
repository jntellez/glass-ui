import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@glass-ui-kit/glass"
import { Maximize2, Minimize2 } from "lucide-react"
import { PREVIEW_SCENES, type PreviewSceneId } from "./preview-scenes"
import { getPreviewPanelId, getPreviewTabId } from "./preview-dom-ids"

export type PreviewMode = "light" | "dark"

type CustomizationToolbarVariant = "default" | "fullscreen"

interface CustomizationToolbarProps {
  previewMode: PreviewMode
  onPreviewModeChange: (mode: PreviewMode) => void
  onReset: () => void
  onCopyExport: () => Promise<boolean>
  activeScene: PreviewSceneId
  onSceneChange: (scene: PreviewSceneId) => void
  onFullscreenToggle: () => void
  variant?: CustomizationToolbarVariant
  idNamespace?: string
}

type CopyStatus = "idle" | "success" | "error"

const SCENE_KEYBOARD_NAVIGATION_KEYS = new Set([
  "ArrowRight",
  "ArrowDown",
  "ArrowLeft",
  "ArrowUp",
  "Home",
  "End",
])

function getModeButtonClassName(isActive: boolean) {
  return cn(isActive && "glass glass-soft text-foreground")
}

export function CustomizationToolbar({
  previewMode,
  onPreviewModeChange,
  onReset,
  onCopyExport,
  activeScene,
  onSceneChange,
  onFullscreenToggle,
  variant = "default",
  idNamespace = "workspace",
}: CustomizationToolbarProps) {
  const [copyStatus, setCopyStatus] = React.useState<CopyStatus>("idle")
  const scene = PREVIEW_SCENES.find((item) => item.id === activeScene) ?? PREVIEW_SCENES[0]
  const isFullscreen = variant === "fullscreen"

  React.useEffect(() => {
    if (copyStatus !== "success") {
      return
    }

    const timeout = window.setTimeout(() => setCopyStatus("idle"), 2000)
    return () => window.clearTimeout(timeout)
  }, [copyStatus])

  const handleCopy = React.useCallback(async () => {
    const didCopy = await onCopyExport()
    setCopyStatus(didCopy ? "success" : "error")
  }, [onCopyExport])

  const handleSceneTabKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>, sceneId: PreviewSceneId) => {
      if (!SCENE_KEYBOARD_NAVIGATION_KEYS.has(event.key)) {
        return
      }

      const currentSceneIndex = PREVIEW_SCENES.findIndex((item) => item.id === sceneId)

      if (currentSceneIndex === -1) {
        return
      }

      event.preventDefault()

      let targetSceneIndex = currentSceneIndex

      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        targetSceneIndex = (currentSceneIndex + 1) % PREVIEW_SCENES.length
      }

      if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        targetSceneIndex = (currentSceneIndex - 1 + PREVIEW_SCENES.length) % PREVIEW_SCENES.length
      }

      if (event.key === "Home") {
        targetSceneIndex = 0
      }

      if (event.key === "End") {
        targetSceneIndex = PREVIEW_SCENES.length - 1
      }

      const targetScene = PREVIEW_SCENES[targetSceneIndex]
      const targetTab = event.currentTarget.ownerDocument.getElementById(
        getPreviewTabId(idNamespace, targetScene.id),
      )

      if (targetTab instanceof HTMLElement) {
        targetTab.focus()
      }

      onSceneChange(targetScene.id)
    },
    [idNamespace, onSceneChange],
  )

  const copyMessage =
    copyStatus === "success"
      ? "CSS export copied to clipboard."
      : copyStatus === "error"
        ? "Copy failed. Select the generated CSS and copy it manually."
        : ""

  return (
    <div className="glass glass-soft flex min-h-15 flex-wrap items-center justify-between gap-3 rounded-glass-md px-4 py-3">
      <p role="status" className="sr-only">
        {copyMessage}
      </p>
      <div role="tablist" aria-label="Preview scenes" className="flex flex-wrap gap-3">
        {PREVIEW_SCENES.map((item) => {
          const isActive = item.id === scene.id

          return (
            <Button
              key={item.id}
              id={getPreviewTabId(idNamespace, item.id)}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={getPreviewPanelId(idNamespace, item.id)}
              tabIndex={isActive ? 0 : -1}
              onClick={() => onSceneChange(item.id)}
              onKeyDown={(event) => handleSceneTabKeyDown(event, item.id)}
            >
              {item.label}
            </Button>
          )
        })}
      </div>
      <div
        className="flex gap-3"
        role="toolbar"
        aria-label="Customization actions"
        data-sticky="desktop"
      >
        <Button
          type="button"
          onClick={() => onPreviewModeChange("light")}
          aria-pressed={previewMode === "light"}
          className={getModeButtonClassName(previewMode === "light")}
        >
          Light
        </Button>
        <Button
          type="button"
          onClick={() => onPreviewModeChange("dark")}
          aria-pressed={previewMode === "dark"}
          className={getModeButtonClassName(previewMode === "dark")}
        >
          Dark
        </Button>
        {isFullscreen ? (
          <Button
            type="button"
            size="icon"
            onClick={onFullscreenToggle}
            aria-label="Exit fullscreen preview"
            autoFocus
          >
            <Minimize2 aria-hidden="true" />
          </Button>
        ) : (
          <>
            <Button type="button" onClick={onReset} className="">
              Reset
            </Button>
            <Button type="button" onClick={handleCopy} aria-label="Copy export" className="">
              {copyStatus === "success" ? "Copied" : "Copy export"}
            </Button>
            <Button
              type="button"
              size="icon"
              onClick={onFullscreenToggle}
              aria-label="Enter fullscreen preview"
            >
              <Maximize2 aria-hidden="true" />
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

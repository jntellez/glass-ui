import * as React from "react"
import { cn } from "@/lib/utils"
import type { PresetVariant } from "./customization-tokens"
import { Button } from "@glass-ui-kit/glass"
import { PREVIEW_SCENES, type PreviewSceneId } from "./preview-scenes"

export type PreviewMode = "light" | "dark"

interface CustomizationToolbarProps {
  previewMode: PreviewMode
  onPreviewModeChange: (mode: PreviewMode) => void
  onApplyPreset: (variant: PresetVariant) => void
  onReset: () => void
  onCopyExport: () => Promise<boolean>
  activeScene: PreviewSceneId
  onSceneChange: (scene: PreviewSceneId) => void
}

type CopyStatus = "idle" | "success" | "error"

function getModeButtonClassName(isActive: boolean) {
  return cn(isActive && "glass glass-soft text-foreground")
}

export function CustomizationToolbar({
  previewMode,
  onPreviewModeChange,
  onApplyPreset,
  onReset,
  onCopyExport,
  activeScene,
  onSceneChange,
}: CustomizationToolbarProps) {
  const [copyStatus, setCopyStatus] = React.useState<CopyStatus>("idle")
  const scene = PREVIEW_SCENES.find((item) => item.id === activeScene) ?? PREVIEW_SCENES[0]

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

  const copyMessage =
    copyStatus === "success"
      ? "CSS export copied to clipboard."
      : copyStatus === "error"
        ? "Copy failed. Select the generated CSS and copy it manually."
        : ""

  return (
    <div className="glass glass-soft flex items-center justify-between rounded-glass-md h-15 px-4">
      <div role="tablist" aria-label="Preview scenes" className="flex flex-wrap gap-3">
        {PREVIEW_SCENES.map((item) => {
          const isActive = item.id === scene.id

          return (
            <Button
              key={item.id}
              id={`preview-tab-${item.id}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`preview-panel-${item.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => onSceneChange(item.id)}
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
        <Button type="button" onClick={onReset} className="">
          Reset
        </Button>
        <Button type="button" onClick={handleCopy} aria-label="Copy export" className="">
          {copyStatus === "success" ? "Copied" : "Copy export"}
        </Button>
      </div>
    </div>
  )
}

import * as React from "react"
import { cn } from "@/lib/utils"
import type { PresetVariant } from "./customization-tokens"

export type PreviewMode = "light" | "dark"

interface CustomizationToolbarProps {
  previewMode: PreviewMode
  onPreviewModeChange: (mode: PreviewMode) => void
  onApplyPreset: (variant: PresetVariant) => void
  onReset: () => void
  onCopyExport: () => Promise<boolean>
}

type CopyStatus = "idle" | "success" | "error"

const toolbarButtonClassName =
  "inline-flex min-h-9 items-center justify-center rounded-md border px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"

function getModeButtonClassName(isActive: boolean) {
  return cn(
    toolbarButtonClassName,
    isActive
      ? "border-foreground bg-foreground text-background"
      : "border-border bg-background text-foreground hover:bg-muted",
  )
}

function getActionButtonClassName() {
  return cn(toolbarButtonClassName, "border-border bg-background text-foreground hover:bg-muted")
}

export function CustomizationToolbar({
  previewMode,
  onPreviewModeChange,
  onApplyPreset,
  onReset,
  onCopyExport,
}: CustomizationToolbarProps) {
  const [copyStatus, setCopyStatus] = React.useState<CopyStatus>("idle")

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
    <div className="space-y-3 rounded-2xl border border-border/70 bg-background/95 p-3 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div
        className="flex flex-wrap items-center gap-3"
        role="toolbar"
        aria-label="Customization actions"
        data-sticky="desktop"
      >
        <div role="group" aria-label="Preview theme" className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => onPreviewModeChange("light")}
            aria-pressed={previewMode === "light"}
            className={getModeButtonClassName(previewMode === "light")}
          >
            Light preview
          </button>
          <button
            type="button"
            onClick={() => onPreviewModeChange("dark")}
            aria-pressed={previewMode === "dark"}
            className={getModeButtonClassName(previewMode === "dark")}
          >
            Dark preview
          </button>
        </div>

        <div role="group" aria-label="Presets" className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => onApplyPreset("soft")}
            className={getActionButtonClassName()}
          >
            Apply soft variant
          </button>
          <button
            type="button"
            onClick={() => onApplyPreset("strong")}
            className={getActionButtonClassName()}
          >
            Apply strong variant
          </button>
        </div>

        <div role="group" aria-label="Editor actions" className="flex flex-wrap items-center gap-2">
          <button type="button" onClick={onReset} className={getActionButtonClassName()}>
            Reset
          </button>
          <button
            type="button"
            onClick={handleCopy}
            aria-label="Copy export"
            className={getActionButtonClassName()}
          >
            {copyStatus === "success" ? "Copied" : "Copy export"}
          </button>
          <p role="status" aria-live="polite" className="text-sm text-muted-foreground">
            {copyMessage}
          </p>
        </div>
      </div>
    </div>
  )
}

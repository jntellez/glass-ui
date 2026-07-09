import * as React from "react"
import { cn } from "@/lib/utils"
import { Button, Popover, PopoverContent, PopoverTrigger, Textarea } from "@glass-ui-kit/glass"
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
  onDownloadExport: () => boolean
  onImportConfig: (value: string) => { ok: true } | { ok: false; error: string }
  activeScene: PreviewSceneId
  onSceneChange: (scene: PreviewSceneId) => void
  onFullscreenToggle: () => void
  variant?: CustomizationToolbarVariant
  idNamespace?: string
}

type ActionStatus =
  | "idle"
  | "copy-success"
  | "copy-error"
  | "download-success"
  | "download-error"
  | "import-success"

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
  onDownloadExport,
  onImportConfig,
  activeScene,
  onSceneChange,
  onFullscreenToggle,
  variant = "default",
  idNamespace = "workspace",
}: CustomizationToolbarProps) {
  const [actionStatus, setActionStatus] = React.useState<ActionStatus>("idle")
  const [isImportOpen, setIsImportOpen] = React.useState(false)
  const [importValue, setImportValue] = React.useState("")
  const [importError, setImportError] = React.useState<string | null>(null)
  const scene = PREVIEW_SCENES.find((item) => item.id === activeScene) ?? PREVIEW_SCENES[0]
  const isFullscreen = variant === "fullscreen"

  React.useEffect(() => {
    if (actionStatus === "idle") {
      return
    }

    const timeout = window.setTimeout(() => setActionStatus("idle"), 2000)
    return () => window.clearTimeout(timeout)
  }, [actionStatus])

  const handleCopy = React.useCallback(async () => {
    const didCopy = await onCopyExport()
    setActionStatus(didCopy ? "copy-success" : "copy-error")
  }, [onCopyExport])

  const handleDownload = React.useCallback(() => {
    const didDownload = onDownloadExport()
    setActionStatus(didDownload ? "download-success" : "download-error")
  }, [onDownloadExport])

  const handleImport = React.useCallback(() => {
    const result = onImportConfig(importValue)

    if (!result.ok) {
      setImportError(result.error)
      return
    }

    setImportValue("")
    setImportError(null)
    setIsImportOpen(false)
    setActionStatus("import-success")
  }, [importValue, onImportConfig])

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

  const statusMessage =
    actionStatus === "copy-success"
      ? "CSS export copied to clipboard."
      : actionStatus === "copy-error"
        ? "Copy failed. Select the generated CSS and copy it manually."
        : actionStatus === "download-success"
          ? "Configuration JSON downloaded."
          : actionStatus === "download-error"
            ? "Download failed. Try copying or importing the configuration manually."
            : actionStatus === "import-success"
              ? "Configuration imported."
              : ""

  return (
    <div className="glass glass-soft flex min-h-15 flex-wrap items-center justify-between gap-3 rounded-glass-md px-4 py-3">
      <p role="status" className="sr-only">
        {statusMessage}
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
              {actionStatus === "copy-success" ? "Copied" : "Copy export"}
            </Button>
            <Button type="button" onClick={handleDownload} aria-label="Download configuration">
              Download config
            </Button>
            <Popover
              open={isImportOpen}
              onOpenChange={(open) => {
                setIsImportOpen(open)
                if (!open) {
                  setImportError(null)
                }
              }}
            >
              <PopoverTrigger asChild>
                <Button type="button" aria-label="Import configuration">
                  Import config
                </Button>
              </PopoverTrigger>
              <PopoverContent
                align="end"
                aria-label="Import customization JSON"
                className="w-[28rem] max-w-[calc(100vw-2rem)] p-3"
              >
                <div className="space-y-3">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-foreground">Import customization JSON</p>
                    <p className="text-xs text-muted-foreground">
                      Paste an exported configuration to restore tokens, preset selection, and
                      editor state.
                    </p>
                  </div>
                  <Textarea
                    rows={10}
                    aria-label="Customization config JSON"
                    placeholder='{"version":1,"light":{...}}'
                    value={importValue}
                    onChange={(event) => {
                      setImportValue(event.target.value)
                      if (importError) {
                        setImportError(null)
                      }
                    }}
                  />
                  {importError ? (
                    <p role="alert" className="text-sm text-destructive">
                      {importError}
                    </p>
                  ) : null}
                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="soft"
                      onClick={() => {
                        setIsImportOpen(false)
                        setImportError(null)
                      }}
                    >
                      Cancel
                    </Button>
                    <Button type="button" onClick={handleImport}>
                      Apply import
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
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

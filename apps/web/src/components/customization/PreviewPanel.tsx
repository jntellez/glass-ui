import { cn } from "@/lib/utils"
import type { TokenValues } from "./customization-tokens"
import type { PreviewMode } from "./CustomizationToolbar"
import { createPreviewScopeStyle } from "./preview-scope"
import { PREVIEW_SCENES, type PreviewSceneId } from "./preview-scenes"
import { getPreviewPanelId, getPreviewTabId } from "./preview-dom-ids"

interface PreviewPanelProps {
  previewMode: PreviewMode
  values: TokenValues
  activeScene: PreviewSceneId
  idNamespace?: string
  className?: string
  previewScopeClassName?: string
}

export function PreviewPanel({
  previewMode,
  values,
  activeScene,
  idNamespace = "workspace",
  className,
  previewScopeClassName,
}: PreviewPanelProps) {
  const scene = PREVIEW_SCENES.find((item) => item.id === activeScene) ?? PREVIEW_SCENES[0]

  return (
    <aside
      aria-label="Preview"
      className={cn("flex min-h-0 flex-1 flex-col overflow-hidden", className)}
    >
      <div
        data-testid="preview-scope"
        data-preview-mode={previewMode}
        style={createPreviewScopeStyle(values)}
        className={cn(
          "flex min-h-0 flex-1 flex-col space-y-4 overflow-x-hidden overflow-y-auto no-scrollbar rounded-[var(--glass-radius-lg)] border border-[var(--glass-border)] bg-background/40 p-4",
          previewScopeClassName,
        )}
      >
        {PREVIEW_SCENES.map((item) => {
          const isActive = item.id === scene.id

          return (
            <div
              key={item.id}
              id={getPreviewPanelId(idNamespace, item.id)}
              role="tabpanel"
              aria-label={item.panelLabel}
              aria-labelledby={getPreviewTabId(idNamespace, item.id)}
              hidden={!isActive}
            >
              {isActive ? item.render({ values, previewMode }) : null}
            </div>
          )
        })}
      </div>
    </aside>
  )
}

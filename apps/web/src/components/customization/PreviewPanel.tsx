import * as React from "react"
import type { TokenValues } from "./customization-tokens"
import type { PreviewMode } from "./CustomizationToolbar"
import { PREVIEW_SCENES, type PreviewSceneId } from "./preview-scenes"
import { createPreviewScopeStyle } from "./preview-scope"

interface PreviewPanelProps {
  previewMode: PreviewMode
  values: TokenValues
  activeScene: PreviewSceneId
  onSceneChange: (scene: PreviewSceneId) => void
}

export function PreviewPanel({
  previewMode,
  values,
  activeScene,
  onSceneChange,
}: PreviewPanelProps) {
  const scene = PREVIEW_SCENES.find((item) => item.id === activeScene) ?? PREVIEW_SCENES[0]

  return (
    <aside aria-label="Preview" className="space-y-4">
      <p className="text-sm text-muted-foreground">Preview mode: {previewMode}</p>
      <div
        data-testid="preview-scope"
        data-preview-mode={previewMode}
        style={createPreviewScopeStyle(values)}
        className="space-y-4 overflow-x-hidden rounded-[var(--glass-radius-xl)] border border-[var(--glass-border)] bg-background/40 p-4"
      >
        <div role="tablist" aria-label="Preview scenes" className="flex flex-wrap gap-2">
          {PREVIEW_SCENES.map((item) => {
            const isActive = item.id === scene.id

            return (
              <button
                key={item.id}
                id={`preview-tab-${item.id}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`preview-panel-${item.id}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => onSceneChange(item.id)}
                className="inline-flex min-h-9 items-center justify-center rounded-md border border-border bg-background px-3 text-sm font-medium text-foreground"
              >
                {item.label}
              </button>
            )
          })}
        </div>

        <div
          id={`preview-panel-${scene.id}`}
          role="tabpanel"
          aria-label={scene.panelLabel}
          aria-labelledby={`preview-tab-${scene.id}`}
        >
          {scene.render({ values, previewMode })}
        </div>
      </div>
    </aside>
  )
}

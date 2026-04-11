import type { TokenValues } from "./customization-tokens"
import type { PreviewMode } from "./CustomizationToolbar"
import { createPreviewScopeStyle } from "./preview-scope"
import { PREVIEW_SCENES, type PreviewSceneId } from "./preview-scenes"

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
    <aside aria-label="Preview" className="flex min-h-0 flex-1 flex-col space-y-4 overflow-hidden">
      <div
        data-testid="preview-scope"
        data-preview-mode={previewMode}
        style={createPreviewScopeStyle(values)}
        className="flex min-h-0 flex-1 flex-col space-y-4 overflow-x-hidden overflow-y-auto no-scrollbar rounded-[var(--glass-radius-lg)] border border-[var(--glass-border)] bg-background/40 p-4"
      >
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

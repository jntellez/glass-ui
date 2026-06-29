import type { PreviewSceneId } from "./preview-scenes"

export function getPreviewTabId(idNamespace: string, sceneId: PreviewSceneId) {
  return `${idNamespace}-preview-tab-${sceneId}`
}

export function getPreviewPanelId(idNamespace: string, sceneId: PreviewSceneId) {
  return `${idNamespace}-preview-panel-${sceneId}`
}

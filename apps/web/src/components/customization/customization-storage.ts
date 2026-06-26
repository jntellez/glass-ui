import type { PreviewMode } from "./CustomizationToolbar"
import {
  DEFAULT_DARK_TOKENS,
  DEFAULT_LIGHT_TOKENS,
  DEFAULT_RADIUS_TOKENS,
  type RadiusTokenValues,
  type ThemeTokenValues,
} from "./customization-tokens"
import type { PreviewSceneId } from "./preview-scenes"

const CUSTOMIZATION_STORAGE_VERSION = 1
export const CUSTOMIZATION_STORAGE_KEY = `glass-ui.customization.v${CUSTOMIZATION_STORAGE_VERSION}`

interface PersistedEditorState {
  version: number
  light: ThemeTokenValues
  dark: ThemeTokenValues
  radius: RadiusTokenValues
  previewMode: PreviewMode
  activeScene: PreviewSceneId
  activePreset: {
    light: string | null
    dark: string | null
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null
}

function mergeStoredTokens<T extends Record<string, string>>(defaults: T, candidate: unknown): T {
  if (!isRecord(candidate)) {
    return { ...defaults }
  }

  const nextValues = { ...defaults }

  for (const key of Object.keys(defaults) as Array<keyof T>) {
    const value = candidate[key as string]

    if (typeof value === "string") {
      nextValues[key] = value as T[keyof T]
    }
  }

  return nextValues
}

function resolvePreviewMode(value: unknown, fallback: PreviewMode): PreviewMode {
  return value === "light" || value === "dark" ? value : fallback
}

function resolveScene(value: unknown): PreviewSceneId {
  return value === "overview" || value === "components" || value === "content" ? value : "overview"
}

function resolvePreset(value: unknown): string | null {
  return typeof value === "string" || value === null ? value : "default"
}

function getSafeStorage(): Pick<Storage, "getItem" | "setItem" | "removeItem"> | null {
  if (typeof window === "undefined") {
    return null
  }

  try {
    return window.localStorage
  } catch {
    return null
  }
}

export function readPersistedEditorState(
  fallbackPreviewMode: PreviewMode,
  storage: Pick<Storage, "getItem"> | null = getSafeStorage(),
): PersistedEditorState | null {
  try {
    const rawValue = storage?.getItem(CUSTOMIZATION_STORAGE_KEY)

    if (!rawValue) {
      return null
    }

    const parsed = JSON.parse(rawValue) as unknown

    if (!isRecord(parsed) || parsed.version !== CUSTOMIZATION_STORAGE_VERSION) {
      return null
    }

    const activePreset = isRecord(parsed.activePreset) ? parsed.activePreset : null

    return {
      version: CUSTOMIZATION_STORAGE_VERSION,
      light: mergeStoredTokens(DEFAULT_LIGHT_TOKENS, parsed.light),
      dark: mergeStoredTokens(DEFAULT_DARK_TOKENS, parsed.dark),
      radius: mergeStoredTokens(DEFAULT_RADIUS_TOKENS, parsed.radius),
      previewMode: resolvePreviewMode(parsed.previewMode, fallbackPreviewMode),
      activeScene: resolveScene(parsed.activeScene),
      activePreset: {
        light: resolvePreset(activePreset?.light),
        dark: resolvePreset(activePreset?.dark),
      },
    }
  } catch {
    return null
  }
}

export function persistEditorState(
  state: Omit<PersistedEditorState, "version">,
  storage: Pick<Storage, "setItem"> | null = getSafeStorage(),
) {
  if (!storage) {
    return
  }

  try {
    storage.setItem(
      CUSTOMIZATION_STORAGE_KEY,
      JSON.stringify({
        version: CUSTOMIZATION_STORAGE_VERSION,
        ...state,
      } satisfies PersistedEditorState),
    )
  } catch {
    // Ignore storage write failures and keep the editor usable.
  }
}

export function clearPersistedEditorState(
  storage: Pick<Storage, "removeItem"> | null = getSafeStorage(),
) {
  if (!storage) {
    return
  }

  try {
    storage.removeItem(CUSTOMIZATION_STORAGE_KEY)
  } catch {
    // Ignore storage removal failures and keep the editor usable.
  }
}

import type { PreviewMode } from "./CustomizationToolbar"
import {
  DEFAULT_DARK_TOKENS,
  DEFAULT_LIGHT_TOKENS,
  DEFAULT_RADIUS_TOKENS,
  type RadiusTokenValues,
  type ThemeTokenValues,
} from "./customization-tokens"
import type { PreviewSceneId } from "./preview-scenes"
import { isThemePresetId, resolveThemePresetTokens } from "./theme-presets"

export interface CustomizationConfigState {
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

interface ExportedCustomizationConfig {
  version: 1
  light: ThemeTokenValues
  dark: ThemeTokenValues
  radius: RadiusTokenValues
  editor: {
    previewMode: PreviewMode
    activeScene: PreviewSceneId
    activePreset: {
      light: string | null
      dark: string | null
    }
  }
}

interface ImportSuccess {
  ok: true
  state: CustomizationConfigState
}

interface ImportFailure {
  ok: false
  error: string
}

export type CustomizationConfigImportResult = ImportSuccess | ImportFailure

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null
}

function isValidTokenValue(value: string) {
  return value.trim().length > 0 && !/[\u0000\r\n]/.test(value)
}

function mergeStoredTokens<T extends Record<string, string>>(
  defaults: T,
  candidate: unknown,
): { values: T; isValid: boolean } {
  if (!isRecord(candidate)) {
    return {
      values: { ...defaults },
      isValid: false,
    }
  }

  const nextValues = { ...defaults }

  for (const key of Object.keys(defaults) as Array<keyof T>) {
    const tokenKey = key as string

    if (!(tokenKey in candidate)) {
      continue
    }

    const value = candidate[tokenKey]

    if (typeof value !== "string" || !isValidTokenValue(value)) {
      return {
        values: { ...defaults },
        isValid: false,
      }
    }

    nextValues[key] = value as T[keyof T]
  }

  return {
    values: nextValues,
    isValid: true,
  }
}

function resolvePreviewMode(value: unknown): PreviewMode {
  return value === "light" || value === "dark" ? value : "light"
}

function resolveScene(value: unknown): PreviewSceneId {
  return value === "overview" || value === "components" || value === "content" ? value : "overview"
}

function resolveImportedPreset(value: unknown): string | null {
  return typeof value === "string" && isThemePresetId(value) ? value : null
}

function matchesPresetTokens(
  values: ThemeTokenValues,
  presetId: string | null,
  mode: "light" | "dark",
) {
  if (!presetId) {
    return null
  }

  const presetValues = resolveThemePresetTokens(presetId, mode)

  return Object.entries(presetValues).every(
    ([token, value]) => values[token as keyof ThemeTokenValues] === value,
  )
    ? presetId
    : null
}

export function serializeCustomizationConfig(state: CustomizationConfigState) {
  return JSON.stringify(
    {
      version: 1,
      light: state.light,
      dark: state.dark,
      radius: state.radius,
      editor: {
        previewMode: state.previewMode,
        activeScene: state.activeScene,
        activePreset: state.activePreset,
      },
    } satisfies ExportedCustomizationConfig,
    null,
    2,
  )
}

export function parseCustomizationConfig(rawValue: string): CustomizationConfigImportResult {
  let parsed: unknown

  try {
    parsed = JSON.parse(rawValue) as unknown
  } catch {
    return {
      ok: false,
      error: "Invalid JSON. Paste a valid customization config.",
    }
  }

  if (
    !isRecord(parsed) ||
    parsed.version !== 1 ||
    !isRecord(parsed.light) ||
    !isRecord(parsed.dark) ||
    !isRecord(parsed.radius) ||
    !isRecord(parsed.editor) ||
    !isRecord(parsed.editor.activePreset)
  ) {
    return {
      ok: false,
      error: "Invalid customization config. Use a config exported from this editor.",
    }
  }

  const lightTokens = mergeStoredTokens(DEFAULT_LIGHT_TOKENS, parsed.light)
  const darkTokens = mergeStoredTokens(DEFAULT_DARK_TOKENS, parsed.dark)
  const radiusTokens = mergeStoredTokens(DEFAULT_RADIUS_TOKENS, parsed.radius)

  if (!lightTokens.isValid || !darkTokens.isValid || !radiusTokens.isValid) {
    return {
      ok: false,
      error: "Invalid customization config. Token values must be non-empty strings.",
    }
  }

  const light = lightTokens.values
  const dark = darkTokens.values
  const radius = radiusTokens.values
  const lightPreset = resolveImportedPreset(parsed.editor.activePreset.light)
  const darkPreset = resolveImportedPreset(parsed.editor.activePreset.dark)

  return {
    ok: true,
    state: {
      light,
      dark,
      radius,
      previewMode: resolvePreviewMode(parsed.editor.previewMode),
      activeScene: resolveScene(parsed.editor.activeScene),
      activePreset: {
        light: matchesPresetTokens(light, lightPreset, "light"),
        dark: matchesPresetTokens(dark, darkPreset, "dark"),
      },
    },
  }
}

import {
  CANONICAL_TOKEN_ORDER,
  RADIUS_TOKEN_NAMES,
  getEditorTokenValues,
  type RadiusTokenValues,
  type ThemeTokenValues,
} from "./customization-tokens"

const RADIUS_TOKEN_NAME_SET = new Set<string>(RADIUS_TOKEN_NAMES)

const THEME_TOKEN_ORDER = CANONICAL_TOKEN_ORDER.filter((token) => !RADIUS_TOKEN_NAME_SET.has(token))

function serializeBlock(
  selector: string,
  values: Record<string, string>,
  tokenOrder: readonly string[],
) {
  const declarations = tokenOrder.map((token) => `  ${token}: ${values[token]};`).join("\n")

  return `${selector} {\n${declarations}\n}`
}

export function serializeCss(
  light: ThemeTokenValues,
  dark: ThemeTokenValues,
  radius: RadiusTokenValues,
) {
  return `${serializeBlock(":root", getEditorTokenValues(light, radius), CANONICAL_TOKEN_ORDER)}\n\n${serializeBlock(".dark", dark, THEME_TOKEN_ORDER)}`
}

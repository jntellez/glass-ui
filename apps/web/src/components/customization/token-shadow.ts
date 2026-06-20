import { parseColorValue } from "./color-value"

export interface ShadowColorChannels {
  blue: number
  green: number
  red: number
}

export interface ParsedShadowColor {
  alpha: number | null
  alphaText: string | null
  channels: ShadowColorChannels
}

export interface ParsedShadowValue {
  blur: number
  color: string
  colorChannels: ShadowColorChannels
  offsetX: number
  offsetY: number
  opacity: number
  opacityText: string
  spread: number
}

const SHADOW_PATTERN =
  /^\s*(-?(?:\d+|\d*\.\d+)(?:px)?)\s+(-?(?:\d+|\d*\.\d+)(?:px)?)\s+(-?(?:\d+|\d*\.\d+)(?:px)?)\s+(-?(?:\d+|\d*\.\d+)(?:px)?)\s+(.+?)\s*$/i

export function parseShadowValue(value: string): ParsedShadowValue | null {
  const match = value.match(SHADOW_PATTERN)

  if (!match) {
    return null
  }

  const lengths = match.slice(1, 5).map(parseShadowLength)

  if (lengths.some((length) => length === null)) {
    return null
  }

  if (lengths[2]! < 0) {
    return null
  }

  const color = match[5].trim()
  const parsedColor = parseShadowColor(color)

  if (!parsedColor) {
    return null
  }

  return {
    offsetX: lengths[0]!,
    offsetY: lengths[1]!,
    blur: lengths[2]!,
    spread: lengths[3]!,
    color,
    colorChannels: parsedColor.channels,
    opacity: parsedColor.alpha ?? 1,
    opacityText: parsedColor.alphaText ?? "1",
  }
}

export function parseShadowColor(value: string): ParsedShadowColor | null {
  const trimmedValue = value.trim()

  const parsedColorValue = parseColorValue(trimmedValue)

  if (parsedColorValue) {
    return {
      channels: {
        red: parsedColorValue.red,
        green: parsedColorValue.green,
        blue: parsedColorValue.blue,
      },
      alpha: parsedColorValue.alpha,
      alphaText: parsedColorValue.alphaText,
    }
  }

  if (/^#([0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(trimmedValue)) {
    return parseHexColor(trimmedValue)
  }

  return null
}

export function formatShadowValue(
  value: Pick<
    ParsedShadowValue,
    "blur" | "colorChannels" | "offsetX" | "offsetY" | "opacity" | "opacityText" | "spread"
  >,
) {
  return [
    formatShadowLength(value.offsetX),
    formatShadowLength(value.offsetY),
    formatShadowLength(value.blur),
    formatShadowLength(value.spread),
    formatShadowColor(value.colorChannels, value.opacity, value.opacityText),
  ].join(" ")
}

export function updateShadowColor(
  value: ParsedShadowValue,
  nextColor: string,
): ParsedShadowValue | null {
  const parsedColor = parseShadowColor(nextColor)

  if (!parsedColor) {
    return null
  }

  return {
    ...value,
    color: nextColor.trim(),
    colorChannels: parsedColor.channels,
    opacity: parsedColor.alpha ?? value.opacity,
    opacityText: parsedColor.alphaText ?? value.opacityText,
  }
}

export function clampShadowValue(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

export function parseShadowDraftNumber(value: string) {
  const trimmedValue = value.trim()

  if (!trimmedValue) {
    return null
  }

  const numericValue = Number(trimmedValue)

  return Number.isFinite(numericValue) ? numericValue : null
}

export function updateShadowOpacity(
  value: ParsedShadowValue,
  nextOpacity: number,
  rawValue?: string,
) {
  const clampedOpacity = clampShadowValue(nextOpacity, 0, 1)

  return {
    ...value,
    opacity: clampedOpacity,
    opacityText:
      rawValue && Number(rawValue.trim()) === clampedOpacity
        ? rawValue.trim()
        : stripTrailingZeros(clampedOpacity.toFixed(2)),
  }
}

function parseShadowLength(value: string) {
  const match = value.trim().match(/^(-?(?:\d+|\d*\.\d+))(px)?$/i)

  if (!match) {
    return null
  }

  const numericValue = Number(match[1])

  if (!Number.isFinite(numericValue)) {
    return null
  }

  if (!match[2] && numericValue !== 0) {
    return null
  }

  return numericValue
}

function formatShadowLength(value: number) {
  return `${stripTrailingZeros(value.toFixed(value % 1 === 0 ? 0 : 3))}px`
}

function formatShadowColor(channels: ShadowColorChannels, opacity: number, opacityText: string) {
  const formattedOpacity =
    Number(opacityText) === opacity ? opacityText : stripTrailingZeros(opacity.toFixed(2))

  return `rgba(${channels.red}, ${channels.green}, ${channels.blue}, ${formattedOpacity})`
}

function parseHexColor(value: string): ParsedShadowColor {
  const normalized = value.slice(1)

  if (normalized.length === 3 || normalized.length === 4) {
    const red = Number.parseInt(normalized[0] + normalized[0], 16)
    const green = Number.parseInt(normalized[1] + normalized[1], 16)
    const blue = Number.parseInt(normalized[2] + normalized[2], 16)
    const alpha =
      normalized.length === 4 ? Number.parseInt(normalized[3] + normalized[3], 16) / 255 : null

    return {
      channels: { red, green, blue },
      alpha,
      alphaText: normalized.length === 4 ? `${alpha}` : null,
    }
  }

  const red = Number.parseInt(normalized.slice(0, 2), 16)
  const green = Number.parseInt(normalized.slice(2, 4), 16)
  const blue = Number.parseInt(normalized.slice(4, 6), 16)
  const alpha = normalized.length === 8 ? Number.parseInt(normalized.slice(6, 8), 16) / 255 : null

  return {
    channels: { red, green, blue },
    alpha,
    alphaText: normalized.length === 8 ? `${alpha}` : null,
  }
}

function stripTrailingZeros(value: string) {
  return value.replace(/\.0+$/, "").replace(/(\.\d*?)0+$/, "$1")
}

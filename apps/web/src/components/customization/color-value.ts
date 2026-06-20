export interface ParsedColorValue {
  alpha: number | null
  alphaText: string | null
  blue: number
  format: "hex" | "rgb" | "rgba"
  green: number
  pickerHex: string
  red: number
}

const HEX_COLOR_PATTERN = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i
const RGB_COLOR_PATTERN = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i
const RGBA_COLOR_PATTERN =
  /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(-?(?:\d+|\d*\.\d+))\s*\)$/i

export function parseColorValue(value: string): ParsedColorValue | null {
  const trimmedValue = value.trim()

  if (!trimmedValue) {
    return null
  }

  if (isHexColor(trimmedValue)) {
    return parseHexColor(trimmedValue)
  }

  return parseRgbColor(trimmedValue) ?? parseRgbaColor(trimmedValue)
}

export function updateColorValueWithPickerHex(value: string, nextPickerHex: string) {
  const parsedValue = parseColorValue(value)
  const normalizedHex = normalizePickerHex(nextPickerHex)

  if (!parsedValue || !normalizedHex) {
    return null
  }

  const nextColor = parseHexColor(normalizedHex)

  if (parsedValue.format === "hex") {
    return normalizedHex
  }

  if (parsedValue.format === "rgb") {
    return `rgb(${nextColor.red}, ${nextColor.green}, ${nextColor.blue})`
  }

  return `rgba(${nextColor.red}, ${nextColor.green}, ${nextColor.blue}, ${parsedValue.alphaText})`
}

export function isHexColor(value: string): boolean {
  return HEX_COLOR_PATTERN.test(value.trim())
}

export function canRenderColorSwatch(value: string) {
  if (typeof document === "undefined") {
    return false
  }

  const swatch = document.createElement("span")
  swatch.style.backgroundColor = ""
  swatch.style.backgroundColor = value.trim()

  return swatch.style.backgroundColor !== ""
}

function parseHexColor(value: string): ParsedColorValue {
  const normalizedHex = normalizePickerHex(value)

  if (!normalizedHex) {
    throw new Error(`Expected a valid hex color, received: ${value}`)
  }

  const hex = normalizedHex.slice(1)
  const red = Number.parseInt(hex.slice(0, 2), 16)
  const green = Number.parseInt(hex.slice(2, 4), 16)
  const blue = Number.parseInt(hex.slice(4, 6), 16)

  return {
    alpha: null,
    alphaText: null,
    blue,
    format: "hex",
    green,
    pickerHex: normalizedHex,
    red,
  }
}

function parseRgbColor(value: string): ParsedColorValue | null {
  const match = value.match(RGB_COLOR_PATTERN)

  if (!match) {
    return null
  }

  const channels = parseRgbChannels(match[1], match[2], match[3])

  if (!channels) {
    return null
  }

  return {
    ...channels,
    alpha: null,
    alphaText: null,
    format: "rgb",
    pickerHex: toPickerHex(channels.red, channels.green, channels.blue),
  }
}

function parseRgbaColor(value: string): ParsedColorValue | null {
  const match = value.match(RGBA_COLOR_PATTERN)

  if (!match) {
    return null
  }

  const channels = parseRgbChannels(match[1], match[2], match[3])

  if (!channels) {
    return null
  }

  const alpha = Number(match[4])

  if (!Number.isFinite(alpha) || alpha < 0 || alpha > 1) {
    return null
  }

  return {
    ...channels,
    alpha,
    alphaText: match[4],
    format: "rgba",
    pickerHex: toPickerHex(channels.red, channels.green, channels.blue),
  }
}

function parseRgbChannels(redText: string, greenText: string, blueText: string) {
  const red = Number(redText)
  const green = Number(greenText)
  const blue = Number(blueText)
  const channels = [red, green, blue]

  if (channels.some((channel) => !Number.isInteger(channel) || channel < 0 || channel > 255)) {
    return null
  }

  return {
    red,
    green,
    blue,
  }
}

function normalizePickerHex(value: string) {
  const normalized = value.trim().replace(/^#/, "")

  if (/^[0-9a-f]{3}$/i.test(normalized)) {
    return `#${normalized
      .split("")
      .map((character) => `${character}${character}`)
      .join("")
      .toLowerCase()}`
  }

  if (/^[0-9a-f]{6}$/i.test(normalized)) {
    return `#${normalized.toLowerCase()}`
  }

  return null
}

function toPickerHex(red: number, green: number, blue: number) {
  return `#${[red, green, blue].map((channel) => channel.toString(16).padStart(2, "0")).join("")}`
}

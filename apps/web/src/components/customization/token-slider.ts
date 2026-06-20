import type { TokenName } from "./customization-tokens"

export interface TokenSliderConfig {
  max: number
  min: number
  step: number
  token: TokenName
  unit: "px" | "rem"
}

const TOKEN_SLIDER_CONFIGS: Partial<Record<TokenName, TokenSliderConfig>> = {
  "--glass-radius-sm": {
    token: "--glass-radius-sm",
    min: 0,
    max: 2,
    step: 0.025,
    unit: "rem",
  },
  "--glass-radius-md": {
    token: "--glass-radius-md",
    min: 0,
    max: 2,
    step: 0.025,
    unit: "rem",
  },
  "--glass-radius-lg": {
    token: "--glass-radius-lg",
    min: 0,
    max: 2,
    step: 0.025,
    unit: "rem",
  },
  "--glass-radius-xl": {
    token: "--glass-radius-xl",
    min: 0,
    max: 2,
    step: 0.025,
    unit: "rem",
  },
  "--glass-blur": {
    token: "--glass-blur",
    min: 0,
    max: 24,
    step: 1,
    unit: "px",
  },
  "--glass-blur-strong": {
    token: "--glass-blur-strong",
    min: 0,
    max: 24,
    step: 1,
    unit: "px",
  },
  "--glass-blur-soft": {
    token: "--glass-blur-soft",
    min: 0,
    max: 24,
    step: 1,
    unit: "px",
  },
}

export interface ParsedTokenSliderValue {
  numericValue: number
  unit: TokenSliderConfig["unit"]
}

const TOKEN_SLIDER_VALUE_PATTERN = /^(-?\d*\.?\d+)(px|rem)$/

export function getTokenSliderConfig(token: TokenName) {
  return TOKEN_SLIDER_CONFIGS[token] ?? null
}

export function parseTokenSliderValue(value: string, unit: TokenSliderConfig["unit"]) {
  const match = value.trim().match(TOKEN_SLIDER_VALUE_PATTERN)

  if (!match || match[2] !== unit) {
    return null
  }

  const numericValue = Number(match[1])

  if (!Number.isFinite(numericValue)) {
    return null
  }

  return {
    numericValue,
    unit,
  } satisfies ParsedTokenSliderValue
}

export function parseTokenSliderDraftValue(value: string, unit: TokenSliderConfig["unit"]) {
  const trimmedValue = value.trim()

  if (!trimmedValue) {
    return null
  }

  return parseTokenSliderValue(`${trimmedValue}${unit}`, unit)
}

export function stripTokenSliderUnit(value: string, unit: TokenSliderConfig["unit"]) {
  return value.endsWith(unit) ? value.slice(0, -unit.length) : value
}

export function clampTokenSliderValue(
  value: number,
  config: Pick<TokenSliderConfig, "min" | "max">,
) {
  return Math.min(config.max, Math.max(config.min, value))
}

export function getTokenSliderDraftValue(value: string, unit: TokenSliderConfig["unit"]) {
  return parseTokenSliderValue(value, unit) ? stripTokenSliderUnit(value, unit) : value
}

export function formatTokenSliderValue(
  value: number,
  { step, unit }: Pick<TokenSliderConfig, "step" | "unit">,
) {
  const precision = getStepPrecision(step)
  const roundedValue = roundToPrecision(value, precision)

  return `${stripTrailingZeros(roundedValue.toFixed(precision))}${unit}`
}

function getStepPrecision(step: number) {
  const stepText = String(step)
  const decimalIndex = stepText.indexOf(".")

  return decimalIndex === -1 ? 0 : stepText.length - decimalIndex - 1
}

function roundToPrecision(value: number, precision: number) {
  const multiplier = 10 ** precision

  return Math.round(value * multiplier) / multiplier
}

function stripTrailingZeros(value: string) {
  return value.replace(/\.0+$/, "").replace(/(\.\d*?)0+$/, "$1")
}

export type Theme = "light" | "system" | "dark"
export type ResolvedTheme = Exclude<Theme, "system">

const DARK_MEDIA_QUERY = "(prefers-color-scheme: dark)"
export const THEME_CHANGE_EVENT = "glass-ui:theme-change"

export interface ThemeChangeDetail {
  theme: Theme
  resolvedTheme: ResolvedTheme
}

export function isTheme(value: string | null): value is Theme {
  return value === "light" || value === "dark" || value === "system"
}

export function getStoredTheme(
  storage: Pick<Storage, "getItem"> | null = getSafeStorage(),
): Theme | null {
  try {
    const storedTheme = storage?.getItem("theme") ?? null
    return isTheme(storedTheme) ? storedTheme : null
  } catch {
    return null
  }
}

export function resolveTheme(
  theme: Theme,
  matchMedia: ((query: string) => Pick<MediaQueryList, "matches">) | null = getSafeMatchMedia(),
): ResolvedTheme {
  if (theme === "light" || theme === "dark") {
    return theme
  }

  return matchMedia?.(DARK_MEDIA_QUERY).matches ? "dark" : "light"
}

export function getInitialResolvedTheme(): ResolvedTheme {
  return resolveTheme(getStoredTheme() ?? "system")
}

export function applyTheme(theme: Theme): ResolvedTheme {
  const resolvedTheme = resolveTheme(theme)

  if (typeof window === "undefined") {
    return resolvedTheme
  }

  const root = window.document.documentElement

  try {
    getSafeStorage()?.setItem("theme", theme)
  } catch {
    // Ignore storage write failures and keep applying the document theme.
  }

  root.classList.remove("light", "dark")
  root.classList.add(resolvedTheme)
  root.style.colorScheme = resolvedTheme
  dispatchThemeChange({ theme, resolvedTheme })

  return resolvedTheme
}

export function subscribeToThemeChange(listener: (detail: ThemeChangeDetail) => void) {
  if (typeof window === "undefined") {
    return () => {}
  }

  const handleThemeChange = (event: Event) => {
    listener((event as CustomEvent<ThemeChangeDetail>).detail)
  }

  window.addEventListener(THEME_CHANGE_EVENT, handleThemeChange)

  return () => {
    window.removeEventListener(THEME_CHANGE_EVENT, handleThemeChange)
  }
}

function dispatchThemeChange(detail: ThemeChangeDetail) {
  window.dispatchEvent(new CustomEvent<ThemeChangeDetail>(THEME_CHANGE_EVENT, { detail }))
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

function getSafeMatchMedia(): ((query: string) => Pick<MediaQueryList, "matches">) | null {
  return typeof window === "undefined" ? null : window.matchMedia.bind(window)
}

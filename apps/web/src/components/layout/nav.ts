function normalizePath(pathname: string) {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1)
  }

  return pathname
}

export function getNavAriaCurrent(pathname: string, href: string) {
  return normalizePath(pathname) === normalizePath(href) ? "page" : undefined
}

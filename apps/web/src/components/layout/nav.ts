export interface NavItem {
  href: string
  label: string
}

export const PRIMARY_NAV_ITEMS: readonly NavItem[] = [
  { href: "/docs", label: "Docs" },
  { href: "/docs/components", label: "Components" },
  { href: "/customization", label: "Customization" },
]

export const MOBILE_NAV_ITEMS: readonly NavItem[] = PRIMARY_NAV_ITEMS.filter(
  (item) => item.href === "/customization",
)

export interface HeaderNavLink extends NavItem {
  ariaCurrent?: "page"
}

export const HEADER_MOBILE_NAV_CLASS_NAME =
  "flex sm:hidden items-center font-medium text-foreground"
export const HEADER_DESKTOP_NAV_CLASS_NAME =
  "hidden sm:flex items-center font-medium text-foreground"
export const HEADER_NAV_BUTTON_CLASS_NAME = "hover:border-transparent hover:glass px-3"

function normalizePath(pathname: string) {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1)
  }

  return pathname
}

export function getNavAriaCurrent(pathname: string, href: string) {
  return normalizePath(pathname) === normalizePath(href) ? "page" : undefined
}

export function getMobileNavLinks(pathname: string): HeaderNavLink[] {
  return MOBILE_NAV_ITEMS.map((item) => ({
    ...item,
    ariaCurrent: getNavAriaCurrent(pathname, item.href),
  }))
}

export function getHeaderNavigation(pathname: string) {
  return {
    mobile: {
      className: HEADER_MOBILE_NAV_CLASS_NAME,
      links: getMobileNavLinks(pathname),
    },
    desktop: {
      className: HEADER_DESKTOP_NAV_CLASS_NAME,
      links: PRIMARY_NAV_ITEMS.map((item) => ({
        ...item,
        ariaCurrent: getNavAriaCurrent(pathname, item.href),
      })),
    },
  }
}

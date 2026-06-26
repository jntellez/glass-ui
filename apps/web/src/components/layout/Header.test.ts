import { describe, expect, it } from "vitest"
import {
  getHeaderNavigation,
  getMobileNavLinks,
  getNavAriaCurrent,
  HEADER_MOBILE_NAV_CLASS_NAME,
  HEADER_NAV_BUTTON_CLASS_NAME,
  PRIMARY_NAV_ITEMS,
} from "./nav"

describe("Header shell integration", () => {
  it("marks the customization nav item as the current page when the route matches", () => {
    expect(getNavAriaCurrent("/customization", "/customization")).toBe("page")
    expect(getNavAriaCurrent("/customization/", "/customization")).toBe("page")
  })

  it("leaves aria-current undefined for non-matching routes", () => {
    expect(getNavAriaCurrent("/docs", "/customization")).toBeUndefined()
    expect(getNavAriaCurrent("/customization/components", "/customization")).toBeUndefined()
  })

  it("keeps customization available in the mobile shortcut nav", () => {
    expect(PRIMARY_NAV_ITEMS.map((item) => item.href)).toContain("/customization")
    expect(getMobileNavLinks("/customization")).toEqual([
      { href: "/customization", label: "Customization", ariaCurrent: "page" },
    ])
    expect(getMobileNavLinks("/docs")).toEqual([
      { href: "/customization", label: "Customization", ariaCurrent: undefined },
    ])
  })

  it("keeps the Header mobile shortcut render contract focused on the customization page", () => {
    const navigation = getHeaderNavigation("/customization")

    expect(navigation.mobile.className).toBe(HEADER_MOBILE_NAV_CLASS_NAME)
    expect(HEADER_NAV_BUTTON_CLASS_NAME).toBe("hover:border-transparent hover:glass px-3")
    expect(navigation.mobile.links).toEqual([
      { href: "/customization", label: "Customization", ariaCurrent: "page" },
    ])
  })
})

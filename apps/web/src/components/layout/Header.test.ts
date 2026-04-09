import { describe, expect, it } from "vitest"
import { getNavAriaCurrent } from "./nav"

describe("Header shell integration", () => {
  it("marks the customization nav item as the current page when the route matches", () => {
    expect(getNavAriaCurrent("/customization", "/customization")).toBe("page")
    expect(getNavAriaCurrent("/customization/", "/customization")).toBe("page")
  })

  it("leaves aria-current undefined for non-matching routes", () => {
    expect(getNavAriaCurrent("/docs", "/customization")).toBeUndefined()
    expect(getNavAriaCurrent("/customization/components", "/customization")).toBeUndefined()
  })
})

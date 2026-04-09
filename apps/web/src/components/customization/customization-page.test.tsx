import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import {
  CUSTOMIZATION_PAGE_DESCRIPTION,
  getCustomizationPageA11yProps,
  getCustomizationPageSectionClassName,
} from "./customization-page"

describe("customization page shell helpers", () => {
  it("keeps the metadata description stable", () => {
    expect(CUSTOMIZATION_PAGE_DESCRIPTION).toBe(
      "Tune the canonical glass tokens, preview them locally, and export deterministic CSS.",
    )
  })

  it("returns the full-bleed shell props without docs-width framing", () => {
    expect(getCustomizationPageA11yProps()).toEqual({
      headingId: "customization-title",
      descriptionId: "customization-description",
      labelledBy: "customization-title",
      describedBy: "customization-description",
    })

    const className = getCustomizationPageSectionClassName("bg-background")

    expect(className).toContain("min-h-[calc(100vh-8rem)]")
    expect(className).toContain("bg-background")
    expect(className).not.toContain("max-w-7xl")
  })
})

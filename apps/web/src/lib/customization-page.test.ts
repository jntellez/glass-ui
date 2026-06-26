import { describe, expect, it } from "vitest"
import { CUSTOMIZATION_PAGE_DESCRIPTION, CUSTOMIZATION_PAGE_TITLE } from "./customization-page"

describe("customization page", () => {
  it("keeps the document metadata concise", () => {
    expect(CUSTOMIZATION_PAGE_TITLE).toBe("Customization editor - Glass UI")
    expect(CUSTOMIZATION_PAGE_DESCRIPTION).toBe(
      "Tune the canonical glass tokens, preview them locally, and export deterministic CSS.",
    )
  })
})

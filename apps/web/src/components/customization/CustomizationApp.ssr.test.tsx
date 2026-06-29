/** @vitest-environment node */

import { renderToString } from "react-dom/server"
import { describe, expect, it } from "vitest"
import { CustomizationApp } from "./CustomizationApp"

describe("CustomizationApp SSR", () => {
  it("server-renders the customization workspace without browser globals", () => {
    const html = renderToString(<CustomizationApp />)

    expect(html).toContain("Customization workspace")
    expect(html).toContain("Preview")
    expect(html).toContain("Enter fullscreen preview")
  })
})

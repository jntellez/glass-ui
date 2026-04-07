import { describe, expect, it } from "vitest"
import { darkModeDocs, flattenedDocs, installationDocs, sidebarNav } from "./docs"

describe("docs config", () => {
  it("keeps flattened docs in sync with the sidebar navigation", () => {
    expect(flattenedDocs).toEqual(sidebarNav.flatMap((section) => section.items))
  })

  it("keeps installation docs under the installation section", () => {
    expect(installationDocs.map((doc) => doc.href)).toEqual([
      "/docs/installation/next",
      "/docs/installation/vite",
      "/docs/installation/astro",
      "/docs/installation/manual",
    ])
  })

  it("keeps dark mode docs under the dark mode section", () => {
    expect(darkModeDocs.map((doc) => doc.href)).toEqual([
      "/docs/dark-mode/next",
      "/docs/dark-mode/vite",
      "/docs/dark-mode/astro",
      "/docs/dark-mode/manual",
    ])
  })
})

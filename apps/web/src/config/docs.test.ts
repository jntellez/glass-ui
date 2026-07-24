import { describe, expect, it } from "vitest"
import { darkModeDocs, docsCommandItems, flattenedDocs, installationDocs, sidebarNav } from "./docs"

describe("docs config", () => {
  it("keeps flattened docs in sync with the sidebar navigation", () => {
    expect(flattenedDocs).toEqual(sidebarNav.flatMap((section) => section.items))
    expect(sidebarNav.find((section) => section.title === "Getting Started")?.items).toContainEqual(
      {
        title: "AI Skills",
        href: "/docs/ai-skills",
      },
    )
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

  it("exposes command items for sidebar and guide routes", () => {
    expect(docsCommandItems).toContainEqual({
      title: "AI Skills",
      href: "/docs/ai-skills",
      section: "Getting Started",
    })
    expect(docsCommandItems).toContainEqual({
      title: "Command",
      href: "/docs/components/command",
      section: "Components",
    })
    expect(docsCommandItems).toContainEqual({
      title: "Next.js",
      href: "/docs/installation/next",
      section: "Installation Guides",
    })
    expect(docsCommandItems).toContainEqual({
      title: "Manual",
      href: "/docs/dark-mode/manual",
      section: "Dark Mode Guides",
    })
  })
})

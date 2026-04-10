export type NavItem = {
  title: string
  href: string
}

export type SidebarSection = {
  title: string
  items: NavItem[]
}

export const sidebarNav: SidebarSection[] = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "/docs" },
      { title: "Installation", href: "/docs/installation" },
      { title: "Dark Mode", href: "/docs/dark-mode" },
      { title: "Components", href: "/docs/components" },
      { title: "CLI", href: "/docs/cli" },
    ],
  },
  {
    title: "Components",
    items: [
      { title: "Badge", href: "/docs/components/badge" },
      { title: "Button", href: "/docs/components/button" },
      { title: "Checkbox", href: "/docs/components/checkbox" },
      { title: "Card", href: "/docs/components/card" },
      { title: "Field", href: "/docs/components/field" },
      { title: "Input", href: "/docs/components/input" },
      { title: "Label", href: "/docs/components/label" },
      { title: "Textarea", href: "/docs/components/textarea" },
    ],
  },
]

// Main list
export const flattenedDocs: NavItem[] = sidebarNav.flatMap((section) => section.items)

// Sublist for installation page
export const installationDocs: NavItem[] = [
  { title: "Next.js", href: "/docs/installation/next" },
  { title: "Vite", href: "/docs/installation/vite" },
  { title: "Astro", href: "/docs/installation/astro" },
  { title: "Manual", href: "/docs/installation/manual" },
]

// Sublist for dark mode page
export const darkModeDocs: NavItem[] = [
  { title: "Next.js", href: "/docs/dark-mode/next" },
  { title: "Vite", href: "/docs/dark-mode/vite" },
  { title: "Astro", href: "/docs/dark-mode/astro" },
  { title: "Manual", href: "/docs/dark-mode/manual" },
]

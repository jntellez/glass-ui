import { describe, expect, it } from "vitest"
import { registryIndexSchema } from "@glass-ui-kit/schema"
import { registry } from "./registry"

const expectedNames = [
  "accordion",
  "badge",
  "button",
  "card",
  "checkbox",
  "collapsible",
  "color-picker",
  "dialog",
  "dropdown-menu",
  "field",
  "input",
  "label",
  "native-select",
  "popover",
  "radio-group",
  "select",
  "slider",
  "switch",
  "tabs",
  "textarea",
] as const

const expectedDependenciesByName = {
  accordion: ["@radix-ui/react-accordion", "class-variance-authority", "clsx", "tailwind-merge"],
  button: ["@radix-ui/react-slot", "class-variance-authority", "clsx", "tailwind-merge"],
  collapsible: [
    "@radix-ui/react-collapsible",
    "class-variance-authority",
    "clsx",
    "tailwind-merge",
  ],
  "color-picker": ["class-variance-authority", "clsx", "tailwind-merge"],
  dialog: ["@radix-ui/react-dialog", "class-variance-authority", "clsx", "tailwind-merge"],
  "dropdown-menu": [
    "@radix-ui/react-dropdown-menu",
    "class-variance-authority",
    "clsx",
    "tailwind-merge",
  ],
  popover: ["@radix-ui/react-popover", "class-variance-authority", "clsx", "tailwind-merge"],
  "radio-group": [
    "@radix-ui/react-radio-group",
    "class-variance-authority",
    "clsx",
    "tailwind-merge",
  ],
  select: ["@radix-ui/react-select", "class-variance-authority", "clsx", "tailwind-merge"],
  slider: ["@radix-ui/react-slider", "class-variance-authority", "clsx", "tailwind-merge"],
  switch: ["@radix-ui/react-switch", "class-variance-authority", "clsx", "tailwind-merge"],
  tabs: ["@radix-ui/react-tabs", "class-variance-authority", "clsx", "tailwind-merge"],
} satisfies Partial<Record<(typeof expectedNames)[number], string[]>>

describe("registry", () => {
  it("matches the registry schema", () => {
    expect(() => registryIndexSchema.parse(registry)).not.toThrow()
  })

  it("exposes the expected component entries in alphabetical order", () => {
    const names = registry.map((entry) => entry.name)

    expect(registry).toHaveLength(expectedNames.length)
    expect(names).toEqual(expectedNames)
    expect(new Set(names)).toHaveLength(expectedNames.length)
  })

  it("keeps each entry pointed at a single client ui file with shared deps", () => {
    for (const entry of registry) {
      expect(entry.type).toBe("registry:ui")
      expect(entry.dependencies).toEqual(
        expectedDependenciesByName[entry.name] ?? ["clsx", "tailwind-merge"],
      )
      expect(entry.files).toHaveLength(1)
      expect(entry.files[0]).toMatchObject({
        path:
          entry.name === "native-select"
            ? "ui/native-select/index.tsx"
            : `ui/${entry.name}/index.tsx`,
        type: "client",
      })
    }
  })
})

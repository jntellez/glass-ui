import { describe, expect, it } from "vitest"
import { registryIndexSchema } from "@glass-ui-kit/schema"
import { registry } from "./registry"

const expectedNames = [
  "accordion",
  "badge",
  "button",
  "checkbox",
  "card",
  "field",
  "input",
  "label",
  "native-select",
  "select",
  "textarea",
] as const

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
        entry.name === "accordion"
          ? ["@radix-ui/react-accordion", "class-variance-authority", "clsx", "tailwind-merge"]
          : entry.name === "button"
            ? ["@radix-ui/react-slot", "class-variance-authority", "clsx", "tailwind-merge"]
            : entry.name === "select"
              ? ["@radix-ui/react-select", "class-variance-authority", "clsx", "tailwind-merge"]
              : ["clsx", "tailwind-merge"],
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

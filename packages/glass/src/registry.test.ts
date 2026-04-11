import { describe, expect, it } from "vitest"
import { registryIndexSchema } from "@glass-ui-kit/schema"
import { registry } from "./registry"

const expectedNames = [
  "badge",
  "button",
  "checkbox",
  "card",
  "field",
  "input",
  "label",
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
      expect(entry.dependencies).toEqual(["clsx", "tailwind-merge"])
      expect(entry.files).toHaveLength(1)
      expect(entry.files[0]).toMatchObject({
        path: `ui/${entry.name}/index.tsx`,
        type: "client",
      })
    }
  })
})

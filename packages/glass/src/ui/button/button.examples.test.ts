import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import { describe, expect, it } from "vitest"

const componentGridSource = readFileSync(
  resolve(process.cwd(), "../../apps/web/src/components/docs/ComponentGrid.tsx"),
  "utf8",
)

const buttonDocsSource = readFileSync(
  resolve(process.cwd(), "../../apps/web/src/content/docs/components/button.mdx"),
  "utf8",
)

const registrySource = readFileSync(
  resolve(process.cwd(), "../../apps/web/public/registry.json"),
  "utf8",
)

describe("Button examples and published sources", () => {
  it("prefers prop-first variants and `asChild` in docs and examples", () => {
    expect(componentGridSource).toContain("asChild")
    expect(componentGridSource).toContain("href={item.href}")
    expect(componentGridSource).toContain('variant="ghost"')

    expect(buttonDocsSource).toContain('<Button variant="strong">Click me</Button>')
    expect(buttonDocsSource).toContain('<Button variant="transparent" />')
    expect(buttonDocsSource).toContain(
      '| `variant`   | `"default" \\| "soft" \\| "strong" \\| "transparent" \\| "ghost"`',
    )
    expect(buttonDocsSource).toContain('<ComponentPreview name="button-transparent" client:load />')
    expect(buttonDocsSource).toContain("Use `asChild` when you need link semantics")
    expect(buttonDocsSource).toContain('<ComponentPreview name="button-as-child" client:load />')
    expect(buttonDocsSource).toContain('<Button size="icon-sm" />')
    expect(buttonDocsSource).toContain('<Button size="icon" />')
    expect(buttonDocsSource).toContain('<Button size="icon-lg" />')
    expect(buttonDocsSource).toContain("Use `className` as an escape hatch")
    expect(buttonDocsSource).not.toContain("btn-icon")
  })

  it("publishes Button source with Slot and variant dependencies", () => {
    expect(registrySource).toContain('name": "button"')
    expect(registrySource).toContain("@radix-ui/react-slot")
    expect(registrySource).toContain("class-variance-authority")
    expect(registrySource).toContain("asChild?: boolean")
    expect(registrySource).toContain("outline")
  })
})

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
  it("prefers `as` for repo examples and navigation guidance", () => {
    expect(componentGridSource).toContain('as="a"')
    expect(componentGridSource).toContain("href={item.href}")
    expect(componentGridSource).not.toContain("asChild")

    expect(buttonDocsSource).toContain('Use `as="a"` for navigation and always provide `href`.')
    expect(buttonDocsSource).toContain('<Button as="a" href="/docs" className="glass">')
    expect(buttonDocsSource).not.toContain("asChild")
  })

  it("publishes Button source without deprecated `asChild` support", () => {
    expect(registrySource).toContain('name": "button"')
    expect(registrySource).toContain("as?: C")
    expect(registrySource).not.toContain("asChild")
  })
})

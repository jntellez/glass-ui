import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import { describe, expect, it } from "vitest"

const inputDocsSource = readFileSync(
  resolve(process.cwd(), "../../apps/web/src/content/docs/components/input.mdx"),
  "utf8",
)

const inputExamplesSource = readFileSync(
  resolve(process.cwd(), "../../apps/web/src/examples/input/input-sizes.tsx"),
  "utf8",
)

const inputErrorExampleSource = readFileSync(
  resolve(process.cwd(), "../../apps/web/src/examples/input/input-error.tsx"),
  "utf8",
)

describe("Input examples and docs", () => {
  it("prefers the prop-first API in docs and examples", () => {
    expect(inputDocsSource).toContain(
      '<Input type="email" variant="soft" size="md" placeholder="Email address" />',
    )
    expect(inputDocsSource).toContain('<Input variant="default" />')
    expect(inputDocsSource).toContain('<Input variant="soft" />')
    expect(inputDocsSource).toContain('<Input variant="strong" />')
    expect(inputDocsSource).toContain('<Input variant="transparent" />')
    expect(inputDocsSource).toContain('<Input size="sm" />')
    expect(inputDocsSource).toContain('<Input size="md" />')
    expect(inputDocsSource).toContain('<Input size="lg" />')
    expect(inputDocsSource).toContain("use `className` as an escape hatch")
    expect(inputDocsSource).not.toContain("input-sm")
    expect(inputDocsSource).not.toContain("input-md")
    expect(inputDocsSource).not.toContain("input-lg")

    expect(inputExamplesSource).toContain('<Input size="sm" placeholder="Small input" />')
    expect(inputExamplesSource).toContain('<Input size="md" placeholder="Medium input" />')
    expect(inputExamplesSource).toContain('<Input size="lg" placeholder="Large input" />')
    expect(inputExamplesSource).not.toContain("input-sm")
    expect(inputExamplesSource).not.toContain("input-md")
    expect(inputExamplesSource).not.toContain("input-lg")

    expect(inputDocsSource).toContain(
      'Set `aria-invalid="true"` to opt into the built-in destructive border and focus ring.',
    )
    expect(inputErrorExampleSource).toContain('aria-invalid="true"')
    expect(inputErrorExampleSource).not.toContain("border-destructive/50")
    expect(inputErrorExampleSource).not.toContain("focus-visible:ring-destructive/50")
  })
})

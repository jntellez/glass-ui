import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import { describe, expect, it } from "vitest"

const textareaDocsSource = readFileSync(
  resolve(process.cwd(), "../../apps/web/src/content/docs/components/textarea.mdx"),
  "utf8",
)

const textareaSizesExampleSource = readFileSync(
  resolve(process.cwd(), "../../apps/web/src/examples/textarea/textarea-sizes.tsx"),
  "utf8",
)

const textareaErrorExampleSource = readFileSync(
  resolve(process.cwd(), "../../apps/web/src/examples/textarea/textarea-error.tsx"),
  "utf8",
)

describe("Textarea examples and docs", () => {
  it("prefers the prop-first API in docs and examples", () => {
    expect(textareaDocsSource).toContain(
      '<Textarea variant="soft" size="md" placeholder="Share your thoughts" />',
    )
    expect(textareaDocsSource).toContain('<Textarea variant="default" />')
    expect(textareaDocsSource).toContain('<Textarea variant="soft" />')
    expect(textareaDocsSource).toContain('<Textarea variant="strong" />')
    expect(textareaDocsSource).toContain('<Textarea variant="transparent" />')
    expect(textareaDocsSource).toContain('<Textarea size="sm" />')
    expect(textareaDocsSource).toContain('<Textarea size="md" />')
    expect(textareaDocsSource).toContain('<Textarea size="lg" />')
    expect(textareaDocsSource).toContain("use `className` as an escape hatch")
    expect(textareaDocsSource).not.toContain('className="glass')

    expect(textareaSizesExampleSource).toContain(
      '<Textarea size="sm" rows={3} placeholder="Small textarea" />',
    )
    expect(textareaSizesExampleSource).toContain(
      '<Textarea size="md" rows={4} placeholder="Medium textarea" />',
    )
    expect(textareaSizesExampleSource).toContain(
      '<Textarea size="lg" rows={5} placeholder="Large textarea" />',
    )

    expect(textareaDocsSource).toContain(
      'Set `aria-invalid="true"` to opt into the built-in destructive border and focus ring.',
    )
    expect(textareaErrorExampleSource).toContain('aria-invalid="true"')
    expect(textareaErrorExampleSource).not.toContain("border-destructive/50")
    expect(textareaErrorExampleSource).not.toContain("focus-visible:ring-destructive/50")
  })
})

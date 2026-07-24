import { existsSync, readFileSync } from "node:fs"
import { resolve } from "node:path"
import { describe, expect, it } from "vitest"

const skillPath = resolve(process.cwd(), "public/skills/glass-ui-page-builder/SKILL.md")

describe("glass-ui-page-builder skill", () => {
  it("keeps the portable skill contract valid", () => {
    expect(existsSync(skillPath)).toBe(true)

    const skill = readFileSync(skillPath, "utf8")
    const frontmatter = skill.match(/^---\n([\s\S]*?)\n---/)?.[1]
    const description = frontmatter?.match(/^description:\s*(.+)$/m)?.[1].trim()

    expect(frontmatter).toBeDefined()
    expect(frontmatter).toMatch(/^name:\s*glass-ui-page-builder$/m)
    expect(description).toBeTruthy()
    expect(skill).not.toMatch(/\b(?:from\s+|import\s+)["']@glass-ui-kit\/glass["']/)
  })
})

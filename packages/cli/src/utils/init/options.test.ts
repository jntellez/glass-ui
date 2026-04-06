import { describe, expect, it } from "vitest"
import { resolveInitOptions } from "./options"

describe("resolveInitOptions", () => {
  it("resolves projectRoot from cwd without mutating process state", () => {
    expect(resolveInitOptions({ cwd: "../demo-app" }, "/workspace/current")).toMatchObject({
      projectRoot: "/workspace/demo-app",
      force: false,
      install: true,
    })
  })

  it("maps no-install semantics to install false", () => {
    expect(resolveInitOptions({ install: false })).toMatchObject({
      install: false,
    })
  })

  it("preserves css, alias, and framework overrides", () => {
    expect(
      resolveInitOptions({
        css: "src/app/globals.css",
        components: "@/ui/components",
        utils: "@/shared/utils",
        framework: "next",
        force: true,
      }),
    ).toEqual({
      projectRoot: process.cwd(),
      cssOverride: "src/app/globals.css",
      componentsAliasOverride: "@/ui/components",
      utilsAliasOverride: "@/shared/utils",
      frameworkOverride: "next",
      force: true,
      install: true,
    })
  })

  it("rejects unsupported framework overrides before any writes", () => {
    expect(() => resolveInitOptions({ framework: "astro" as never })).toThrow(
      'Unsupported framework "astro". Supported values: react, vite, next, remix.',
    )
  })
})

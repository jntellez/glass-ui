import { describe, expect, it } from "vitest"
import { getCliVersion } from "./get-cli-version"

describe("getCliVersion", () => {
  it("reads the CLI version from package metadata", () => {
    expect(getCliVersion(() => JSON.stringify({ version: "1.2.3" }))).toBe("1.2.3")
  })

  it("falls back when package metadata has no string version", () => {
    expect(getCliVersion(() => JSON.stringify({ version: 123 }))).toBe("0.0.0")
  })
})

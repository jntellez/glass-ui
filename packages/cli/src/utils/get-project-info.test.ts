import { describe, expect, it, vi } from "vitest"

const mockedExists = vi.hoisted(() => vi.fn())

vi.mock("./filesystem", () => ({
  exists: mockedExists,
  readFile: vi.fn(),
}))

import { getLockfilePath, getPackageManager } from "./get-project-info"

describe("get-project-info", () => {
  it.each(["bun.lock", "bun.lockb"])("detects %s as Bun", async (lockfile) => {
    mockedExists.mockImplementation(
      (filePath: string, projectRoot: string) =>
        filePath === lockfile && projectRoot === "/workspace",
    )

    expect(getLockfilePath("/workspace", mockedExists)).toBe(lockfile)
    expect(await getPackageManager("/workspace")).toBe("bun")
    mockedExists.mockReset()
  })
})

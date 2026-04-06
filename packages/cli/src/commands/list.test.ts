import { describe, expect, it, vi } from "vitest"
import type { RegistryIndex } from "@glass-ui-kit/schema"
import { createListAction, runListCommand } from "./list"

const registry: RegistryIndex = [
  {
    name: "button",
    type: "registry:ui",
    dependencies: ["clsx"],
    files: [{ type: "client", path: "button.tsx", content: "export const Button = () => null;" }],
  },
  {
    name: "card",
    type: "registry:ui",
    dependencies: ["tailwind-merge"],
    files: [{ type: "client", path: "card.tsx", content: "export const Card = () => null;" }],
  },
]

describe("runListCommand", () => {
  it("returns newline-delimited component names in registry order", async () => {
    await expect(
      runListCommand(
        {},
        {
          fetchRegistry: async () => registry,
        },
      ),
    ).resolves.toBe("button\ncard")
  })

  it("returns an empty string for an empty registry", async () => {
    await expect(
      runListCommand(
        {},
        {
          fetchRegistry: async () => [],
        },
      ),
    ).resolves.toBe("")
  })

  it("returns the validated registry payload as formatted json", async () => {
    await expect(
      runListCommand(
        { json: true },
        {
          fetchRegistry: async () => registry,
        },
      ),
    ).resolves.toBe(JSON.stringify(registry, null, 2))
  })
})

describe("createListAction", () => {
  it("forwards the json flag through the command boundary", async () => {
    const runner = vi.fn().mockResolvedValue("[]")
    const log = vi.fn()
    const action = createListAction({
      runListCommand: runner,
      error: vi.fn(),
      log,
      exit: vi.fn() as never,
    })

    await action({ json: true })

    expect(runner).toHaveBeenCalledWith({ json: true })
    expect(log).toHaveBeenCalledWith("[]")
  })

  it("does not print placeholder output for an empty registry", async () => {
    const log = vi.fn()
    const action = createListAction({
      runListCommand: vi.fn().mockResolvedValue(""),
      error: vi.fn(),
      log,
      exit: vi.fn() as never,
    })

    await action({})

    expect(log).not.toHaveBeenCalled()
  })

  it("prints preserved registry failures through the command boundary", async () => {
    const error = vi.fn()
    const exit = vi.fn(() => {
      throw new Error("exit")
    })
    const action = createListAction({
      runListCommand: vi
        .fn()
        .mockRejectedValue(
          new Error(
            "Network error: Unable to connect to registry. Check your internet connection.",
          ),
        ),
      error,
      log: vi.fn(),
      exit: exit as never,
    })

    await expect(action({})).rejects.toThrow("exit")

    expect(error).toHaveBeenNthCalledWith(1, expect.stringContaining("List failed:"))
    expect(error).toHaveBeenNthCalledWith(
      2,
      expect.stringContaining("Network error: Unable to connect to registry"),
    )
    expect(exit).toHaveBeenCalledWith(1)
  })

  it("prints preserved schema failures through the command boundary", async () => {
    const error = vi.fn()
    const exit = vi.fn(() => {
      throw new Error("exit")
    })
    const action = createListAction({
      runListCommand: vi
        .fn()
        .mockRejectedValue(
          new Error(
            "Incompatible registry version. Your CLI might be outdated. Please try updating @glass-ui-kit/cli.",
          ),
        ),
      error,
      log: vi.fn(),
      exit: exit as never,
    })

    await expect(action({ json: true })).rejects.toThrow("exit")

    expect(error).toHaveBeenNthCalledWith(1, expect.stringContaining("List failed:"))
    expect(error).toHaveBeenNthCalledWith(
      2,
      expect.stringContaining("Incompatible registry version. Your CLI might be outdated."),
    )
    expect(exit).toHaveBeenCalledWith(1)
  })
})

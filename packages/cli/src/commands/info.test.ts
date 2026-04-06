import { describe, expect, it, vi } from "vitest"
import type { RegistryItem } from "@glass-ui-kit/schema"
import { createInfoAction, runInfoCommand } from "./info"

const cardItem: RegistryItem = {
  name: "card",
  type: "registry:ui",
  files: [
    { path: "card.tsx", type: "client", content: "export const Card = () => null;" },
    { path: "card-header.tsx", type: "server", content: "export const CardHeader = () => null;" },
  ],
  dependencies: ["clsx", "tailwind-merge"],
  devDependencies: ["@types/react"],
  registryDependencies: ["button", "separator"],
  meta: {
    requiresBlur: true,
  },
}

const sparseItem: RegistryItem = {
  name: "badge",
  type: "registry:ui",
  files: [{ path: "badge.tsx", type: "client", content: "export const Badge = () => null;" }],
  dependencies: [],
  devDependencies: [],
  registryDependencies: [],
}

describe("runInfoCommand", () => {
  it("returns deterministic text output for an exact registry match", async () => {
    await expect(
      runInfoCommand(
        "card",
        {},
        {
          fetchRegistry: async () => [cardItem],
          getItem: (registry, name) => registry.find((item) => item.name === name),
        },
      ),
    ).resolves.toBe(
      [
        "Name: card",
        "Type: registry:ui",
        "Files:",
        "- card.tsx (client)",
        "- card-header.tsx (server)",
        "Dependencies: clsx, tailwind-merge",
        "Dev Dependencies: @types/react",
        "Registry Dependencies: button, separator",
        "Requires Blur: true",
      ].join("\n"),
    )
  })

  it("renders None placeholders for empty dependency sections", async () => {
    await expect(
      runInfoCommand(
        "badge",
        {},
        {
          fetchRegistry: async () => [sparseItem],
          getItem: (registry, name) => registry.find((item) => item.name === name),
        },
      ),
    ).resolves.toBe(
      [
        "Name: badge",
        "Type: registry:ui",
        "Files:",
        "- badge.tsx (client)",
        "Dependencies: None",
        "Dev Dependencies: None",
        "Registry Dependencies: None",
      ].join("\n"),
    )
  })

  it("returns the matched item as formatted json", async () => {
    await expect(
      runInfoCommand(
        "card",
        { json: true },
        {
          fetchRegistry: async () => [cardItem],
          getItem: (registry, name) => registry.find((item) => item.name === name),
        },
      ),
    ).resolves.toBe(JSON.stringify(cardItem, null, 2))
  })

  it("treats case changes as a missing exact match", async () => {
    await expect(
      runInfoCommand(
        "Card",
        {},
        {
          fetchRegistry: async () => [cardItem],
          getItem: (registry, name) => registry.find((item) => item.name === name),
        },
      ),
    ).rejects.toThrow('Component not found: "Card"')
  })

  it("treats partial names as missing exact matches", async () => {
    await expect(
      runInfoCommand(
        "car",
        {},
        {
          fetchRegistry: async () => [cardItem],
          getItem: (registry, name) => registry.find((item) => item.name === name),
        },
      ),
    ).rejects.toThrow('Component not found: "car"')
  })
})

describe("createInfoAction", () => {
  it("forwards the component name and json flag through the command boundary", async () => {
    const runner = vi.fn().mockResolvedValue("{}")
    const log = vi.fn()
    const action = createInfoAction({
      runInfoCommand: runner,
      error: vi.fn(),
      log,
      exit: vi.fn() as never,
    })

    await action("card", { json: true })

    expect(runner).toHaveBeenCalledWith("card", { json: true })
    expect(log).toHaveBeenCalledWith("{}")
  })

  it("prints the missing component detail after the Info failed prefix and exits 1", async () => {
    const error = vi.fn()
    const exit = vi.fn(() => {
      throw new Error("exit")
    })
    const action = createInfoAction({
      runInfoCommand: vi.fn().mockRejectedValue(new Error('Component not found: "Button"')),
      error,
      log: vi.fn(),
      exit: exit as never,
    })

    await expect(action("Button", {})).rejects.toThrow("exit")

    expect(error).toHaveBeenNthCalledWith(1, expect.stringContaining("Info failed:"))
    expect(error).toHaveBeenNthCalledWith(
      2,
      expect.stringContaining('Component not found: "Button"'),
    )
    expect(exit).toHaveBeenCalledWith(1)
  })

  it("preserves underlying registry detail messages verbatim", async () => {
    const error = vi.fn()
    const exit = vi.fn(() => {
      throw new Error("exit")
    })
    const action = createInfoAction({
      runInfoCommand: vi
        .fn()
        .mockRejectedValue(new Error("Schema validation failed: files[0].path is required")),
      error,
      log: vi.fn(),
      exit: exit as never,
    })

    await expect(action("card", {})).rejects.toThrow("exit")

    expect(error).toHaveBeenNthCalledWith(1, expect.stringContaining("Info failed:"))
    expect(error).toHaveBeenNthCalledWith(
      2,
      expect.stringContaining("Schema validation failed: files[0].path is required"),
    )
    expect(exit).toHaveBeenCalledWith(1)
  })

  it("keeps out-of-scope inspection options unsupported at the command boundary", async () => {
    const runner = vi.fn().mockResolvedValue("{}")
    const action = createInfoAction({
      runInfoCommand: runner,
      error: vi.fn(),
      log: vi.fn(),
      exit: vi.fn() as never,
    })

    await action("card", { json: true, cwd: ".", search: true } as never)

    expect(runner).toHaveBeenCalledWith("card", { json: true })
  })
})

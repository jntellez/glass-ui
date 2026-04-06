import { describe, expect, it, vi } from "vitest"
import { createDoctorAction } from "./doctor"

describe("createDoctorAction", () => {
  it("forwards the cwd and json flags through the command boundary", async () => {
    const runner = vi.fn().mockResolvedValue("{}")
    const log = vi.fn()
    const action = createDoctorAction({
      runDoctorCommand: runner,
      error: vi.fn(),
      log,
      exit: vi.fn() as never,
    })

    await action({ cwd: "../app", json: true })

    expect(runner).toHaveBeenCalledWith({ cwd: "../app", json: true })
    expect(log).toHaveBeenCalledWith("{}")
  })

  it("prints unreachable-directory failures after the doctor failed prefix and exits 1", async () => {
    const error = vi.fn()
    const exit = vi.fn(() => {
      throw new Error("exit")
    })
    const action = createDoctorAction({
      runDoctorCommand: vi
        .fn()
        .mockRejectedValue(
          new Error(
            'Could not inspect directory "/missing": path does not exist or is not accessible.',
          ),
        ),
      error,
      log: vi.fn(),
      exit: exit as never,
    })

    await expect(action({ cwd: "/missing" })).rejects.toThrow("exit")

    expect(error).toHaveBeenNthCalledWith(1, expect.stringContaining("Doctor failed:"))
    expect(error).toHaveBeenNthCalledWith(
      2,
      expect.stringContaining('Could not inspect directory "/missing"'),
    )
    expect(exit).toHaveBeenCalledWith(1)
  })

  it("keeps the command boundary limited to logging output and handling exits", async () => {
    const runner = vi.fn().mockResolvedValue("ready")
    const log = vi.fn()
    const error = vi.fn()
    const exit = vi.fn() as never
    const action = createDoctorAction({
      runDoctorCommand: runner,
      error,
      log,
      exit,
    })

    await action({ cwd: "../app", json: false } as never)

    expect(runner).toHaveBeenCalledTimes(1)
    expect(log).toHaveBeenCalledWith("ready")
    expect(error).not.toHaveBeenCalled()
    expect(exit).not.toHaveBeenCalled()
  })
})

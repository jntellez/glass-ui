import { defineConfig, devices } from "@playwright/test"
import { fileURLToPath } from "node:url"

const projectRoot = fileURLToPath(new URL(".", import.meta.url))

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: 0,
  use: {
    baseURL: "http://localhost:4321",
    trace: "on-first-retry",
    ...devices["Desktop Chrome"],
  },
  webServer: {
    command: "pnpm build && pnpm smoke:serve -- --host localhost --port 4321",
    cwd: projectRoot,
    port: 4321,
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
})

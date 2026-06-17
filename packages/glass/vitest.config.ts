import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    forbidOnly: Boolean(process.env.CI),
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
    },
  },
})

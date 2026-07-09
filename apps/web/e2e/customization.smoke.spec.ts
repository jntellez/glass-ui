import { expect, test } from "@playwright/test"

test("customization page hydrates and core interactions stay usable", async ({ page }) => {
  const pageErrors: string[] = []
  const consoleErrors: string[] = []

  page.on("pageerror", (error) => {
    pageErrors.push(error.message)
  })

  page.on("console", (message) => {
    if (message.type() === "error") {
      consoleErrors.push(message.text())
    }
  })

  await page.goto("/customization")

  await expect(page.getByRole("region", { name: /customization workspace/i })).toBeVisible()

  await page.getByRole("button", { name: "Dark" }).click()
  await expect(page.getByRole("button", { name: "Dark" })).toHaveAttribute("aria-pressed", "true")

  await page.getByRole("button", { name: "Light" }).click()
  await expect(page.getByRole("button", { name: "Light" })).toHaveAttribute("aria-pressed", "true")

  await page.getByRole("button", { name: /select theme/i }).click()
  await page
    .getByLabel("Themes")
    .getByRole("button", { name: /midnight bloom/i })
    .click()
  await expect(page.getByRole("button", { name: "Select theme: Midnight Bloom" })).toBeVisible()

  await page.getByRole("button", { name: /enter fullscreen preview/i }).click()
  const fullscreenDialog = page.getByRole("dialog", { name: /fullscreen preview/i })
  await expect(fullscreenDialog).toBeVisible()
  await fullscreenDialog.getByRole("button", { name: /exit fullscreen preview/i }).click()
  await expect(fullscreenDialog).toBeHidden()

  expect(pageErrors, `Page errors: ${pageErrors.join(" | ")}`).toEqual([])
  expect(consoleErrors, `Console errors: ${consoleErrors.join(" | ")}`).toEqual([])
})

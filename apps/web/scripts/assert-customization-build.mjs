import { readFile } from "node:fs/promises"
import path from "node:path"

const customizationPagePath = path.resolve("dist/customization/index.html")
const html = await readFile(customizationPagePath, "utf8")

const requiredMarkers = ["astro-island", "Customization workspace", "Enter fullscreen preview"]

for (const marker of requiredMarkers) {
  if (!html.includes(marker)) {
    throw new Error(
      `Expected ${customizationPagePath} to include \"${marker}\" so the customization route cannot ship blank.`,
    )
  }
}

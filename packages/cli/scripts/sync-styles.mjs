import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

// Set up base paths
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Paths to your CSS files
const tokensPath = path.resolve(__dirname, "../../glass/src/css/tokens.css")
const indexPath = path.resolve(__dirname, "../../glass/src/css/index.css")
const targetPath = path.resolve(__dirname, "../src/templates/styles.ts")

console.log("🔄 Syncing CSS to CLI...")

try {
  // 1. Read files
  const tokensCode = fs.readFileSync(tokensPath, "utf-8")
  const indexCode = fs.readFileSync(indexPath, "utf-8")

  // 2. Clean up the import statement (removes @import './tokens.css')
  const cleanIndexCode = indexCode.replace(/@import\s+['"]\.\/tokens\.css['"];?/g, "")

  // 3. Declare the @theme block for Tailwind v4
  const tailwindThemeBlock = `
@theme {
  --color-foreground: var(--foreground);
  --color-muted-foreground: var(--muted-foreground);
  --color-glass-bg: var(--glass-bg);
  --color-glass-border: var(--glass-border);
  --shadow-glass: var(--glass-shadow);
  --shadow-glass-sm: var(--glass-shadow-sm);
  --shadow-glass-md: var(--glass-shadow-md);
  --shadow-glass-lg: var(--glass-shadow-lg);
  --backdrop-blur-glass: var(--glass-blur);
  --radius-glass-sm: var(--glass-radius-sm);
  --radius-glass-md: var(--glass-radius-md);
  --radius-glass-lg: var(--glass-radius-lg);
  --radius-glass-xl: var(--glass-radius-xl);
}`

  // 3.5. Extra global utilities (Password reset and Gradient background)
  const globalUtilities = `
/* --- Global Utilities Injected by Glass UI --- */

/* Hide native reveal icons in password inputs */
input[type="password"]::-ms-reveal,
input[type="password"]::-ms-clear {
  display: none;
  width: 0;
  height: 0;
}

/* Provisional gradient background to highlight Glassmorphism */
body {
  /* Pastel gradient for light mode */
  background: linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%);
  background-attachment: fixed;
  color: var(--foreground);
  min-height: 100vh;
}

.dark body {
  /* Deep gradient for dark mode */
  background: linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%);
  background-attachment: fixed;
  color: var(--foreground);
}
`

  // 4. Merge everything in the correct order
  let combinedCSS = `${tokensCode}\n${tailwindThemeBlock}\n${globalUtilities}\n${cleanIndexCode}`

  // Clean up whitespace and ensure consistent formatting
  combinedCSS = combinedCSS
    .replace(/\r\n/g, "\n")
    .replace(/^[ \t]+$/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim()

  // Protect special characters before injecting into TypeScript
  const safeCSS = combinedCSS
    .replace(/\\/g, "\\\\") // Protect backslashes (e.g., .hover\:glass)
    .replace(/`/g, "\\`") // Protect backticks
    .replace(/\$/g, "\\$") // Protect dollar signs

  // 5. Create the exportable content using safeCSS
  const tsContent = `// AUTO-GENERATED FILE. DO NOT EDIT MANUALLY.
// Run 'pnpm run sync' to update this content.

export const GLASS_BASE_STYLES = \`
${safeCSS}
\`;
`

  // 6. Overwrite the file
  fs.writeFileSync(targetPath, tsContent, "utf-8")
  console.log("✅ styles.ts successfully updated with gradient background and utilities.")
} catch (error) {
  console.error("❌ Error syncing styles:", error.message)
  process.exit(1)
}

import { defineConfig } from "astro/config"
import react from "@astrojs/react"
import mdx from "@astrojs/mdx"
import tailwindcss from "@tailwindcss/vite"

import icon from "astro-icon"

// https://astro.build/config
export default defineConfig({
  integrations: [react(), mdx(), icon()],
  vite: {
    resolve: {
      dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
    },
    plugins: [tailwindcss()],
  },
})

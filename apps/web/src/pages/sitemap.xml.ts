import type { APIRoute } from "astro"
import { getCollection } from "astro:content"

const SITE_URL = "https://ui-glass.vercel.app"

export const GET: APIRoute = async () => {
  const docsEntries = await getCollection("docs")
  const paths = docsEntries.map((entry: { id: string }) => {
    let slug = entry.id.replace(/\.mdx?$/, "").replace(/\/index$/, "")

    if (slug === "index") {
      slug = ""
    }

    return `/docs${slug ? `/${slug}` : ""}`
  })
  const urls = ["/", "/customization", ...paths]
    .sort()
    .map((path) => `  <url><loc>${new URL(path, SITE_URL)}</loc></url>`)
    .join("\n")

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`,
    {
      headers: { "Content-Type": "application/xml" },
    },
  )
}

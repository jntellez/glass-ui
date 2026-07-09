import { createReadStream } from "node:fs"
import { access, stat } from "node:fs/promises"
import { createServer } from "node:http"
import path from "node:path"
import process from "node:process"

const args = process.argv.slice(2)

const getArgValue = (flag, fallback) => {
  const flagIndex = args.indexOf(flag)
  if (flagIndex === -1) {
    return fallback
  }

  return args[flagIndex + 1] ?? fallback
}

const host = getArgValue("--host", "127.0.0.1")
const port = Number(getArgValue("--port", "4321"))
const distRoot = path.resolve("dist")

const mimeTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".ico", "image/x-icon"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".map", "application/json; charset=utf-8"],
  [".mjs", "text/javascript; charset=utf-8"],
  [".png", "image/png"],
  [".svg", "image/svg+xml"],
  [".txt", "text/plain; charset=utf-8"],
  [".webp", "image/webp"],
  [".woff", "font/woff"],
  [".woff2", "font/woff2"],
])

const respond = (response, statusCode, body) => {
  response.writeHead(statusCode, { "content-type": "text/plain; charset=utf-8" })
  response.end(body)
}

const canAccess = async (targetPath) => {
  try {
    await access(targetPath)
    return true
  } catch {
    return false
  }
}

const isWithinDistRoot = (targetPath) => {
  const relativePath = path.relative(distRoot, targetPath)

  return relativePath === "" || (!relativePath.startsWith("..") && !path.isAbsolute(relativePath))
}

const resolveRequestPath = async (requestUrl) => {
  const url = new URL(requestUrl, `http://${host}:${port}`)
  const decodedPath = decodeURIComponent(url.pathname)
  const relativePath = decodedPath.replace(/^\/+/, "")
  const requestedPath = path.resolve(distRoot, relativePath)

  if (!isWithinDistRoot(requestedPath)) {
    return null
  }

  const candidates = []

  if (decodedPath.endsWith("/")) {
    candidates.push(path.join(requestedPath, "index.html"))
  } else {
    candidates.push(requestedPath)
    candidates.push(path.join(requestedPath, "index.html"))
  }

  for (const candidate of candidates) {
    if (isWithinDistRoot(candidate) && (await canAccess(candidate))) {
      const candidateStats = await stat(candidate)
      if (candidateStats.isFile()) {
        return candidate
      }
    }
  }

  return null
}

await access(distRoot)

const server = createServer(async (request, response) => {
  if (!request.url) {
    respond(response, 400, "Missing request URL")
    return
  }

  if (request.method !== "GET" && request.method !== "HEAD") {
    response.writeHead(405, { allow: "GET, HEAD" })
    response.end()
    return
  }

  const filePath = await resolveRequestPath(request.url)

  if (!filePath) {
    respond(response, 404, "Not Found")
    return
  }

  const extension = path.extname(filePath)
  const contentType = mimeTypes.get(extension) ?? "application/octet-stream"

  response.writeHead(200, { "content-type": contentType })

  if (request.method === "HEAD") {
    response.end()
    return
  }

  createReadStream(filePath).pipe(response)
})

server.listen(port, host, () => {
  console.log(`Serving ${distRoot} at http://${host}:${port}`)
})

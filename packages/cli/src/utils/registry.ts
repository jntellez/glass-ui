import path from "node:path"
import os from "node:os"
import fs from "node:fs/promises"
import { registryIndexSchema, type RegistryIndex, type RegistryItem } from "@glass-ui-kit/schema"

const DEFAULT_REGISTRY_URL = "https://ui-glass.vercel.app/registry.json"
const CACHE_DIR = path.join(os.homedir(), ".glass-ui")
const CACHE_FILE = path.join(CACHE_DIR, "registry.json")
const CACHE_TTL = 1000 * 60 * 60 * 24 // 24 Hours

interface CacheData {
  lastUpdated: number
  data: RegistryIndex
}

function getRegistryUrl(): string {
  return process.env.GLASS_UI_REGISTRY_URL || DEFAULT_REGISTRY_URL
}

async function readCache(): Promise<RegistryIndex | null> {
  try {
    const fileExists = await fs
      .stat(CACHE_FILE)
      .then(() => true)
      .catch(() => false)
    if (!fileExists) return null

    const raw = await fs.readFile(CACHE_FILE, "utf-8")
    const cache: CacheData = JSON.parse(raw)

    const now = Date.now()
    if (now - cache.lastUpdated > CACHE_TTL) {
      return null // Expired
    }

    return cache.data
  } catch {
    return null // Corrupt cache or read error, treat as miss
  }
}

async function writeCache(data: RegistryIndex) {
  try {
    // Ensure directory exists
    await fs.mkdir(CACHE_DIR, { recursive: true })

    const cache: CacheData = {
      lastUpdated: Date.now(),
      data,
    }

    await fs.writeFile(CACHE_FILE, JSON.stringify(cache), "utf-8")
  } catch {
    // Silently fail on write errors (e.g., read-only filesystem)
    // We don't want to block the user if we can't cache.
  }
}

function getErrorMessage(error: unknown, fallback: string) {
  if (error instanceof Error && error.message.length > 0) {
    return error.message
  }

  return fallback
}

export async function fetchRegistry(): Promise<RegistryIndex> {
  // 1. Try Cache First
  const cachedRegistry = await readCache()
  if (cachedRegistry) {
    return cachedRegistry
  }

  // 2. Network Fetch
  const url = getRegistryUrl()
  let response

  try {
    response = await fetch(url)
  } catch (error) {
    throw new Error(getErrorMessage(error, "Network error: Unable to connect to registry."))
  }

  if (!response.ok) {
    throw new Error(`Registry unavailable. URL: ${url} (Status: ${response.status})`)
  }

  let data
  try {
    data = await response.json()
  } catch (error) {
    throw new Error(getErrorMessage(error, "Invalid response: Registry returned non-JSON data."))
  }

  // 3. Schema & Version Validation
  const parsed = registryIndexSchema.safeParse(data)

  if (!parsed.success) {
    const issue = parsed.error.issues[0]
    const location = issue?.path.length ? issue.path.join(".") : "registry"
    throw new Error(`${issue?.message ?? "Schema validation failed"}: ${location}`)
  }

  // 4. Update Cache
  await writeCache(parsed.data)

  return parsed.data
}

export function getItem(registry: RegistryIndex, name: string): RegistryItem | undefined {
  return registry.find((item) => item.name === name)
}

export function getItems(
  registry: RegistryIndex,
  names: string[],
): { items: RegistryItem[]; missing: string[] } {
  const items: RegistryItem[] = []
  const missing: string[] = []

  for (const name of names) {
    const item = getItem(registry, name)

    if (item) {
      items.push(item)
      continue
    }

    missing.push(name)
  }

  return { items, missing }
}

import { fetchRegistry, getItem } from "../registry"
import { formatInfo } from "./format-info"

export type InfoOptions = {
  json?: boolean
}

export type InfoRuntime = {
  fetchRegistry: typeof fetchRegistry
  getItem: typeof getItem
}

export const defaultRuntime: InfoRuntime = {
  fetchRegistry,
  getItem,
}

export async function runInfoCommand(
  componentName: string,
  options: InfoOptions = {},
  runtime: InfoRuntime = defaultRuntime,
): Promise<string> {
  const registry = await runtime.fetchRegistry()
  const item = runtime.getItem(registry, componentName)

  if (!item) {
    throw new Error(`Component not found: "${componentName}"`)
  }

  if (options.json) {
    return JSON.stringify(item, null, 2)
  }

  return formatInfo(item)
}

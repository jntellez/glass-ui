import path from "node:path"
import type { RegistryItem } from "@glass-ui-kit/schema"
import type { Config } from "../get-project-info"
import { transformImports } from "../transformers"
import { resolveTargetDir } from "./paths"

export type PlannedWrite = {
  filePath: string
  content: string
  action: "write" | "skip-existing"
}

type BuildWritePlanOptions = {
  exists: (filePath: string) => boolean
  overwrite?: boolean
  path?: string
}

export function buildWritePlan(
  items: RegistryItem[],
  config: Config,
  hasSrc: boolean,
  options: BuildWritePlanOptions,
): PlannedWrite[] {
  const targetDir = resolveTargetDir(config, hasSrc, options.path)

  return items.flatMap((item) =>
    item.files
      .filter((file) => Boolean(file.content))
      .map((file) => {
        const fileName = path.basename(file.path)
        const filePath = path.join(targetDir, fileName)

        return {
          filePath,
          content: transformImports(file.content || "", config),
          action: !options.overwrite && options.exists(filePath) ? "skip-existing" : "write",
        }
      }),
  )
}

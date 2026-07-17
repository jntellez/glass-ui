import { readFileSync } from "node:fs"

type PackageJson = {
  version?: unknown
}

export function getCliVersion(
  readPackageJson: (path: URL, encoding: BufferEncoding) => string = readFileSync,
): string {
  const packageJson = JSON.parse(
    readPackageJson(new URL("../package.json", import.meta.url), "utf8"),
  ) as PackageJson

  return typeof packageJson.version === "string" ? packageJson.version : "0.0.0"
}

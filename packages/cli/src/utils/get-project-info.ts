import path from "node:path";
import { exists } from "./filesystem";

export type Framework = "next" | "vite" | "astro" | "unknown";
export type PackageManager = "npm" | "pnpm" | "bun" | "yarn";

export async function getPackageManager(): Promise<PackageManager> {
  if (exists("bun.lockb")) return "bun";
  if (exists("pnpm-lock.yaml")) return "pnpm";
  if (exists("yarn.lock")) return "yarn";
  return "npm";
}

export async function getFramework(): Promise<Framework> {
  if (!exists("package.json")) return "unknown";

  const pkg = await Bun.file("package.json").json();
  const deps = { ...pkg.dependencies, ...pkg.devDependencies };

  if (deps["next"]) return "next";
  if (deps["astro"]) return "astro";
  if (deps["vite"]) return "vite";

  return "unknown";
}

export function getCssPath(framework: Framework): string | null {
  const paths = {
    next: ["app/globals.css", "src/app/globals.css", "styles/globals.css"],
    vite: ["src/index.css", "src/main.css", "src/style.css"],
    astro: ["src/styles/global.css", "src/global.css"],
    unknown: ["src/index.css", "styles.css"],
  };

  for (const p of paths[framework] || []) {
    if (exists(p)) return p;
  }

  // Fallback si no encuentra el archivo existente pero conocemos el framework
  return paths[framework]?.[0] || null;
}

export async function installDependencies(deps: string[], pm: PackageManager) {
  const installCmd = pm === "npm" ? "install" : "add";
  const args = [installCmd, ...deps];

  // Bun.spawn es la forma nativa y rápida de ejecutar subprocesos en Bun
  const proc = Bun.spawn([pm, ...args], {
    stdout: "inherit",
    stderr: "inherit",
  });

  await proc.exited;
}

import { spawn } from "node:child_process";
import { exists, readFile } from "./filesystem";

export type Framework = "next" | "vite" | "astro" | "remix" | "unknown";
export type PackageManager = "npm" | "pnpm" | "bun" | "yarn";

export interface Config {
  framework: Framework;
  style: string;
  css: string;
  aliases: {
    components: string;
    utils: string;
  };
}

export async function getPackageManager(): Promise<PackageManager> {
  if (exists("bun.lockb")) return "bun";
  if (exists("pnpm-lock.yaml")) return "pnpm";
  if (exists("yarn.lock")) return "yarn";
  return "npm";
}

export async function getFramework(): Promise<Framework> {
  if (!exists("package.json")) return "unknown";

  try {
    const content = await readFile("package.json");
    const pkg = JSON.parse(content);
    const deps = { ...pkg.dependencies, ...pkg.devDependencies };

    if (
      deps["@remix-run/react"] ||
      deps["@remix-run/dev"] ||
      deps["@react-router/dev"] ||
      deps["@react-router/node"]
    ) {
      return "remix";
    }
    if (deps["next"]) return "next";
    if (deps["astro"]) return "astro";
    if (deps["vite"]) return "vite";
  } catch (error) {
    return "unknown";
  }
  return "unknown";
}

export function getCssPath(framework: Framework): string | null {
  const paths: Record<Framework, string[]> = {
    next: ["app/globals.css", "src/app/globals.css", "styles/globals.css"],
    vite: ["src/index.css", "src/main.css", "src/style.css"],
    astro: ["src/styles/global.css", "src/global.css"],
    remix: [
      "app/app.css",
      "app/tailwind.css",
      "app/globals.css",
      "app/styles/tailwind.css",
    ],
    unknown: ["src/index.css", "styles.css"],
  };

  for (const p of paths[framework] || []) {
    if (exists(p)) return p;
  }
  return paths[framework]?.[0] || null;
}

export async function installDependencies(deps: string[], pm: PackageManager) {
  const installCmd = pm === "npm" ? "install" : "add";
  console.log(`Running ${pm} ${installCmd}...`);
  return new Promise<void>((resolve, reject) => {
    const child = spawn(pm, [installCmd, ...deps], {
      stdio: "inherit",
      shell: true,
    });
    child.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(`Failed to install dependencies. Code: ${code}`));
        return;
      }
      resolve();
    });
  });
}

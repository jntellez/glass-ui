import { spawn } from "node:child_process";
import { exists, readFile } from "./filesystem";

export type Framework = "next" | "vite" | "astro" | "unknown";
export type PackageManager = "npm" | "pnpm" | "bun" | "yarn";

export async function getPackageManager(): Promise<PackageManager> {
  // El orden importa: checkeamos lockfiles específicos primero
  if (exists("bun.lockb")) return "bun";
  if (exists("pnpm-lock.yaml")) return "pnpm";
  if (exists("yarn.lock")) return "yarn";
  return "npm";
}

export async function getFramework(): Promise<Framework> {
  if (!exists("package.json")) return "unknown";

  try {
    // REEMPLAZO: Usamos nuestra utilidad readFile + JSON.parse
    const content = await readFile("package.json");
    const pkg = JSON.parse(content);

    // Unificamos dependencias para buscar
    const deps = { ...pkg.dependencies, ...pkg.devDependencies };

    if (deps["next"]) return "next";
    if (deps["astro"]) return "astro";
    if (deps["vite"]) return "vite";
  } catch (error) {
    // Si el JSON está mal formado, asumimos unknown
    return "unknown";
  }

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

  return paths[framework]?.[0] || null;
}

export async function installDependencies(deps: string[], pm: PackageManager) {
  const installCmd = pm === "npm" ? "install" : "add";

  console.log(`Running ${pm} ${installCmd}...`);

  // REEMPLAZO: Usamos spawn de Node.js envuelto en una Promesa
  return new Promise<void>((resolve, reject) => {
    const child = spawn(pm, [installCmd, ...deps], {
      stdio: "inherit", // Para ver los colores y logs del instalador
      shell: true, // CRÍTICO para Windows (ejecuta npm.cmd/pnpm.cmd correctamente)
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

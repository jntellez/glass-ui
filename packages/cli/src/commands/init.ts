import chalk from "chalk";
import { Command } from "commander";
import path from "node:path";
import { writeFile, readFile, exists } from "../utils/filesystem";
import {
  getFramework,
  getPackageManager,
  getCssPath,
  installDependencies,
} from "../utils/get-project-info";
import { GLASS_BASE_STYLES } from "../templates/styles";
import { UTILS_CN } from "../templates/utils";

export const init = new Command()
  .name("init")
  .description("Initialize configuration and dependencies")
  .option("-y, --yes", "Skip confirmation prompt", false)
  .action(async (opts) => {
    try {
      console.log(chalk.bold("\nInitializing Glass UI..."));

      // 1. Detección de entorno
      const framework = await getFramework();
      const pm = await getPackageManager();
      const cwd = process.cwd();
      const configPath = "glass.config.json";

      // Detectar si existe la carpeta src/ en la raíz del proyecto
      const hasSrc = exists("src");

      // Paths predeterminados
      let cssPath = getCssPath(framework);
      if (!cssPath || framework === "next") {
        cssPath = hasSrc ? "src/app/globals.css" : "app/globals.css";
      }

      // Configurar dinámicamente la ruta física de utils.ts
      const utilsPath = path.join(
        cwd,
        hasSrc ? "src/lib/utils.ts" : "lib/utils.ts",
      );

      // 2. Crear archivo de configuración
      if (!exists(configPath)) {
        await writeFile(
          configPath,
          JSON.stringify(
            {
              framework,
              style: "default",
              css: cssPath,
              aliases: {
                components: "@/components/ui",
                utils: "@/lib/utils",
              },
            },
            null,
            2,
          ),
        );
        console.log(chalk.green("  Created glass.config.json"));
      } else {
        console.log(chalk.gray("  glass.config.json already exists."));
      }

      // 3. Crear utilidad 'cn' dinámicamente
      if (!exists(utilsPath)) {
        await writeFile(utilsPath, UTILS_CN);
        const displayPath = hasSrc ? "src/lib/utils.ts" : "lib/utils.ts";
        console.log(chalk.green(`  Created ${displayPath}`));
      } else {
        const displayPath = hasSrc ? "src/lib/utils.ts" : "lib/utils.ts";
        console.log(chalk.gray(`  ${displayPath} already exists.`));
      }

      // 4. Inyección de CSS (Glass Tokens)
      let cssContent = "";
      try {
        if (exists(cssPath)) {
          // Aún leemos el archivo para saber si ya tiene los tokens y no sobreescribir repetidamente
          cssContent = await readFile(cssPath);
        } else {
          console.log(chalk.yellow(`  Creating new CSS file at ${cssPath}`));
        }
      } catch (e) {
        // Fallback silencioso
      }

      // CAMBIO: Reemplazo total del archivo
      if (!cssContent.includes("--glass-bg")) {
        const newCssContent = `@import "tailwindcss";\n\n${GLASS_BASE_STYLES}`;
        await writeFile(cssPath, newCssContent);
        console.log(
          chalk.green(
            `  Overwrote ${cssPath} with Tailwind import and glass tokens`,
          ),
        );
      } else {
        console.log(chalk.gray(`  Tokens already present in ${cssPath}`));
      }

      // 5. Instalación de Dependencias (Crítico para 'cn')
      console.log(
        chalk.cyan(
          `  Installing dependencies (clsx, tailwind-merge, lucide-react)...`,
        ),
      );
      await installDependencies(["clsx", "tailwind-merge", "lucide-react"], pm);

      const runCommand =
        pm === "bun" ? "bunx" : pm === "pnpm" ? "pnpm dlx" : "npx";

      // Mensaje Final Profesional
      console.log(chalk.bold.green("\nSetup complete."));
      console.log(`Try adding a component:\n`);
      console.log(
        chalk.cyan(`  ${runCommand} @glass-ui-kit/cli@latest add card`),
      );
      console.log("");
    } catch (error) {
      console.error(chalk.red("\nInitialization failed:"));
      if (error instanceof Error) {
        console.error(chalk.gray(error.message));
      } else {
        console.error(chalk.gray(String(error)));
      }
      process.exit(1);
    }
  });

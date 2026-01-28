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
import { GLASS_TOKENS, UTILS_CN } from "../utils/templates";

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

      // Paths predeterminados
      // Intentamos detectar el CSS, si falla usamos default
      let cssPath = getCssPath(framework);
      if (!cssPath) {
        cssPath = "src/index.css";
        // Nota: Aquí podrías agregar un warning sutil si quieres,
        // pero para mantenerlo limpio lo dejamos implícito.
      }

      const utilsPath = path.join(cwd, "src/lib/utils.ts");

      // 2. Crear archivo de configuración
      if (!exists(configPath)) {
        await writeFile(
          configPath,
          JSON.stringify(
            {
              framework,
              style: "default",
              css: cssPath,
              aliases: { components: "@/components/ui", utils: "@/lib/utils" },
            },
            null,
            2,
          ),
        );
        console.log(chalk.green("  Created glass.config.json"));
      } else {
        console.log(chalk.gray("  glass.config.json already exists."));
      }

      // 3. Crear utilidad 'cn' (src/lib/utils.ts)
      if (!exists(utilsPath)) {
        // Aseguramos que el usuario tenga la utilidad base para clases condicionales
        await writeFile(utilsPath, UTILS_CN);
        console.log(chalk.green("  Created src/lib/utils.ts"));
      } else {
        console.log(chalk.gray("  src/lib/utils.ts already exists."));
      }

      // 4. Inyección de CSS (Glass Tokens)
      let cssContent = "";
      try {
        if (exists(cssPath)) {
          cssContent = await readFile(cssPath);
        } else {
          // Si no existe, lo creamos vacío para inyectarle los tokens
          console.log(chalk.yellow(`  Creating new CSS file at ${cssPath}`));
        }
      } catch (e) {
        // Fallback silencioso
      }

      if (!cssContent.includes("--glass-surface")) {
        const newCssContent = `${GLASS_TOKENS}\n${cssContent}`;
        await writeFile(cssPath, newCssContent);
        console.log(chalk.green(`  Updated ${cssPath} with glass tokens`));
      } else {
        console.log(chalk.gray(`  Tokens already present in ${cssPath}`));
      }

      // 5. Instalación de Dependencias (Crítico para 'cn')
      console.log(
        chalk.cyan(`  Installing dependencies (clsx, tailwind-merge)...`),
      );
      await installDependencies(["clsx", "tailwind-merge"], pm);

      // Mensaje Final Profesional
      console.log(chalk.bold.green("\nSetup complete."));
      console.log(`Try adding a component:\n`);
      console.log(chalk.cyan(`  npx @glass-ui-kit/cli@latest add card`));
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

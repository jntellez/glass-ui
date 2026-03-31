import chalk from "chalk";
import { Command } from "commander";
import path from "node:path";
import { exists, readFile, writeFile } from "../utils/filesystem";
import { fetchRegistry, getItem } from "../utils/registry";
import {
  getPackageManager,
  installDependencies,
  Config,
} from "../utils/get-project-info";
import { transformImports } from "../utils/transformers";

export const add = new Command()
  .name("add")
  .description("Add a component to your project")
  .argument("<component>", "The component to add")
  .action(async (componentName) => {
    try {
      // 1. Validate Environment
      if (!exists("glass.config.json")) {
        console.error(chalk.red("Configuration file not found."));
        console.log(chalk.gray("Please run the init command first:"));
        console.log(chalk.cyan("  npx @glass-ui-kit/cli@latest init"));
        process.exit(1);
      }

      // Leemos la config y la tipeamos
      const config: Config = JSON.parse(await readFile("glass.config.json"));
      const pm = await getPackageManager();

      console.log(chalk.bold(`Fetching component: ${componentName}...`));

      // 2. Fetch Registry
      const registry = await fetchRegistry();
      const item = getItem(registry, componentName);

      // 3. Validate Component
      if (!item) {
        console.error(chalk.red(`Component '${componentName}' not found.`));
        process.exit(1);
      }

      // NUEVO: Detectar si existe la carpeta src/ en la raíz
      const hasSrc = exists("src");

      // 4. Resolve Paths (Lógica dinámica para src/)
      const targetDirAlias = config.aliases.components || "@/components/ui";

      // Removemos el prefijo del alias (ej. "@/") para obtener el path relativo
      const relativeAliasPath = targetDirAlias.replace(/^@\//, "");

      // Construimos el path físico dependiendo de si existe src/
      const targetDir = hasSrc
        ? `./src/${relativeAliasPath}`
        : `./${relativeAliasPath}`;

      // 5. Write Files (CON TRANSFORMACIÓN)
      for (const file of item.files) {
        const fileName = path.basename(file.path);
        const filePath = path.join(targetDir, fileName);

        if (!file.content) {
          continue;
        }

        // === CAMBIO CRÍTICO: Transformamos el contenido antes de guardar ===
        const transformedContent = transformImports(file.content, config);

        await writeFile(filePath, transformedContent);
        console.log(chalk.green(`  Created ${filePath}`));
      }

      // 6. Install Dependencies
      if (item.dependencies?.length) {
        console.log(chalk.cyan(`  Installing dependencies...`));
        await installDependencies(item.dependencies, pm);
      }

      console.log(chalk.bold.green(`\nDone.`));
    } catch (error) {
      console.error(chalk.red("\nOperation failed:"));
      if (error instanceof Error) {
        console.error(chalk.gray(`  ${error.message}`));
      }
      process.exit(1);
    }
  });

import chalk from "chalk";
import { Command } from "commander";
import path from "node:path";
import { exists, readFile, writeFile } from "../utils/filesystem";
import { fetchRegistry, getItem } from "../utils/registry";
import {
  getPackageManager,
  installDependencies,
} from "../utils/get-project-info";

export const add = new Command()
  .name("add")
  .description("Add a component to your project")
  .argument("<component>", "The component to add")
  .action(async (componentName) => {
    try {
      // 1. Validar entorno (Glass Config)
      if (!exists("glass.config.json")) {
        console.error(
          chalk.red("❌ Missing glass.config.json. Run 'glass-ui init' first."),
        );
        process.exit(1);
      }

      const config = JSON.parse(await readFile("glass.config.json"));
      const pm = await getPackageManager();

      console.log(
        chalk.blue(`🔮 Fetching component: ${chalk.bold(componentName)}...`),
      );

      // 2. Obtener Registry
      const registry = await fetchRegistry();
      const item = getItem(registry, componentName);

      if (!item) {
        console.error(
          chalk.red(`❌ Component '${componentName}' not found in registry.`),
        );
        process.exit(1);
      }

      // 3. Resolver Rutas (Simple Alias Resolution)
      // Asumimos que "@/components/ui" -> "./src/components/ui"
      // En una versión futura, leeremos tsconfig.json para exactitud.
      const targetDirAlias = config.aliases.components || "@/components/ui";
      const targetDir = targetDirAlias.replace(/^@\//, "./src/");

      // 4. Escribir Archivos
      console.log(chalk.gray("   Writing files..."));
      for (const file of item.files) {
        // file.path viene como "ui/glass-card.tsx" o simple "glass-card.tsx"
        // Lo normalizamos al targetDir del usuario
        const fileName = path.basename(file.path);
        const filePath = path.join(targetDir, fileName);

        if (!file.content) {
          console.warn(chalk.yellow(`⚠️  No content for ${fileName}`));
          continue;
        }

        await writeFile(filePath, file.content);
        console.log(chalk.green(`   ✅ ${filePath}`));
      }

      // 5. Instalar Dependencias
      if (item.dependencies?.length) {
        console.log(chalk.blue(`\n📦 Installing dependencies with ${pm}...`));
        await installDependencies(item.dependencies, pm);
      }

      console.log(
        chalk.bold.green(`\n🎉 ${componentName} added successfully!`),
      );
    } catch (error) {
      console.error(chalk.red("❌ Error adding component:"), error);
      process.exit(1);
    }
  });

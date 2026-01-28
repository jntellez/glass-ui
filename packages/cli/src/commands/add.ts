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
      // 1. Validate Environment
      if (!exists("glass.config.json")) {
        console.error(chalk.red("Configuration file not found."));
        console.log(chalk.gray("Please run the init command first:"));
        console.log(chalk.cyan("  npx @glass-ui-kit/cli@latest init"));
        process.exit(1);
      }

      const config = JSON.parse(await readFile("glass.config.json"));
      const pm = await getPackageManager();

      console.log(chalk.bold(`Fetching component: ${componentName}...`));

      // 2. Fetch Registry (Cached or Network)
      const registry = await fetchRegistry();
      const item = getItem(registry, componentName);

      // 3. Validate Component Existence
      if (!item) {
        console.error(
          chalk.red(`Component '${componentName}' not found in registry.`),
        );
        console.log(chalk.gray("Available components:"));
        console.log(chalk.gray(`  ${registry.map((i) => i.name).join(", ")}`));
        process.exit(1);
      }

      // 4. Resolve Paths
      const targetDirAlias = config.aliases.components || "@/components/ui";
      const targetDir = targetDirAlias.replace(/^@\//, "./src/");

      // 5. Write Files
      for (const file of item.files) {
        const fileName = path.basename(file.path);
        const filePath = path.join(targetDir, fileName);

        if (!file.content) {
          continue;
        }

        await writeFile(filePath, file.content);
        console.log(chalk.green(`  Created ${filePath}`));
      }

      // 6. Install Dependencies
      if (item.dependencies?.length) {
        console.log(chalk.cyan(`  Installing dependencies...`));
        await installDependencies(item.dependencies, pm);
      }

      console.log(chalk.bold.green(`\nDone.`));
    } catch (error) {
      // UX-Friendly Error Handling
      console.error(chalk.red("\nOperation failed:"));

      if (error instanceof Error) {
        console.error(chalk.gray(`  ${error.message}`));
      } else {
        console.error(chalk.gray("  An unknown error occurred."));
      }

      process.exit(1);
    }
  });

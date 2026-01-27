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
        console.error(chalk.red("❌ Missing glass.config.json"));
        console.log(
          chalk.gray("   Run 'glass-ui init' to set up your project first."),
        );
        process.exit(1);
      }

      const config = JSON.parse(await readFile("glass.config.json"));
      const pm = await getPackageManager();

      console.log(
        chalk.blue(`🔮 Fetching component: ${chalk.bold(componentName)}...`),
      );

      // 2. Fetch Registry (Cached or Network)
      const registry = await fetchRegistry();
      const item = getItem(registry, componentName);

      // 3. Validate Component Existence
      if (!item) {
        console.error(
          chalk.red(`❌ Component '${chalk.bold(componentName)}' not found.`),
        );
        console.log(
          chalk.gray(
            `   Available components: ${registry.map((i) => i.name).join(", ")}`,
          ),
        );
        process.exit(1);
      }

      // 4. Resolve Paths
      const targetDirAlias = config.aliases.components || "@/components/ui";
      const targetDir = targetDirAlias.replace(/^@\//, "./src/");

      // 5. Write Files
      console.log(chalk.gray("   Writing files..."));
      for (const file of item.files) {
        const fileName = path.basename(file.path);
        const filePath = path.join(targetDir, fileName);

        if (!file.content) {
          console.warn(chalk.yellow(`⚠️  Skipping empty file: ${fileName}`));
          continue;
        }

        await writeFile(filePath, file.content);
        console.log(chalk.green(`   ✅ ${filePath}`));
      }

      // 6. Install Dependencies
      if (item.dependencies?.length) {
        console.log(chalk.blue(`\n📦 Installing dependencies with ${pm}...`));
        await installDependencies(item.dependencies, pm);
      }

      console.log(
        chalk.bold.green(`\n🎉 ${componentName} added successfully!`),
      );
    } catch (error) {
      // UX-Friendly Error Handling (No Stack Traces)
      console.error(chalk.red("\n❌ Operation failed:"));

      if (error instanceof Error) {
        console.error(chalk.white(`   ${error.message}`));
      } else {
        console.error(chalk.white("   An unknown error occurred."));
      }

      process.exit(1);
    }
  });

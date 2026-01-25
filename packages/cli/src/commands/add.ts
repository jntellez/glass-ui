import chalk from "chalk";
import { Command } from "commander";

export const add = new Command()
  .name("add")
  .description("Add a component to your project")
  .argument("[component]", "The component to add (e.g. button, card)")
  .action(async (component) => {
    if (!component) {
      console.log(chalk.red("Please specify a component name."));
      console.log(chalk.gray("Example: glass-ui add card"));
      process.exit(1);
    }

    try {
      console.log(
        chalk.blue(`Fetching component: ${chalk.bold(component)}...`),
      );

      // TODO: Aquí conectaremos con packages/schema y apps/web
      // 1. Fetch registry.json
      // 2. Validate schema
      // 3. Write files using utils/filesystem

      console.log(chalk.yellow("Registry connection not implemented yet."));
    } catch (error) {
      console.error(chalk.red("Error adding component:"), error);
    }
  });

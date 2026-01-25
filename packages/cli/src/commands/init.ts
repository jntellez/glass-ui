import chalk from "chalk";
import { Command } from "commander";
import { exists, writeFile } from "../utils/filesystem";

export const init = new Command()
  .name("init")
  .description("Initialize Glass UI configuration in your project")
  .option("-y, --yes", "Skip confirmation prompt", false)
  .action(async (opts) => {
    try {
      console.log(chalk.blue("Initializing Glass UI..."));

      // Simulación de chequeo de entorno
      const configPath = "glass.config.json"; // Placeholder

      if (exists(configPath)) {
        console.log(chalk.yellow(`⚠️ ${configPath} already exists.`));
      } else {
        // Demostración de capacidad de escritura (sin lógica real de tokens aún)
        await writeFile(
          configPath,
          JSON.stringify({ theme: "glass" }, null, 2),
        );
        console.log(
          chalk.green(`✅ Created default configuration at ./${configPath}`),
        );
      }

      console.log(chalk.gray("Next step: Run 'glass-ui add button'"));
    } catch (error) {
      console.error(chalk.red("❌ Error initializing:"), error);
      process.exit(1);
    }
  });

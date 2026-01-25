import chalk from "chalk";
import { Command } from "commander";
import { writeFile, readFile, exists } from "../utils/filesystem";
import {
  getFramework,
  getPackageManager,
  getCssPath,
} from "../utils/get-project-info";
import { GLASS_TOKENS } from "../templates/tokens";

export const init = new Command()
  .name("init")
  .description("Initialize Glass UI configuration in your project")
  .option("-y, --yes", "Skip confirmation prompt", false)
  .action(async (opts) => {
    try {
      console.log(chalk.bold.blue("\n🔮 Initializing Glass UI..."));

      // 1. Detección de entorno
      const framework = await getFramework();
      const pm = await getPackageManager();
      const configPath = "glass.config.json";

      console.log(
        chalk.gray(`   Detected Framework: ${chalk.white(framework)}`),
      );
      console.log(chalk.gray(`   Detected Manager:   ${chalk.white(pm)}`));

      // 2. Localización del CSS Global
      let cssPath = getCssPath(framework);

      if (!cssPath) {
        console.log(
          chalk.yellow("⚠️  Could not detect global CSS file automatically."),
        );
        // En un futuro aquí preguntaríamos al usuario, por ahora default
        cssPath = "src/index.css";
      }

      console.log(chalk.gray(`   Target CSS File:    ${chalk.white(cssPath)}`));

      if (!opts.yes) {
        // Simulación de pausa simple (en producción usaríamos prompts)
        console.log(chalk.gray("\n   (Running in auto-mode with -y for MVP)"));
      }

      // 3. Crear archivo de configuración
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
        console.log(chalk.green(`✅ Created config: ${configPath}`));
      } else {
        console.log(chalk.yellow(`ℹ️  Config file already exists.`));
      }

      // 4. Inyección de CSS
      let cssContent = "";
      try {
        cssContent = await readFile(cssPath);
      } catch (e) {
        console.log(chalk.yellow(`ℹ️  Creating new CSS file at ${cssPath}`));
      }

      if (!cssContent.includes("--glass-surface")) {
        const newCssContent = `${GLASS_TOKENS}\n${cssContent}`;
        await writeFile(cssPath, newCssContent);
        console.log(chalk.green(`✅ Injected tokens into ${cssPath}`));
      } else {
        console.log(chalk.gray(`ℹ️  Tokens already present in ${cssPath}`));
      }

      console.log(chalk.bold.green("\n🎉 Setup complete. Ready to build."));
      console.log(chalk.gray("   Try running: npx glass-ui add card"));
    } catch (error) {
      console.error(chalk.red("\n❌ Error initializing:"), error);
      process.exit(1);
    }
  });

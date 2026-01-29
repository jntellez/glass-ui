#!/usr/bin/env node
import { Command } from "commander";
import { init } from "./commands/init";
import { add } from "./commands/add";

// Definición de metadatos del CLI
const program = new Command();

program
  .name("glass-ui")
  .description("The Glass UI CLI - Add glassmorphism components to your app")
  .version("0.0.1");

// Registro de comandos
program.addCommand(init);
program.addCommand(add);

// Parseo de argumentos
program.parse(process.argv);

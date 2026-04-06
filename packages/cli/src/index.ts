#!/usr/bin/env node
import { Command } from "commander"
import { init } from "./commands/init"
import { add } from "./commands/add"
import { list } from "./commands/list"
import { info } from "./commands/info"
import { doctor } from "./commands/doctor"

// Definición de metadatos del CLI
const program = new Command()

program
  .name("glass-ui")
  .description("The Glass UI CLI - Add glassmorphism components to your app")
  .version("0.2.5")

// Registro de comandos
program.addCommand(init)
program.addCommand(add)
program.addCommand(list)
program.addCommand(info)
program.addCommand(doctor)

// Parseo de argumentos
program.parse(process.argv)

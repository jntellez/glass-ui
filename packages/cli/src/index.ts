#!/usr/bin/env node
import { Command } from "commander"
import { init } from "./commands/init"
import { add } from "./commands/add"
import { list } from "./commands/list"
import { info } from "./commands/info"
import { doctor } from "./commands/doctor"
import { getCliVersion } from "./utils/get-cli-version"

const program = new Command()

program
  .name("glass-ui")
  .description("The Glass UI CLI - Add glassmorphism components to your app")
  .version(getCliVersion())

program.addCommand(init)
program.addCommand(add)
program.addCommand(list)
program.addCommand(info)
program.addCommand(doctor)

program.parse(process.argv)

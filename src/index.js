#!/usr/bin/env node
import { Command } from "commander";
import create from "./commands/actions/create.js";
import { createRequire } from "module";

const { version } = createRequire(import.meta.url)("../package.json");

const program = new Command();
program
  .name("express-buddy")
  .description("Create a Node.js, Express project template")
  .version(version, "-v, --version", "output the current version")
  .arguments("[name]")
  .option("-t, --template <template>", "Choose a template type")
  .action(create);

program.parse(process.argv);

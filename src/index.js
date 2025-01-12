#!/usr/bin/env node
import { Command } from "commander";
import create from "./commands/actions/create.js";
const program = new Command();
program
    .name("create-express-buddy")
    .description("Create a Node.js, Express project template")
    .arguments('[name]')
    .action(create);
    
program.parse(process.argv);

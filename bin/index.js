#!/usr/bin/env node

const { cdHandler } = require('./cli');

const yargs = require("yargs")
  .scriptName("fcd")
  .option(
    "c",
    {
      alias: "configure",
      describe: "Add configuration",
      type: "boolean",
    },
  )
  .option(
    "v",
    {
      alias: "verbose",
      describe: "Run command in verbose mode",
      type: "boolean",
    },
  )
  .command(
    "$0 <folder>",
    "Change into the folder",
    yarg => yarg.positional("folder", { type: "string", describe: "The folder to cd into" }),
    argv => cdHandler(argv.folder, argv.verbose, argv.configure)
  )
  .help()
  .argv;

console.log(yargs)
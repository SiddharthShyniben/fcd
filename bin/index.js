#!/usr/bin/env node

const { handler } = require('./cli');

const yargs = require("yargs")
  .scriptName("fcd")
  .options({
    "v": {
      alias: "verbose",
      describe: "Run in verbose mode",
      type: "boolean",
    }
  })
  .command(
    "$0 <folder> [options]",
    "Change into the folder",
    yarg => yarg.positional("folder", { type: "string", describe: "The folder to cd into" }).example("fcd ./somewhere", "Your clipboard will now be filled with the path to somewhere"),
    argv => handler(argv.folder, argv.verbose)
  )
  .help()
  .argv;
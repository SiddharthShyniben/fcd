#!/usr/bin/env node

const { handler } = require("./cli");

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
    yarg => yarg
      .positional("folder", { type: "string", describe: "The folder to cd into" })
      .example("$0 someFolder", "The cli will search for someFolder in the cwd")
      .example("$0 someFolder -v", "The cli will search for someFolder in the cwd in verbose mode, listing all folders searched"),
    argv => handler(argv.folder, argv.verbose)
  )

  .recommendCommands()
  .help()
  .wrap(null)
  .epilogue("For more documentation, visit the github repo at https://github.com/SiddharthShyniben/fcd")
  .argv;
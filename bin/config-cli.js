#!/usr/bin/env node

const config = require("./config");
const messenger = require("./messenger");

const yargs = require("yargs")
  .scriptName("fcd-config")

  .command(
    "get <key>",
    "Get the value of a key",
    yarg => yarg
      .positional("key", { describe: "Key to get", type: "string" })
      .example("$0 get ignoredFolders", "get the list of ignored folders"),
    args => {
      let data = config[args.key];

      if (data !== undefined) messenger.success(`\`${args.key}\`: \`${JSON.stringify(data)}\``)
      else messenger.error(`Unknown key: ${args.key}`);
    }
  )

  .command(
    "set <key> <value>",
    "Set a configuration",
    yarg => yarg
      .positional("key", { describe: "Key to set", type: "string" })
      .positional("value", { describe: "Value to set", type: "string" })
      .example("$0 set ignoreDotFolders true", "set `ignoreDotFolders` to `true`")
      .example("$0 set ignoredFolders Trash,Library,node_modules,Music", "set (rewrite the whole) `ignoredFolders` to `Trash,Library,node_modules,Music`"),
    args => {
      if (args.value.search(",") !== -1) messenger.warn("Setting array values directly will overwrite all values", "not add to them. Use the add command if you meant to add");

      if (config[args.key] !== undefined) {
        config[args.key] = args.value;
        messenger.success(`Set \`${args.key}\` to \`${args.value}\``);
      } else messenger.error(`Unknown key: \`${args.key}\``);
    }
  )

  .command(
    "add <key> <values...>",
    "Add to a configuration with the array type",
    yarg => yarg
      .positional("key", { describe: "Key to set", type: "string" })
      .positional("values", { describe: "Value(s) to set", type: "string" })
      .example("$0 add ignoredFolders Music", "`Music` will be added to the ignored folders")
      .example("$0 add ignoreDotFolders true", "This will make `ignoreDotFolders` `false` because it is not an array"),
    args => {
      if (config[args.key] !== undefined) {
        const older = config[args.key];
        older.push?.(...args.values)
        config[args.key] = older.join?.();
        messenger.success(`Added \`${args.values.join()}\` to \`${args.key}\``);
      } else messenger.error(`Unknown key: \`${args.key}\``);
    }
  )

  .command(
    "path",
    "Get the path to the config file",
    yarg => yarg.example("$0 path", "get the path to the config file"),
    () => messenger.success(`Path: \`${config.path}\``)
  )

  .command(
    "reset [keys...]",
    "Reset all keys or given keys",
    yarg => yarg
      .example("$0 reset ignoredFolders ignoreDotFolders", "reset \`ignoredFolders\` and \`ignoreDotFolders\`")
      .example("$0 reset", "reset everything"),
    argv => {
      argv.keys ? config.reset(...argv.keys) : config.clear()
      messenger.success(`${argv.keys ? "`" + argv.keys.join() +"`" : "Config"} reset successfully`)
    }
  )

  .recommendCommands()
  .help()
  .wrap(null)
  // .locale("pirate")
  .epilogue("For more documentation, visit the github repo at https://github.com/SiddharthShyniben/fcd")
  .argv
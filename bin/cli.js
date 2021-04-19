const findit = require("findit");
const ora = require("ora");
const path = require("path");

const messenger = require("./messenger");
const config = require("./config");

let spinner;

const standardizePath = module.exports.standardizePath = input => {
  if (!input) return;
  
  const tildeExpander = require("tilde-expansion");

  // Normalize path ("~/Assets/../Files" => "~/Files") + Remove trailing slashes
  input = path.resolve(input).replace(/\/+$/, "");

  // Expand tildes ("~/Somewhere" => "/Users/<username>/Somewhere")
  tildeExpander(input, expanded => input = expanded);

  // Return dirname, foldername
  return { dirname: path.dirname(input), basename: path.basename(input) }
};

const handler = module.exports.handler = (input, verbose) => {
  if (verbose) messenger.info("Verbose mode on", "");

  input = standardizePath(input);

  if (input) {
    let folders = [];
    const ignoredFolders = config.ignoredFolders || ["Trash", "Library", "node_modules"];

    if (!verbose) spinner = ora("Searching...").start();

    const finder = findit(input.dirname);

    finder.on("directory", (dir, stat, stopǃ) => {
      if (verbose) messenger.info(`Searching ${dir}`);
      else spinner.text = `Searching ${dir}`;

      const base = path.basename(dir);

      if (ignoredFolders.includes(base)) {
        stopǃ(); // Love the exclamation? No? Ok delete it if you want ಠ_ಠ (PS: ಠ_ಠ is also a valid JavaScript variable name)
        verbose ? messenger.info(`Searching ${dir} aborted (ignored folder)`) : spinner.text += " aborted (ignored folder)";
      }

      if (config.ignoreDotFolders && base.startsWith(".") && base !== ".") {
        stopǃ();
        verbose ? messenger.info(`Searching ${dir} aborted (dot folder)`) : spinner.text += " aborted (dot folder)";
      }

      if (path.basename(dir) == input.basename) folders.push(dir);
    });

    finder.on("end", () => {
      if (!verbose) spinner.succeed("Search complete");
      else messenger.success("", "Search complete");

      // Now ask user where to cd and then cd
      askAndCD(folders, input.dirname);
    });

    // There's no other way path can be undefined so....
  } else messenger.error("No path specified", "This looks like a problem with fcd itself", "Please report this error at https://github.com/SiddharthShyniben/fcd");
};

const askAndCD = async (basesFound, dirname) => {
  if (basesFound.length == 0) {
    messenger.warn("Folder not found");
  } else if (basesFound.length == 1) {
    cd(basesFound[0]);
  } else {
    const { Select } = require("enquirer");

    const prompt = new Select({
      name: "folder",
      message: "Pick a folder to cd into",
      choices: basesFound
    });

    prompt.run()
      .then(answer => cd(answer, dirname))
      .catch(() => {});
  }
};

const cd = (basename, dirname) => {
  const clipboard = require("clipboardy");
  // write "cd (dirname or .)/basename(\n if preferred)"
  clipboard.write(`cd ${dirname || ""}${basename}${config.addNewlineToCopy ? "\n" : ""}`)
    .then(() => messenger.success("Command copied to clipboard successfully"));
};
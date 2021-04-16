const findit = require("findit");
const path = require("path");
const messenger = require("./messenger");
const ora = require("ora");

const { ignoreFolders: ignoredFolders } = require("./utils");

let spinner;

const handler = exports.handler = (pathStr, verbose) => {
  if (verbose) messenger.info("Verbose mode on", "");

  pathStr = standardizePath(pathStr);

  if (pathStr) {
    let folders = [];

    if (!verbose) spinner = ora("Searching...").start();

    const finder = findit(pathStr[0]);

    finder.on("directory", (dir, stat, stopǃ) => {
      if (verbose) messenger.info(`Searching ${dir}`);
      else spinner.text = `Searching ${dir}`;

      const base = path.basename(dir);

      if (ignoredFolders.includes(base)) {
        stopǃ(); // Love the exclamation? No? Ok delete it if you want ಠ_ಠ (PS: ಠ_ಠ is also a valid JavaScript variable name)
        verbose ? messenger.info(`Searching ${dir} aborted (ignored folder)`) : spinner.text += ' aborted (ignored folder)';
      }

      if (base.startsWith(".") && base !== ".") {
        stopǃ();
        verbose ? messenger.info(`Searching ${dir} aborted (dot folder)`) : spinner.text += ' aborted (dot folder)';
      }

      if (path.basename(dir) == pathStr[1]) folders.push(dir);
    });

    finder.on("end", () => {
      if (!verbose) spinner.succeed("Search complete");
      else messenger.info("", "Search complete");

      // Now ask user where to cd and then cd
      askAndCD(folders, pathStr[0]);
    });

    finder.on("error", messenger.error)

    // There's no other way path can be undefined so....
  } else messenger.error("No path specified", "This looks like a problem with fcd itself", "Please report this error at https://git.io/JOOUk");
};

// This is a really small function.
// But it's here in case I want to improve
const standardizePath = pathStr => {
  if (!pathStr) return;

  // Normalize path ("~/Assets/../Files" => "~/Files") + Remove trailing slashes
  pathStr = path.join(pathStr).replace(/\/+$/, "");

  // Return dirname, foldername
  return [path.dirname(pathStr), path.basename(pathStr)];
};

const askAndCD = async (folders, directory) => {
  if (folders.length == 0) {
    messenger.error("Folder not found");
  } else if (folders.length == 1) {
    cd(folders[0]);
  } else {
    const { Select } = require('enquirer');

    const prompt = new Select({
      name: 'folder',
      message: 'Pick a folder to cd into',
      choices: folders
    });

    prompt.run()
      .then(answer => cd(answer, directory))
      .catch(messenger.error);
  }
};

const cd = (basename, dirname) => {
  const clipboard = require("clipboardy");
  clipboard.write("cd " + (dirname ? dirname : ".") + "/" + basename + "\n").then(() => messenger.info("Command copied to clipboard successfully"));
};
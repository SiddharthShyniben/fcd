const findit = require("findit");
const path = require("path");
const messenger = require("./messenger");
const ora = require("ora");

let spinner;

function sleep(sleepDuration) {
  var now = new Date().getTime();
  while (new Date().getTime() < now + sleepDuration) { /* do nothing */ }
}

exports.cdHandler = (pathStr, verbose, config) => {
  if (config) return;

  if (verbose) messenger.info(["Verbose mode on", ""]);

  pathStr = standardizePath(pathStr);

  if (pathStr) {
    let folders = [];

    if (!verbose) spinner = ora("Searching...").start();

    const finder = findit(pathStr[0]);

    finder.on("directory", (dir, stat, stop) => {
      if (verbose) messenger.info([`Searching ${dir}`]);
      else spinner.text = `Searching ${dir}`;

      if (dir.endsWith("/" + pathStr[1]) || dir == pathStr[1]) folders.push(dir);
    });
    finder.on("end", () => {
      if (!verbose) spinner.succeed("Search complete");
      else messenger.info(["", "Search complete"]);

      // Now ask user where to cd
      askAndCD(folders, pathStr[0]);
    });

    // There's no other way path can be undefined so....
  } else messenger.error(["No path specified", "This looks like a problem with fcd itself", "Please report this error at https://git.io/JOOUk"]);
};

exports.configHandler = (config) => {
  console.log(config, "is the config");
};


// This is a really small function.
// But it's here in case I want to improve
const standardizePath = pathStr => {
  if (!pathStr) return;

  // Normalize path ("~/Assets/../Files" => "~/Files") + Remove trailing slashes
  pathStr = path.join(pathStr).replace(/\/+$/, "");

  // Return dirname, foldername
  return [path.dirname(pathStr), pathStr.split("/").pop()];
};

const askAndCD = async (folders, directory) => {
  if (folders.length == 0) {
    spinner.fail("Folder not found");
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
      .then(answer => cd(answer))
      .catch(console.error);
  }
};

const cd = dir => {
  const { exec } = require("child_process");
  exec("echo 'Hi'", { cwd: "." });
};
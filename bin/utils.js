
const ignoredFolders = exports.ignoredFolders = [
  "node_modules",
  "Library",
  "Trash"
];

const standardizePath = exports.standardizePath = input => {
  if (!input) return;
  
  const path = require("path");
  const tildeExpander = require('tilde-expansion');

  // Normalize path ("~/Assets/../Files" => "~/Files") + Remove trailing slashes
  input = path.resolve(input).replace(/\/+$/, "");

  // Expand tildes ("~/Somewhere" => "/Users/<username>/Somewhere")
  tildeExpander(input, expanded => input = expanded);

  // Return dirname, foldername
  return { dirname: path.dirname(input), basename: path.basename(input) }
};
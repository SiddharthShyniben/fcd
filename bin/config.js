const Conf = require("conf");

// More like a reference for myself
const config = new Conf({
  defaults: {
    ignoredFolders: "Trash,node_modules,Library",
    ignoreDotFolders: "true",
    addNewlineToCopy: "true"
  }
});

module.exports = {
  get ignoredFolders() {
    return config.get("ignoredFolders", "Trash,Library,node_modules").split(",").filter(item => item !== "").filter((v, i, a) => a.indexOf(v) === i);
  },
  set ignoredFolders(folders) {
    config.set("ignoredFolders", folders.split(",").filter(item => item !== "").filter((value, index, self) => self.indexOf(value) === index).join())
  },

  get ignoreDotFolders() {
    return fromBool(config.get("ignoreDotFolders", "true"));
  },
  set ignoreDotFolders(ignore) {
    config.set("ignoreDotFolders", toBool(ignore));
  },

  get addNewlineToCopy() {
    return fromBool(config.get("addNewlineToCopy", "true"));
  },
  set addNewlineToCopy(add) {
    config.set("addNewlineToCopy", toBool(add))
  },

  path: config.path,

  reset(...keys) {
    config.reset(...keys);
  },

  clear() {
    config.clear();
  }
}

const fromBool = str => str === "true";
const toBool = str => {
  if (str == null) return "false";

  if (typeof str === "boolean") return str.toString();

  if (typeof str === "string") {
    if (str == "") return "false";

    str = str.replace(/^\s+|\s+$/g, "");
    if (str.toLowerCase() == "true" || str.toLowerCase() == "yes") return "true";

    str = str.replace(/,/g, ".");
    str = str.replace(/^\s*\-\s*/g, "-");
  }

  if (!isNaN(str)) return (parseFloat(str) != 0).toString();

  return "false";
}
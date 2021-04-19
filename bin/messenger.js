const colorCodes = {
  red: "\u001b[31m",
  green: "\u001b[32m",
  yellow: "\u001b[33m",
  blue: "\u001b[34m",
  reset: "\u001b[0m"
};


const colors = {
  red: string => `${colorCodes.red}${string}${colorCodes.reset}`,
  yellow: string => `${colorCodes.yellow}${string}${colorCodes.reset}`,
  blue: string => `${colorCodes.blue}${string}${colorCodes.reset}`,
  green: string => `${colorCodes.green}${string}${colorCodes.reset}`
};

const err = `fcd ${colors.red("ERR!")}`;
const warn = `fcd ${colors.yellow("WARN!")}`;
const info = `fcd ${colors.blue("INFO!")}`;
const success = `fcd ${colors.green("SUC!")}`;

module.exports.error = (...msgs) => msgs.forEach(msg => console.log(`${err} ${msg}`));
module.exports.warn = (...msgs) => msgs.forEach(msg => console.log(`${warn} ${msg}`));
module.exports.info = (...msgs) => msgs.forEach(msg => console.log(`${info} ${msg}`));
module.exports.success = (...msgs) => msgs.forEach(msg => console.log(`${success} ${msg}`));
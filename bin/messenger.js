const colorCodes = {
  red: "\u001b[31m",
  yellow: "\u001b[33m",
  blue: "\u001b[34m",
  reset: "\u001b[0m"
};


const colors = {
  red: string => `${colorCodes.red}${string}${colorCodes.reset}`,
  yellow: string => `${colorCodes.yellow}${string}${colorCodes.reset}`,
  blue: string => `${colorCodes.blue}${string}${colorCodes.reset}`
};

const err = `fcd ${colors.red("ERR!")}`;
const info = `fcd ${colors.blue("INFO!")}`;

exports.error = (...msgs) => msgs.forEach(msg => console.log(`${err} ${msg}`));
exports.info = (...msgs) => msgs.forEach(msg => console.log(`${info} ${msg}`));
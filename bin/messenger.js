const colors = require("./colors");
const err = `fcd ${colors.red("ERR!")}`;
const info = `fcd ${colors.blue("INFO!")}`;

exports.error = msgs => msgs.forEach(msg => console.log(`${err} ${msg}`));
exports.info = msgs => msgs.forEach(msg => console.log(`${info} ${msg}`));

const colors = {
  red: "\u001b[31m",
  yellow: "\u001b[33m",
  blue: "\u001b[34m",
  reset: "\u001b[0m"
};

exports.red = string => `${colors.red}${string}${colors.reset}`;
exports.yellow = string => `${colors.yellow}${string}${colors.reset}`;
exports.blue = string => `${colors.blue}${string}${colors.reset}`;

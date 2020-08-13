const { ELEMENT_SEPARATOR, MOD_SEPARATOR } = require('./../constants');

function isMod(filePath) {
  return filePath.match(MOD_SEPARATOR) && !filePath.match(ELEMENT_SEPARATOR);
}

module.exports = {
  isMod,
};

const { ELEMENT_SEPARATOR, MOD_SEPARATOR } = require('./../constants');

function isMod(name) {
  return name.match(MOD_SEPARATOR) && !name.match(ELEMENT_SEPARATOR);
}

module.exports = isMod;

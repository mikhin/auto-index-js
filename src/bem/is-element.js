const { ELEMENT_SEPARATOR } = require('./../constants');

function isElement(name) {
  return name.match(ELEMENT_SEPARATOR);
}

module.exports = isElement;

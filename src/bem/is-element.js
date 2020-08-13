const { ELEMENT_SEPARATOR } = require('./../constants');

function isElement(filePath) {
  return filePath.match(ELEMENT_SEPARATOR);
}

module.exports = {
  isElement,
};

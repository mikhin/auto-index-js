const path = require('path');
const { COMPONENTS_FOLDER_PATH } = require('./../constants');

function getBlockName(filePath) {
  const bemBlockChildrenNameRegExp = new RegExp(`${path.sep}.{1,}`, 'g');

  return filePath
    .replace(COMPONENTS_FOLDER_PATH, '')
    .replace(path.sep, '')
    .replace(bemBlockChildrenNameRegExp, '');
}

module.exports = getBlockName;

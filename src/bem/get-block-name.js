const { COMPONENTS_FOLDER_PATH } = require('./../constants');

function getBlockName(filePath) {
  return filePath
    .replace(COMPONENTS_FOLDER_PATH, '')
    .replace(/\/.{1,}/, '');
}

module.exports = getBlockName;

const path = require('path');
const getBlockName = require('../bem/get-block-name');
const { COMPONENTS_FOLDER_PATH } = require('./../constants');

function getIndexFilePath(filePath) {
  return path.join(COMPONENTS_FOLDER_PATH, getBlockName(filePath), 'index.js');
}

module.exports = getIndexFilePath;

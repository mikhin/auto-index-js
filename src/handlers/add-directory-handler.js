const os = require('os');
const fs = require('fs');
const path = require('path');
const { COMPONENTS_FOLDER_PATH, STYLE_FILE_EXTENSION } = require('../constants');
const updateIndexFile = require('../index-file/update-index-file');
const createFile = require('../file/create-file');
const isElement = require('../bem/is-element');
const isMod = require('../bem/is-mod');

const { EOL } = os;

function getPreparedStyleFileContent(selector) {
  return `.${selector} {${EOL}  ${EOL}}`;
}

function addDirectoryHandler(createdFolderPath) {
  if (isElement(createdFolderPath) || isMod(createdFolderPath)) {
    const fileSepRegExp = new RegExp(`${path.sep === '\\' ? '\\\\' : path.sep}`, 'g');

    const selector = createdFolderPath
      .replace(COMPONENTS_FOLDER_PATH, '')
      .replace(fileSepRegExp, '');

    const creatingFilePath = path.join(createdFolderPath, `${selector}${STYLE_FILE_EXTENSION}`);
    const creatingFileContent = getPreparedStyleFileContent(selector);

    if (!fs.existsSync(creatingFilePath)) {
      createFile(creatingFilePath, creatingFileContent);
      updateIndexFile(createdFolderPath, creatingFilePath);
    }
  }
}

module.exports = addDirectoryHandler;

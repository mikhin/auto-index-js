const fs = require('fs');
const os = require('os');

const getIndexFilePath = require('./../index-file/get-index-file-path');
const getIndexFileContent = require('./../index-file/get-index-file-content');
const { COMPONENTS_FOLDER_PATH, STYLE_FILE_EXTENSION } = require('./../constants');
const fileSystemPathSeparator = require('../file-system-path-separator');

const { EOL } = os;

function onFileDelete(filePath) {
  const indexFilePath = getIndexFilePath(filePath);
  const indexFileContent = getIndexFileContent(indexFilePath);

  const fileSepRegExp = new RegExp(`${fileSystemPathSeparator}`, 'g');
  const selector = filePath
    .replace(COMPONENTS_FOLDER_PATH, '')
    .replace(fileSepRegExp, '');
  const deletingFilePath = `${selector}${STYLE_FILE_EXTENSION}`;

  const newIndexFileContent = `${indexFileContent
    .split(EOL)
    .filter((string) => !string.includes(deletingFilePath))
    .join(EOL)}${EOL}`;

  try {
    fs.writeFileSync(indexFilePath, newIndexFileContent);
  } catch (e) {
    // ;
  }
}

module.exports = onFileDelete;

const fs = require('fs');
const os = require('os');
const path = require('path');

const getBlockName = require('../bem/get-block-name');
const getIndexFilePath = require('./../index-file/get-index-file-path');
const getIndexFileContent = require('./../index-file/get-index-file-content');
const { COMPONENTS_FOLDER_PATH } = require('./../constants');

const { EOL } = os;

function removeFilePathFromIndexFile(filePath) {
  const indexFilePath = getIndexFilePath(filePath);
  const indexFileContent = getIndexFileContent(indexFilePath);

  const newIndexFileContent = `${indexFileContent
    .split(EOL)
    .filter((string) => !string.includes(filePath
      .replace(COMPONENTS_FOLDER_PATH, '')
      .replace(getBlockName(filePath), '')
      .replace(path.sep, '')))
    .join(EOL)}${EOL}`;

  try {
    fs.writeFileSync(indexFilePath, newIndexFileContent);
  } catch (e) {
  // ;
  }
}

module.exports = removeFilePathFromIndexFile;

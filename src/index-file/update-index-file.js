const fs = require('fs');
const os = require('os');

const getBlockName = require('../bem/get-block-name');
const getIndexFilePath = require('./../index-file/get-index-file-path');
const getIndexFileContent = require('./../index-file/get-index-file-content');
const { COMPONENTS_FOLDER_PATH } = require('../constants');

const { EOL } = os;

function updateIndexFile(createdFolderPath, createdFilePath) {
  const indexFilePath = getIndexFilePath(createdFolderPath);
  const indexFileContent = getIndexFileContent(indexFilePath);

  const relativeNewFilePathForIndexFile = `.${createdFilePath
    .replace(COMPONENTS_FOLDER_PATH, '')
    .replace(getBlockName(createdFolderPath), '')}`;

  const newFilePathRequiringText = `require('${relativeNewFilePathForIndexFile}');`;

  const indexContentStrings = indexFileContent.split(EOL);
  const newIndexFileContent = `${[...indexContentStrings, newFilePathRequiringText]
    .join(EOL)}EOL`;

  try {
    fs.writeFileSync(indexFilePath, newIndexFileContent);
  } catch (e) {
    // ;
  }
}

module.exports = updateIndexFile;

const fs = require('fs');

const { getBlockName } = require('../bem/get-block-name');
const { getIndexFilePath } = require('./../index-file/get-index-file-path');
const { getIndexFileContent } = require('./../index-file/get-index-file-content');
const { COMPONENTS_FOLDER_PATH } = require('../constants');

function updateIndexFile(createdFolderPath, createdFilePath) {
  const indexFilePath = getIndexFilePath(createdFolderPath);
  const indexFileContent = getIndexFileContent(indexFilePath);

  const relativeNewFilePathForIndexFile = `.${createdFilePath
    .replace(COMPONENTS_FOLDER_PATH, '')
    .replace(getBlockName(createdFolderPath), '')}`;

  const newFilePathRequiringText = `require('${relativeNewFilePathForIndexFile}');`;

  const indexContentStrings = indexFileContent.split('\n');
  const newIndexFileContent = `${[...indexContentStrings, newFilePathRequiringText]
    .join('\n')}\n`;

  try {
    fs.writeFileSync(indexFilePath, newIndexFileContent);
  } catch (e) {
    // ;
  }
}

module.exports = {
  updateIndexFile,
};

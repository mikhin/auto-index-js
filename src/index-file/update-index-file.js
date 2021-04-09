const fs = require('fs');
const os = require('os');
const path = require('path');

const fileSystemPathSeparator = require('../file-system-path-separator');
const getBlockName = require('../bem/get-block-name');
const getIndexFilePath = require('./../index-file/get-index-file-path');
const getIndexFileContent = require('./../index-file/get-index-file-content');
const { COMPONENTS_FOLDER_PATH } = require('../constants');

const { EOL } = os;

function updateIndexFile(createdFolderPath, createdFilePath) {
  const indexFilePath = getIndexFilePath(createdFolderPath);
  const indexFileContent = getIndexFileContent(indexFilePath);

  const relativeNewFilePathForIndexFile = `.${path
    .parse(createdFilePath)
    .dir
    .replace(COMPONENTS_FOLDER_PATH, '')
    .replace(getBlockName(createdFolderPath), '')
    .replace(new RegExp(`${fileSystemPathSeparator}`), '')
    .split(path.sep)
    .join('/')}/${path.parse(createdFilePath).base}`;

  const newFilePathRequiringText = `require('${relativeNewFilePathForIndexFile}');`;

  const indexContentStrings = indexFileContent.split(EOL);
  const newIndexFileContent = `${[...indexContentStrings, newFilePathRequiringText]
    .join(EOL)}${EOL}`;

  try {
    fs.writeFileSync(indexFilePath, newIndexFileContent);
  } catch (e) {
    // ;
  }
}

module.exports = updateIndexFile;

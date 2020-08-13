const { COMPONENTS_FOLDER_PATH, STYLE_FILE_EXTENSION } = require('./constants');
const { updateIndexFile } = require('./index-file/update-index-file');
const { removeFilePathFromIndexFile } = require('./index-file/remove-file-path-from-index-file');
const { createFile } = require('./file/create-file');
const { isElement } = require('./bem/is-element');
const { isMod } = require('./bem/is-mod');

function getFileContent(selector) {
  return `.${selector} {\n  \n}`;
}

function onDirectoryAdd(createdFolderPath) {
  if (isElement(createdFolderPath) || isMod(createdFolderPath)) {
    const selector = createdFolderPath
      .replace(COMPONENTS_FOLDER_PATH, '')
      .replace(/\//g, '');

    const createdFilePath = `${createdFolderPath}/${selector}${STYLE_FILE_EXTENSION}`;
    const createdFileContent = getFileContent(`${selector}`);

    createFile(createdFilePath, createdFileContent);
    updateIndexFile(createdFolderPath, createdFilePath);
  }
}

function onFileDelete(bemFilePath) {
  removeFilePathFromIndexFile(bemFilePath);
}

module.exports = {
  onDirectoryAdd,
  onFileDelete,
};

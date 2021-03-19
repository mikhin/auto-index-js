const removeFilePathFromIndexFile = require('../index-file/remove-file-path-from-index-file');

function onFileDelete(bemFilePath) {
  removeFilePathFromIndexFile(bemFilePath);
}

module.exports = onFileDelete;

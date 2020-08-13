const fs = require('fs');

function createFile(createdFilePath, createdFileContent) {
  try {
    fs.writeFileSync(createdFilePath, createdFileContent);
  } catch (e) {
    // ;
  }
}

module.exports = {
  createFile,
};

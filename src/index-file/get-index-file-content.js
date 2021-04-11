const fs = require('fs');

function getIndexFileContent(indexFilePath) {
  let indexFileContent = '';

  try {
    indexFileContent = fs.readFileSync(indexFilePath, { encoding: 'utf-8' });
  } catch (e) {
    // ;
  }

  return indexFileContent;
}

module.exports = getIndexFileContent;

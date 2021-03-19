const fs = require('fs');

// eslint-disable-next-line consistent-return
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

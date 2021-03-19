const chokidar = require('chokidar');
const { COMPONENTS_FOLDER_PATH } = require('./constants');
const addDirectoryHandler = require('./handlers/add-directory-handler');
const deleteFileHandler = require('./handlers/delete-file-handler');

const watcher = chokidar.watch(COMPONENTS_FOLDER_PATH);

function onReady() {
  watcher.on('ready', () => watcher
    .on('addDir', addDirectoryHandler)
    .on('unlinkDir', deleteFileHandler));

  console.log('Watching is active');
}

module.exports = onReady;

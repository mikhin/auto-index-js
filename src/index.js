const chokidar = require('chokidar');
const { COMPONENTS_FOLDER_PATH } = require('./constants');
const addDirectoryHandler = require('./handlers/add-directory-handler');
const deleteDirectoryHandler = require('./handlers/delete-directory-handler');

const watcher = chokidar.watch(COMPONENTS_FOLDER_PATH);

function onReady() {
  watcher.on('ready', () => watcher
    .on('addDir', addDirectoryHandler)
    .on('unlinkDir', deleteDirectoryHandler));

  console.log('Watching is active');
}

module.exports = onReady;

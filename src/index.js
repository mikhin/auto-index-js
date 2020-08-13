const chokidar = require('chokidar');
const { COMPONENTS_FOLDER_PATH } = require('./constants');
const { onDirectoryAdd, onFileDelete } = require('./actions');

const watcher = chokidar.watch(COMPONENTS_FOLDER_PATH);

function onReady() {
  watcher.on('ready', () => watcher
    .on('addDir', onDirectoryAdd)
    .on('unlinkDir', onFileDelete));

  console.log('Watching is active');
}

module.exports = onReady;

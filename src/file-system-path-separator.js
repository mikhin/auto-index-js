const path = require('path');

const fileSystemPathSeparator = path.sep === '\\' ? '\\\\' : path.sep;

module.exports = fileSystemPathSeparator;

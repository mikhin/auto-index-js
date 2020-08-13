#!/usr/bin/env node

const program = require('commander');
const autoIndex = require('./src');

program
  .version(require('./package.json').version, '-V, --version')
  .description(require('./package.json').description)
  .action(() => {
    autoIndex();
  })
  .parse(process.argv);

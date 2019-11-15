#!/usr/bin/env node

const program = require('commander');
const autoIndex = require('.');

program
  .version(require('./package').version, '-V, --version')
  .description(require('./package').description)
  .action(() => {
    autoIndex();
  })
  .parse(process.argv);

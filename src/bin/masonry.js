#! /usr/bin/env node

var program = require('commander');
var package = require('../package.json');

program
  .version(package.version)
  .command('init [name]', 'initialize new masonry project')
  .parse(process.argv);
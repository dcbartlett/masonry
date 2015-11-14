#! /usr/bin/env node

var program = require('commander');
var package = require('../package.json');

program
  .version(package.version)
  .command('init [name]', 'initialize new masonry project')
  .command('search [query]', 'search with optional query')
  // .command('list', 'list packages installed', {isDefault: true})
  .parse(process.argv);
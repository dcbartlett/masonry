require('colors');
var cwd = process.cwd(),
	fs = require('fs'),
	os = require('os'),
	program = require('commander'),
	package = require('../package.json');

var routes = require(canonicalPath(__dirname+'/../templates/routes.json'));

fs.existsSync(canonicalPath(cwd+'/components')) || fs.mkdir(canonicalPath(cwd+'/components'), function () {
	console.log("Created Components Directory");
});

fs.existsSync(canonicalPath(cwd+'/routes.json')) || fs.writeFile(canonicalPath(cwd+'/routes.json'), JSON.stringify(routes.content, null, 4), { mode: 0644 }, function () {
	console.log("Created Routes File");
});

function canonicalPath(path) {
	if (os.platform().indexOf('win') > -1) {
		path = path.replace(/\//g, "\\");
	}
	return path;
}
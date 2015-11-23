var cwd = process.cwd(),
	fs = require('fs'),
	os = require('os');


fs.existsSync(canonicalPath(cwd+'/components')) || fs.mkdirSync(canonicalPath(cwd+'/components'));

fs.writeFile(canonicalPath(cwd+'/routes.js'), 'test' , { flags: 'wx', mode: 644 }, function (err) {
	if (err) throw err;
	console.log("Created Routes File");
});


function canonicalPath(path) {
	if (os.platform().indexOf('win') > -1) {
		path.replace('/', '\\', 'g');
	}
	return path;
}
require('colors');
var cwd = process.cwd(),
	fs = require('fs'),
	os = require('os');

var errors = [],
	warnings = [];

// Validate that we have a masonry project here.
fs.existsSync(canonicalPath(cwd+'/components'))  || errors.push({code: 404, message: 'Missing Components Folder'});
fs.existsSync(canonicalPath(cwd+'/routes.json')) || errors.push({code: 404, message: 'Missing Routes File'});
fs.existsSync(canonicalPath(cwd+'/config.json')) || fs.existsSync(canonicalPath(cwd+'/config.dev.json')) || errors.push({code: 404, message: 'Missing Config File'});
validate(errors);

!fs.existsSync(canonicalPath(cwd+'/config.dev.json')) || warnings.push({code: 200, message: 'Dev Config exists. Is this a production environment?'});
fs.existsSync(canonicalPath(cwd+'/config.dev.json')) ?
  require(canonicalPath(cwd+'/config.dev.json')).port || warnings.push({code: 600, message: 'No port specified in config.dev.json.  Using port 8080 by default.'}) :
  require(canonicalPath(cwd+'/config.json')).port || warnings.push({code: 600, message: 'No port specified in config.json.  Using port 8080 by default.'}) ;
validate(warnings);

function canonicalPath(path) {
	if (os.platform().indexOf('win') > -1) {
		path = path.replace(/\//g, "\\");
	}
	return path;
}

function validate(array) {

	var errors = 0;
	array.forEach(function(value) {
		if (value.code.toString()[0] == 4 || value.code.toString()[0] == 5) {
			console.log("Error: ".red.bold,value.message);
			errors++;
		}
		if (value.code.toString()[0] == 6) {
			console.log("Warning: ".yellow.bold,value.message);
			errors++;
		}
	});
	if (errors > 0) {
		process.exit();
	}

};
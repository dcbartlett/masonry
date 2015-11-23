require('colors');
var cwd = process.cwd(),
	fs = require('fs'),
	os = require('os'),
	inquirer = require("inquirer");

var errors = [],
	warnings = [];
	noPort = false;

// Validate that we have a masonry project here.
fs.existsSync(canonicalPath(cwd+'/components'))  || errors.push({code: 404, message: 'Missing Components Folder'});
fs.existsSync(canonicalPath(cwd+'/routes.json')) || errors.push({code: 404, message: 'Missing Routes File'});
fs.existsSync(canonicalPath(cwd+'/config.json')) || fs.existsSync(canonicalPath(cwd+'/config.dev.json')) || errors.push({code: 404, message: 'Missing Config File'});
validate(errors);

!fs.existsSync(canonicalPath(cwd+'/config.dev.json')) || warnings.push({code: 200, message: 'Dev Config exists. Is this a production environment?'});
fs.existsSync(canonicalPath(cwd+'/config.dev.json')) ?
  require(canonicalPath(cwd+'/config.dev.json')).port || warnings.push({code: 600, message: 'No port specified in config.dev.json.  Using port 8080 by default.'}) && (noPort = true) :
  require(canonicalPath(cwd+'/config.json')).port || warnings.push({code: 600, message: 'No port specified in config.json.  Using port 8080 by default.'}) && (noPort = true) ;
validate(warnings);

// Validation completed.  Lets ask the user how they want to serve.

inquirer.prompt([{
	type: "input",
	message: "We are using the default port because your config didn't supply one.".green+"\n  Do you want to change it?",
	default: 8080,
	name: "port",
	when: noPort,
	validate: function(entry) {
		validated = (!isNaN(parseInt(entry)) && 0 < parseInt(entry) && parseInt(entry) < 65535) ? true : "Please provide a Number between 0 and 65535";
		if (validated && typeof validated !== 'string' && !(os.platform().indexOf('win') > -1)) {
			validated = (parseInt(entry) > 1024 || process.env.USER == "root") ? true : "Ports under 1025 can only be run as root";
		}
		return validated;
	}
},{
	type: "confirm",
	message: "Do you want to watch for component changes",
	name: "watch"	
}], function(answers) {
	console.log("You wanted:");
	console.log(JSON.stringify(answers, null, 4));
});

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
		}
	});
	if (errors > 0) {
		process.exit();
	}

};
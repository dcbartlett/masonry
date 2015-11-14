"use strict";
var fs = require("fs");
var gulp = require("gulp");
var gutil = require("gulp-util");
var gulpJsdoc2md = require("gulp-jsdoc-to-markdown");
var rename = require("gulp-rename");
var concat = require("gulp-concat");
var pack = require('package-json-io');
var inquirer = require("inquirer");
var jeditor = require("gulp-json-editor");
require('colors');
 
gulp.task("docs", function() {
	return gulp.src("lib/*.js")
		.pipe(concat("all.md"))
		.pipe(gulpJsdoc2md({ template: fs.readFileSync("./docs/template.hbs", "utf8") }))
		.on("error", errHandler)
		.pipe(gulp.dest("docs"));
});

gulp.task("dist", function() {
	gulp.src(["src/bin/*"])
		.on("error", errHandler)
		.pipe(gulp.dest("dist/bin"));
	gulp.src(["src/lib/*"])
		.on("error", errHandler)
		.pipe(gulp.dest("dist/lib"));

	gulp.src("./package.json")
		.pipe(jeditor(function(json) {
			json.bin.masonry = 'bin/index.js';
			return json;
		}))
		.on("error", errHandler)
		.pipe(gulp.dest("dist"));
});

gulp.task("version", function(done) {

	inquirer.prompt([{
		type: "confirm",
		message: "Are there breaking changes?",
		name: "major"
	},{
		type: "confirm",
		message: "Does this add a new feature?",
		name: "minor",
		when: function(answers) {
			return !answers.major;
		}
	}], function(answers) {
		gulp.src("./package.json")
			.pipe(jeditor(function(json) {
				var version = {
					major: parseInt(json.version.split('.')[0]),
					minor: parseInt(json.version.split('.')[1]),
					patch: parseInt(json.version.split('.')[2])
				}
				
				if (answers.major) {
					version.major++;
					version.minor = 0;
					version.patch = 0;
				}
				if (answers.minor) {
					version.minor++;
					version.patch = 0;
				}
				if (!answers.major && !answers.minor) {
					version.patch++;
				}

				json.version = '' + version.major + '.' + version.minor + '.' + version.patch;
				return json;
			}))
			.on("error", errHandler)
			.pipe(gulp.dest("."));
	});
})


function errHandler(err) {
	console.log(err);
	console.log("*********************".red);
	console.log("Plugin:".red, err.plugin);
	console.log("Message:".red, err.message);
	console.log("*********************".red);
}
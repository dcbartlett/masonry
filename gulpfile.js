"use strict";
var fs = require("fs");
var gulp = require("gulp");
var gutil = require("gulp-util");
var gulpJsdoc2md = require("gulp-jsdoc-to-markdown");
var rename = require("gulp-rename");
var concat = require("gulp-concat");
var del = require('del');
var inquirer = require("inquirer");
var jeditor = require("gulp-json-editor");
require('colors');

gulp.task("clean:docs", function() {
	return del(["docs"]);
});

gulp.task("clean:dist", function() {
	return del(["dist"]);
});

gulp.task("docs", ['clean:docs'], function() {
	// var opts = { template: fs.readFileSync("./docs/template.hbs", "utf8") }; 

	return gulp.src("src/lib/*.js")
		.pipe(concat("all.md"))
		.pipe(gulpJsdoc2md())
		.on("error", errHandler)
		.pipe(gulp.dest("docs"));
});

gulp.task("dist", ['clean:dist'], function() {
	gulp.src(["src/bin/*"])
		.on("error", errHandler)
		.pipe(gulp.dest("dist/bin"));
	gulp.src(["src/lib/*"])
		.on("error", errHandler)
		.pipe(gulp.dest("dist/lib"));

	gulp.src("./package.json")
		.pipe(jeditor(function(json) {
			json.bin.masonry = 'bin/masonry.js';
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
});

gulp.task("watch", ["watch:dist"]);

gulp.task("watch:dist", function() {
	gulp.watch('src/**/*', ['dist']);
});

gulp.task("default", function() {
	console.log("No Help for you");
});

function errHandler(err) {
	console.log(err);
	console.log("*********************".red);
	console.log("Plugin:".red, err.plugin);
	console.log("Message:".red, err.message);
	console.log("*********************".red);
}
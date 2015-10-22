"use strict";
var fs = require("fs");
var gulp = require("gulp");
var gutil = require("gulp-util");
var gulpJsdoc2md = require("gulp-jsdoc-to-markdown");
var rename = require("gulp-rename");
var concat = require("gulp-concat");
 
gulp.task("docs", function() {
    return gulp.src("lib/*.js")
        .pipe(concat("all.md"))
        .pipe(gulpJsdoc2md({ template: fs.readFileSync("./docs/template.hbs", "utf8") }))
        .on("error", function(err){
            gutil.log("jsdoc2md failed:", err.message);
        })
        .pipe(gulp.dest("docs"));
});
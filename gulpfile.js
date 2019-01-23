"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var csso = require("gulp-csso"); // для css.min
var rename = require("gulp-rename"); // для css.min
const imagemin = require("gulp-imagemin"); // для min jpg/png/svg
const webp = require("gulp-webp"); // для webp conversion
var del = require("del"); //для удаления папки build

// css.min

gulp.task("css", function () {
  return gulp.src("css/style.css")
    .pipe(plumber())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"));
});

// min jpg/png/svg

gulp.task("images", function () {
  return gulp.src("img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({ optimizationLevel: 3}),
      imagemin.jpegtran({ progressive: true}),
      imagemin.svgo({
        plugins: [
          {removeViewBox: false},
          {cleanupIDs: true}
        ]
      })
    ]))
    .pipe(gulp.dest("img"));
});

// webp conversion

gulp.task("webp", function () {
  return gulp.src("img/**/*.{png,jpg}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("build/img"));
});


gulp.task("clean", function () {
  return del("build");
});

// запуск билда

gulp.task("build", gulp.series(
  "clean",
  "css",
  "images",
  "webp"
));


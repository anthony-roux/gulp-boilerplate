//------------| import all your plugins |-------------//
const { dest, src, watch, series, parallel } = require("gulp");
const concat = require("gulp-concat");
const browserSync = require("browser-sync").create();
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const pleeease = require("gulp-pleeease");
const sass = require("gulp-sass");
const del = require("del");
const image = require("gulp-image");
const sourceMaps = require("gulp-sourcemaps");
const header = require("gulp-header");
const fs = require("fs");
const pkg = JSON.parse(fs.readFileSync("./package.json"));



//---------------| Files and Paths |---------------//

const files = {
  all_html_files: "**/*.html",
  all_scss_files: "src/scss/**/*.scss",
  all_js_files: "src/js/**/*.js",
  all_img_files: "src/assets/img/*",
  main_scss_path: "src/scss/styles.scss",
  dist_css_folder: "dist/css",
  dist_js_folder: "dist/js",
  dist_all_css: "dist/**/*.css",
  dist_all_js: "dist/**/*.js",
  dist_all_img: "dist/assets/img/*"
};

//---------------| BrowserSync init |---------------//

function browserSyncInit(done) {
  browserSync.init({
    server: {
      baseDir: "./", //from dist folder
    },
    port: 3000
  });
  done();
}

//---------------| BrowserSync Reload |---------------//

function browserSyncReload(done) {
  browserSync.reload();
  done();
}

//---------| SCSS to CSS + minified, concatenated |-------------//

const cssbanner = [
  "/*",
  "Theme Name:          " + pkg.themename,
  "Description:         " + pkg.description,
  "Author:              " + pkg.author,
  "Author URI:          " + pkg.authoruri,
  "Version:             " + pkg.version,
  "Theme URI:           " + pkg.homepage,
  "License:             " + pkg.license,
  "License URI:         " + pkg.licenseuri,
  "Text Domain:         " + pkg.textDomain,
  "*/",
  "",
].join("\n");

function scssTask() {
  return src(files.main_scss_path)
    .pipe(sourceMaps.init())
    .pipe(sass())
    .pipe(pleeease())
    .pipe(sourceMaps.write("."))
    .pipe(
      header(cssbanner, {
        pkg: pkg,
      })
    )
    .pipe(dest(files.dist_css_folder))
    .pipe(browserSync.stream({
      stream: true
    }))
};


//------------| JS concatenated, minified + run to ES5 |------------//

function jsTask() {
  return src(files.all_js_files)
    .pipe(sourceMaps.init())
    .pipe(
      babel({
        presets: ["@babel/preset-env"],
      })
    )
    .pipe(concat("all.min.js"))
    .pipe(uglify())
    .pipe(sourceMaps.write("."))
    .pipe(dest(files.dist_js_folder))
    .pipe(browserSync.stream({
      stream: true
    }))
};


//---------------| Compress lightly images |---------------//

function imgTask() {
  return src(files.all_img_files)
    .pipe(image())
    .pipe(dest(files.dist_all_img));
};


//---------------| Clean dist's files |---------------//
function clean() {
  return del(files.dist_all_css), del(files.dist_all_js), del(files.dist_all_img);
};


function watchTask() {
  watch(
    [
      files.all_html_files,
      files.all_scss_files,
      files.all_js_files,
      files.all_img_files
    ], 
    {
      interval: 1000,
      usePolling: true,
    }, //Makes docker work
    series(
      parallel(scssTask, jsTask, browserSyncReload)
    ), browserSyncReload);
}



//---------------| GLOBAL TASK |---------------//

// run html, scss, js, img, server, and WATCH ! 

exports.default = series(
  clean, browserSyncInit,
parallel(scssTask, jsTask, watchTask),
);

exports.build = series(
  clean, browserSyncInit,
parallel(scssTask, imgTask, jsTask));



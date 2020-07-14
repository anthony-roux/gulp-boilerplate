//------------| import all your plugins |-------------//
const gulp = require("gulp");
const concat = require("gulp-concat");
const phpConnect = require("gulp-connect-php");
const browserSync = require("browser-sync").create();
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const pleeease = require("gulp-pleeease");
const sass = require("gulp-sass");
const del = require("del");
const image = require("gulp-image");
const sourceMaps = require("gulp-sourcemaps");

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

function css() {
  return gulp
    .src("src/scss/styles.scss")
    .pipe(sourceMaps.init())
    .pipe(sass())
    .pipe(pleeease())
    .pipe(sourceMaps.write("."))
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream({
      stream: true
    }))
};


//------------| JS concatenated, minified + run to ES5 |------------//

function js() {
  return gulp
    .src("src/js/**/*.js")
    .pipe(sourceMaps.init())
    .pipe(
      babel({
        presets: ["@babel/preset-env"],
      })
    )
    .pipe(concat("all.min.js"))
    .pipe(uglify())
    .pipe(sourceMaps.write("."))
    .pipe(gulp.dest("dist/js"))
    .pipe(browserSync.stream({
      stream: true
    }))
};


//---------------| Compress lightly images |---------------//

function img() {
  return gulp
    .src("src/assets/img/*")
    .pipe(image())
    .pipe(gulp.dest("dist/assets/img"));
};


//---------------| Clean dist's files |---------------//
function clean() {
  return del("dist/**/*.css"), del("dist/**/*.js"), del("dist/assets/img/*");
};





function watch() {
  gulp.watch("src/scss/**/*.scss", css);
  gulp.watch("src/js/**/*.js", gulp.series("js"));
  gulp.watch("**/*.{html, php}", gulp.series(browserSyncReload)).on("change", function (event) {
    console.log(event + " a été modifié")
  });
  gulp.watch("src/assets/img/*", img);
}



//---------------| GLOBAL TASK |---------------//

const javaScript = gulp.series(js);
const build = gulp.series(clean, gulp.parallel(css, img, js));
const watchFiles = gulp.parallel(watch, browserSyncInit);

exports.css = css;
exports.js = javaScript;
exports.img = img;
exports.clean = clean;
exports.build = build;
exports.watch = watchFiles;
exports.default = build;

// run html, scss, js, img, server, and WATCH ! 
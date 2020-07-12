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


//---------| SCSS to CSS + minified, concatenated |-------------//

gulp.task("css", function () {
  return gulp
    .src("src/scss/styles.scss")
    .pipe(sourceMaps.init())
    .pipe(sass())
    .pipe(pleeease())
    .pipe(sourceMaps.write("."))
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.reload({
      stream: true
    }))
});

//------------| JS concatenated, minified + run to ES5 |------------//

gulp.task("js", function () {
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
    .pipe(browserSync.reload({
      stream: true
    }))
});

//---------------| Compress lightly images |---------------//

gulp.task("img", function () {
  return gulp
    .src("src/assets/img/*.{png, jpeg, jpg, gif, svg}")
    .pipe(image())
    .pipe(gulp.dest("dist/assets/img"));
});


//---------------| Clean dist's files |---------------//
gulp.task("clean", function () {
  return del("dist/**/*.css"), del("dist/**/*.js");
});



//---------------| GLOBAL TASK |---------------//

// run html, scss, js, img, server, and WATCH ! 

gulp.task("default", function () {
  phpConnect.server({
      port: 8000,
      keepalive: true,
      base: ".",
    },
    function () {
      browserSync.init({
        server: {
          baseDir: "./", //from dist folder
        },
      });
    }
  );

  gulp
    .watch("**/*.{html, php}")
    .on("change", function (event) {
      console.log(event + " a été modifié");
      browserSync.reload();
    });
  gulp.watch("src/assets/img/*.{png, jpeg, jpg, gif, svg}", gulp.series("img"));
  gulp.watch("src/scss/**/*.scss", gulp.series("css"));
  gulp.watch("src/js/**/*.js", gulp.series("js"));
});
var gulp = require('gulp'),
  sass = require('gulp-sass'),
  cleanCSS = require('gulp-clean-css'),
  terser = require('gulp-terser'),
  order = require('gulp-order'),
  concat = require('gulp-concat');

sass.compiler = require('node-sass');

gulp.task('css-copy', function () {
  return gulp
    .src([
      'node_modules/fullpage.js/dist/fullpage.min.css',
      'node_modules/animate.css/animate.min.css',
    ])
    .pipe(gulp.dest('css'));
});

gulp.task('js-copy', function () {
  return gulp
    .src([
      'node_modules/jquery/dist/jquery.js',
      'node_modules/fullpage.js/dist/fullpage.extensions.min.js',
    ])
    .pipe(gulp.dest('js'));
});

gulp.task('sass', function () {
  return gulp
    .src('./scss/*.scss')
    .pipe(sass())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('js', function () {
  return gulp
    .src('js/*.js')
    .pipe(order(['jquery.js', 'fullpage.extensions.min.js', 'main.js']))
    .pipe(terser())
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('build/js'));
});

gulp.task('css', function () {
  return gulp
    .src('css/*.css')
    .pipe(order(['animate.css', 'fullpage.css', 'styles.css']))
    .pipe(cleanCSS())
    .pipe(concat('app.min.css'))
    .pipe(gulp.dest('build/css'));
});

gulp.task('watch', function () {
  gulp.watch('./scss/*.scss', gulp.series('sass', 'css', 'js'));
});

gulp.task('default', gulp.series('sass', 'css', 'js'));

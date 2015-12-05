'use strict';

var watchify = require('watchify');
var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var glob = require('glob');
var sourcemaps = require('gulp-sourcemaps');
var assign = require('lodash.assign');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var reactify = require('reactify');
var babelify = require('babelify');

var jsFiles = glob.sync('./src/js/index.js');

var customOpts = {
  entries: jsFiles,
  debug: true,
  transform:  [babelify, reactify]
};
var opts = assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts));

gulp.task('js', bundle);
b.on('update', bundle);
b.on('log', gutil.log);

function bundle() {
  gutil.log(gutil.colors.bgMagenta('Browserifying js files'));
  gutil.beep();
  return b.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./public/js'));
}

gulp.task('styles', function () {
    gutil.log(gutil.colors.bgMagenta('Compling CSS from Sass files'));
    gutil.beep();
    return gulp.src('src/styles/styles.scss')
        .pipe(sass())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('public/css'));
});

gulp.task('watch', function () {
  gulp.watch('src/**/*.scss', ['styles']);
});

gulp.task('default', ['styles', 'js', 'watch']);

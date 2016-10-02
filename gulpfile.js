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
var uglify = require('gulp-uglify');
var config = require('./config');
var jsFiles = glob.sync('./src/js/index.js');
var staticFiles = ['./src/index.html', './src/webfont/*.*', './src/img/*.*', './src/sound/*.*'];

var customOpts = {
  entries: jsFiles,
  debug: true
};
var opts = assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts).transform(babelify.configure({
  presets: ['es2015','react']
})));

gulp.task('js', bundle);
b.on('update', bundle);
b.on('log', gutil.log);

function bundle() {
  var env = process.env.NODE_ENV || 'development';
  gutil.log(gutil.colors.bgYellow.black('Setting NODE_ENV to \'' + env));
  gutil.log(gutil.colors.bgMagenta('Browserifying js files'));
  gutil.beep();

  return b.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(uglify())
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

gulp.task('statics', function() {
  gutil.log(gutil.colors.bgMagenta('Building public assets...'));
  gutil.beep();
  return gulp.src(staticFiles,{base: './src'})
      .pipe(gulp.dest('public'))
})

gulp.task('watch', function () {
  gulp.watch('src/**/*.scss', ['styles']);
});

gulp.task('set-env', function () {
  return process.env.NODE_ENV = process.env.NODE_ENV;
});

gulp.task('default', ['styles', 'statics', 'js', 'watch']);

gulp.task('build-prod', ['set-env','styles', 'statics', 'js'])

'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');
var plugins = require('gulp-load-plugins')({scope: ['dependencies']});
var del = require('del');
var browserSync = require('browser-sync').create();
var babel = require("gulp-babel");
var rename = require('gulp-rename');

/**
 * Jest cli requires --harmony flags for < node 0.12
 */
require('harmonize')();


var bundleConfig = {
    entries: 'src/index',
    output: 'lib/react-infinity.js',
    options: {
        minify: true, // Use minification
        mangle: false, // Use mangling with minification
        sourceMaps: true, // Use source maps
        lowResSourceMaps: true // Use faster low-resolution source maps
    }
};

/*
 * Helper tasks
 */
gulp.task('clean', ['clean-components', 'clean-lib']);

gulp.task('clean-components', function (cb) {
    del(['components'], cb);
});

gulp.task('clean-lib', function (cb) {
    del(['lib'], cb);
});


gulp.task('build', ['clean-lib'], function() {
    return gulp.src('src/*.js')
        .pipe(babel())
        .pipe(plugins.react())
        .pipe(rename('react-infinity.js'))
        .pipe(gulp.dest('lib'))
});

gulp.task('buildExampleSite', ['clean-components'], function () {
    return gulp.src(['app.js', 'scripts/*.js', 'example/*.js', 'lib/*.js'])
        .pipe(babel())
        .pipe(plugins.react())
        .pipe(gulp.dest('components'));
});

gulp.task('watch-source', ['build','buildExampleSite'], browserSync.reload);

gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });

    gulp.watch(['scripts/*.js', 'src/*.js', 'example/*.js', '*.html'], ['watch-source']);

});

gulp.task('jest', plugins.shell.task('npm test', {
    // So our task doesn't error out when a test fails
    ignoreErrors: true
}));

/*
 * Main tasks
 */
gulp.task('develop', function (cb) {
    runSequence(
        'build',
        'buildExampleSite',
        'serve',
        cb
    );
});

gulp.task('test', function () {
    runSequence('jest');
    gulp.watch(['scripts/*.js','__tests__/*.js'], ['jest'])
});
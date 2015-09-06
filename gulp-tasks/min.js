var runSequence = require('run-sequence');
var cssMin = require('gulp-cssmin');
var uglify = require('gulp-uglify');
var del = require('del');
var sourcemaps = require('gulp-sourcemaps');

module.exports = function (gulp, plugins) {

    gulp.task('clean', function () {
        return del(['dist'])
    });

    gulp.task('minCss', function () {
        gulp.src('build/**/*.css')
            .pipe(cssMin())
            .pipe(gulp.dest('dist/css'))
    });

    gulp.task('minJs', function () {
        gulp.src('build/*.js')
            .pipe(uglify())
            .pipe(gulp.dest('dist'))
    });

    gulp.task('assets', function () {
        gulp.src(['build/**/*.*', '!build/', '!build/css', '!build/*.js'])
            .pipe(gulp.dest('dist'));
    });

    return function (callback) {
        runSequence('clean', ['minJs', 'minCss', 'assets'], callback)
    }
};


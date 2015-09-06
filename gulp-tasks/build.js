var bowerFiles = require('bower-files')();
var sass = require('gulp-sass');
var newer = require('gulp-newer');
var order = require('gulp-order');
var concat = require('gulp-concat');
var templates = require('gulp-templatecache');

module.exports = function (gulp) {
    gulp.task('vendorJs', function () {
        return gulp.src(bowerFiles.ext('js').files)
            .pipe(order([
                '**/jquery.js',
                '**/angular.js',
                '**/ionic.js'
            ]))
            .pipe(concat('vendor.bundle.js'))
            .pipe(gulp.dest('build'));
    });

    gulp.task('vendorCss', function () {
        return gulp.src(bowerFiles.ext('css').files)
            .pipe(concat('vendor.css'))
            .pipe(gulp.dest('build/css'));
    });

    gulp.task('js', function () {
        return gulp.src(['src/js/app.js', 'src/js/**/*.js'])
            .pipe(concat('app.bundle.js'))
            .pipe(gulp.dest('build'))
    });

    gulp.task('css', function () {
        return gulp.src('src/scss/app.scss')
            .pipe(sass())
            .pipe(gulp.dest('build/css'))
    });

    gulp.task('templates', function () {
        return gulp.src('src/templates/**/*.html')
            .pipe(templates({output: 'templates.js', strip: 'src/', moduleName: 'app'}))
            .pipe(gulp.dest('build'))
    });

    gulp.task('assets', function () {
        return gulp.src(assets)
            .pipe(newer('build'))
            .pipe(gulp.dest('build'))
    });

    var assets = ['src/**/*.*', '!src/js/**', '!src/scss/**', '!src/templates/**'];

    return ['vendorJs', 'vendorCss', 'js', 'css', 'templates', 'assets'];
};
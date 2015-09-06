var gulp = require('gulp');
var concat = require('gulp-concat');
var webserver = require('gulp-webserver');
var templates = require('gulp-templatecache');
var sass = require('gulp-sass');
var newer = require('gulp-newer');
var order = require('gulp-order');
var bowerFiles = require('bower-files')();

var flo = require('fb-flo'),
    fs = require('fs'),
    server;

var assets = ['src/**/*.*', '!src/js/**', '!src/scss/**', '!src/templates/**'];

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

gulp.task('watch', ['vendorJs', 'vendorCss', 'js', 'css', 'templates', 'assets'], function () {
    gulp.watch('src/js/**/*.js', ['js']);
    gulp.watch('src/scss/**/*.scss', ['css']);
    gulp.watch('src/templates/**/*.html', ['templates']);
    gulp.watch(assets, ['assets']);
});

gulp.task('default', ['watch'], function () {
    gulp.src('build').pipe(webserver({
        livereload: false,
        directoryListing: false,
        open: false
    }));

    server = flo('build/', {
        port: 8888,
        host: 'localhost',
        verbose: false,
        glob: ['**/*']
    }, function (filepath, callback) {
        callback({
            resourceURL: filepath,
            contents: fs.readFileSync(__dirname + '/build/' + filepath)
        });
    });
});
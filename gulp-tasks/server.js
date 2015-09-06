var webserver = require('gulp-webserver');
var flo = require('fb-flo');
var fs = require('fs');
var server;

module.exports = function (gulp) {

    return function () {
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
    }
};
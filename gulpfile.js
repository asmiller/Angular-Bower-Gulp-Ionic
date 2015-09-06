var gulp = require('gulp');

function getTask(task) {
    return require('./gulp-tasks/' + task)(gulp);
}

var assets = ['src/**/*.*', '!src/js/**', '!src/scss/**', '!src/templates/**'];

gulp.task('devWatch', getTask('build'), function () {
    gulp.watch('src/js/**/*.js', ['js']);
    gulp.watch('src/scss/**/*.scss', ['css']);
    gulp.watch('src/templates/**/*.html', ['templates']);
    gulp.watch(assets, ['assets']);
});

gulp.task('default', ['devWatch'], getTask('server'));
gulp.task('min', getTask('build'), getTask('min'));

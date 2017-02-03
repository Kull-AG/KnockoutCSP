var gulp = require('gulp');
var csp = require('./index');

gulp.task('default', function () {
    return gulp.src('../test/*.html')
        .pipe(csp())
        .pipe(gulp.dest('./'));
});
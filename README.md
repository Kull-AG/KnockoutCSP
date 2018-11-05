# KnockoutCSP
A Preprocessor for Knockout in combination with CSP

Use it with gulp:
```JavaScript
var gulp = require('gulp');
var csp = require('gulp-knockout-csp-precalc');

gulp.task('default', function () {
    return gulp.src('../test/*.html')
        .pipe(csp())
        .pipe(gulp.dest('./'));
});

```

Requires a little change to Knockout, see [Knockout Fork](https://github.com/kull-ag/knockout), if you used in combination with Custom Element Bindings.

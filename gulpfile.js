var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    jade        = require('gulp-jade'),
    webserver   = require('gulp-webserver')

// --- Basic Tasks ---
gulp.task('sass', function () {
  gulp.src('sass/**/*.sass')
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(gulp.dest('./'));
});

gulp.task('templates', function() {
  gulp.src(['templates/**/*.jade','!templates/**/_*.jade'])
    .pipe(jade({pretty: true}))
    .pipe(gulp.dest('./'))
});

gulp.task('watch', function () {
  gulp.watch('sass/*.sass',['sass']);

  gulp.watch('templates/*.jade',['templates']);
});

gulp.task('webserver', function() {
  gulp.src('.')
    .pipe(webserver({
      livereload: true,
      directoryListing: false,
      open: true,
      fallback: 'index.html'
    }));
});

// Default Task
gulp.task('default', ['sass','templates','watch', 'webserver']);

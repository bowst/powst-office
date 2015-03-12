// gulpfile.js 
var gulp = require('gulp'),
  bundle = require('gulp-bundle-assets'),
  inject = require('gulp-inject'),
  series = require('stream-series'),
  livereload = require('gulp-livereload'),
  webserver = require('gulp-webserver'),
  tar = require('gulp-tar'),
  gzip = require('gulp-gzip');
 
gulp.task('bundle', function() {
    return gulp.src('./bundle.config.js')
    .pipe(bundle())
    .pipe(bundle.results('./'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('index', ['bundle'], function(){
    var target = gulp.src(['./dist/index.php', './dist/test.html']);
    // It's not necessary to read the files (will speed up things), we're only after their paths: 
    var main = gulp.src(['./dist/main.js', './dist/main.css'], {read: false});
    var vendor = gulp.src(['./dist/vendor*.js', , './dist/vendor*.css'], {read: false});
    return target.pipe(inject(series(vendor, main),{relative:true}))
                 .pipe(gulp.dest('./dist'));
});

gulp.task('tarball', function () {
    return gulp.src('./dist/**')
        .pipe(tar('powst.tar'))
        .pipe(gzip())
        .pipe(gulp.dest('./'));
});

gulp.task('build', ['bundle', 'index']);

gulp.task('release', ['build', 'tarball']);

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch(['app/**/*', '!app/bower_components/**', 'bundle.config.js'], ['build']);
});


 


gulp.task('serve', ['watch'], function() {
  gulp.src('dist')
    .pipe(webserver({
      livereload: true,
      directoryListing: false,
      open: true,
      port: 7337,
      fallback: "test.html"
    }));
});
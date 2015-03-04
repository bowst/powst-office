// gulpfile.js 
var gulp = require('gulp'),
  bundle = require('gulp-bundle-assets'),
  inject = require('gulp-inject'),
  series = require('stream-series');
 
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

gulp.task('build', ['bundle', 'index']);
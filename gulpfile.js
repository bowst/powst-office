// gulpfile.js 
var gulp = require('gulp'),
  bundle = require('gulp-bundle-assets'),
  inject = require('gulp-inject');
 
gulp.task('bundle', function(cb) {
  try{
    gulp.src('./bundle.config.js')
    .pipe(bundle())
    .pipe(bundle.results('./'))
    .pipe(gulp.dest('./dist'));
  }catch(err){
    cb(err);
  }  
});

gulp.task('index', function(){
  var target = gulp.src(['./dist/index.php', './dist/test.html']);
    // It's not necessary to read the files (will speed up things), we're only after their paths: 
    var sources = gulp.src(['./dist/*.js', './dist/*.css'], {read: false});
    return target.pipe(inject(sources))
                 .pipe(gulp.dest('./dist'));
});

gulp.task('build', ['bundle', 'index']);
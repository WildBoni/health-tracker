// Include Gulp
var gulp = require('gulp');

gulp.task('default', function() {
   gulp.src('./bower_components/backbone/backbone.js')
   .pipe(gulp.dest('./src/js/libraries'));
   gulp.src('./bower_components/backbone.localStorage/backbone.localStorage.js')
   .pipe(gulp.dest('./src/js/libraries'));
   gulp.src('./bower_components/jquery/dist/jquery.js')
   .pipe(gulp.dest('./src/js/libraries'));
   gulp.src('./bower_components/requirejs/require.js')
   .pipe(gulp.dest('./src/js/libraries'));
   gulp.src('./bower_components/uikit/css/uikit.css')
   .pipe(gulp.dest('./src/css/libraries'));
   gulp.src('./bower_components/underscore/underscore.js')
   .pipe(gulp.dest('./src/js/libraries'));
});

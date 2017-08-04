var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jasmine = require('gulp-jasmine');

gulp.task('default', ['test']);
gulp.task('test', ['lint', 'unit-test']);

gulp.task('lint', function() {
  return gulp.src([
    'src/**/*.js',
    'spec/**/*.js',
  ])
  .pipe(jshint())
  .pipe(jshint.reporter('default'))
  .pipe(jshint.reporter('fail'));
});

gulp.task('unit-test', function() {
  return gulp.src('spec/unit/**/*.js')
  .pipe(jasmine());
});
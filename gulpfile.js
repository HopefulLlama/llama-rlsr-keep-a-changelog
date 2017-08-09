const gulp = require('gulp');
const jshint = require('gulp-jshint');
const jasmine = require('gulp-jasmine');
const sequence = require('gulp-sequence');

gulp.task('default', ['test']);
gulp.task('test', sequence('lint', 'unit-test'));

gulp.task('lint', () => {
  return gulp.src([
    'src/**/*.js',
    'spec/**/*.js',
  ])
  .pipe(jshint())
  .pipe(jshint.reporter('default'))
  .pipe(jshint.reporter('fail'));
});

gulp.task('unit-test', () => {
  return gulp.src('spec/unit/**/*.js')
  .pipe(jasmine());
});
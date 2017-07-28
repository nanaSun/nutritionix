var gulp = require('gulp');
var connect = require('gulp-connect');
var jshint = require('gulp-jshint');
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var htmlmin = require('gulp-htmlmin');

gulp.task('connect', function() {
    require('./api.js');
    require('./foodapi.js');
    connect.server({
        port:8080,
        livereload: true
    });
});

gulp.task('bower', function() {
  return bower({ directory: './vendor' })
});

gulp.task('check', function() {
    return gulp.src(['./src/scripts/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});
gulp.task('zip',function(){
	gulp.src('./src/*.html')
        .pipe(usemin({
            js: [uglify(), 'concat'],
            inlinejs: [uglify(), 'concat']
        }))
        .pipe(gulp.dest('dist'));
    gulp.src('./src/images/*')
        .pipe(gulp.dest('dist/images'));
    gulp.src('./src/styles/*.css')
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/styles'));
})
gulp.task('default', ["connect"]);
gulp.task('serve',  function() {
    require('./api.js');
    connect.server({
        port:80,
        root: ['dist'],
        livereload: true
    });
});
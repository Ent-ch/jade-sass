/*global require */
var gulp = require('gulp'),
    $ = require('gulp-load-plugins')();

gulp.task('build', ['scripts', 'styles', 'templates']);

gulp.task('default', ['server']);

gulp.task('scripts', function () {
    return gulp.src('src/scripts/app.js')
        .pipe($.browserify({debug: true}))
        .pipe(gulp.dest('dist/scripts/'))
        .pipe($.connect.reload());
});

gulp.task('styles', function () {
    return gulp.src('src/styles/app.scss')
        .pipe($.sass({
            errLogToConsole: true
        }))
        .pipe(gulp.dest('dist/styles'))
        .pipe($.connect.reload());
});

gulp.task('templates', function () {
    return gulp.src('src/templates/**/*.jade')
        .pipe($.jade({
            pretty: true
        }))
        .pipe(gulp.dest('dist'))
        .pipe($.connect.reload());
});

gulp.task('watch', ['styles', 'scripts', 'templates'], function () {
    gulp.watch('src/**/*.jade', ['templates']);
    gulp.watch('src/**/*.js', ['scripts']);
    gulp.watch('src/**/*.scss', ['styles']);
});

gulp.task('server', ['watch'], function () {
    $.connect.server({
        root: 'dist',
        port: 3000,
        livereload: true
    });
});
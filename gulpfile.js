/*global require */
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    modRewrite = require('connect-modrewrite'),
    plugins = require('gulp-load-plugins')();

gulp.task('build', ['scripts', 'styles', 'templates']);

gulp.task('default', ['server']);

gulp.task('scripts', function () {
    return gulp.src('src/scripts/app.js')
        .pipe(plugins.browserify({ 
//        debug: true
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts/'))
        .pipe(plugins.connect.reload());
});

gulp.task('styles', function () {
    return gulp.src('src/styles/app.scss')
        .pipe(plugins.sass({
            errLogToConsole: true
        }))
        .pipe(gulp.dest('dist/styles'))
        .pipe(plugins.connect.reload());
});

gulp.task('templates', function () {
    return gulp.src(['src/templates/**/*.jade', '!src/templates/inc/**'])
        .pipe(plugins.jade({
            pretty: true
        }))
        .pipe(gulp.dest('dist'))
        .pipe(plugins.connect.reload());
});

gulp.task('watch', ['styles', 'scripts', 'templates'], function () {
    gulp.watch('src/**/*.jade', ['templates']);
    gulp.watch('src/**/*.js', ['scripts']);
    gulp.watch('src/**/*.scss', ['styles']);
});

gulp.task('server', ['watch'], function () {
    plugins.connect.server({
        root: 'dist',
        port: 3000,
        livereload: true,
        middleware: function (connect, opt) {
            return [
            modRewrite([
                '^/api/(.*)$ http://s2.dev:8010/$1 [P]'
                ])
            ];
        }
        
    });
});
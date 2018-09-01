var gulp          = require('gulp');
var autoprefixer  = require('gulp-autoprefixer');
var uglify        = require('gulp-uglify');
var rename        = require('gulp-rename');
var cleanCSS      = require('gulp-clean-css');

var srcFolder =  'src';
var distFolder = 'dist';

gulp.task('css', function () {
    return gulp.src('src/simple-password-meter.css')
    .pipe(autoprefixer({
        browsers: ['> 1%', 'last 3 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('css-min', function () {
    return gulp.src('src/simple-password-meter.css')
    .pipe(autoprefixer({
        browsers: ['> 1%', 'last 3 versions'],
        cascade: false
    }))
    .pipe(cleanCSS())
    .pipe(rename("simple-password-meter.min.css"))
    .pipe(gulp.dest('dist'));
});

gulp.task('js', function() {
    return gulp.src('src/simple-password-meter.js')
    .pipe(gulp.dest('dist'))
});

gulp.task('js-min', function() {
    return gulp.src('src/simple-password-meter.js')
    .pipe(uglify({ mangle: true }))
    .pipe(rename("simple-password-meter.min.js"))
    .pipe(gulp.dest('dist'))
});

gulp.task('default', ['css', 'css-min', 'js', 'js-min']);

var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect')
var app             = {};
app.files           = 'app';
app.sassFiles       = 'app/sass/*.scss';
app.components   = 'app/components/**/*.js';
app.componentsTemplates = 'app/components/**/*.html';

gulp.task('default',['server', 'sass']);

gulp.task('server', function() {
  	connect.server({
  	port: 9000,
  	host: 'localhost',
	fallback: 'index.html'
	});
});

gulp.task('sass', function() {
    gulp.src('sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css/'));
});
 


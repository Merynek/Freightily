var gulp = require('gulp');
var connect = require('gulp-connect')
var app             = {};
app.files           = 'app';
app.components   = 'app/components/**/*.js';
app.componentsTemplates = 'app/components/**/*.html';

gulp.task('default',['server']);

gulp.task('server', function() {
  	connect.server({
  	port: 9000,
  	host: 'localhost',
	fallback: 'index.html'
	});
});
/* jshint node: true */

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var sourcemap = require('gulp-sourcemaps');


gulp.task('sass', function() {
	return gulp.src('scss/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('css'));
});

gulp.task('concat', function() {
	return gulp.src([
			'js/**/angular.js',
			'js/**/!(*mock*|angular.js|angular.min.js).js'
		])
		.pipe(sourcemap.init({loadMaps: true}))
		.pipe(concat('app.js'))
		.pipe(sourcemap.write())
		.pipe(gulp.dest('public/js'));
});

gulp.task('watch', function() {
	gulp.watch('js/**/*.js', ['concat']);
	gulp.watch('scss/**/*.scss', ['sass']);
});


gulp.task('build', ['concat', 'sass']);

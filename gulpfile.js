var gulp = require('gulp');
var htmlMin = require('gulp-htmlmin');
var concat = require('gulp-concat');
var ugLify = require('gulp-uglify');
var babel = require('gulp-babel');
var del = require('del');
var changed = require('gulp-changed');
var browserSync = require('browser-sync').create();

gulp.task('delete',function(cb){
	return del(['dist/*','!dist/images','dist/js/*'],cb);
})

gulp.task('html',function(){
	var options = {
		removeComments:true,
		collapseWhitespace:true,
		removeScriptTypeAttributes:true,
		removeScriptStyleLinkTypeAttributes:true,
		minifyJS:true,
		minifyCSS:true};
	gulp.src('src/index.html')
	.pipe(changed('dist',{hasChanged:changed.compareLastModifiedTime}))
	.pipe(htmlMin(options))
	.pipe(gulp.dest('dist'))
	.pipe(browserSync.reload({stream:true}));
});

gulp.task("script",function(){
	gulp.src(['src/*.js'])
	.pipe(changed('dist/js',{hasChanged:changed.compareLastModifiedTime}))
	.pipe(concat('one.js'))
	// .pipe(ugLify())
	.pipe(gulp.dest('dist/js'))
	.pipe(browserSync.reload({stream:true}));

});

gulp.task('es6',function(){
	gulp.src('src/js/es6index.js')
	.pipe(changed('dist/js/convertedES6',{hasChanged:changed.compareLastModifiedTime}))
	.pipe(babel({presets:['es2015']}))
	.pipe(gulp.dest('dist/js/convertedES6'))
	.pipe(browserSync.reload({stream:true}));
});

gulp.task("css",function(){
	gulp.src("src/css/*.css")
	.pipe(changed('dist/css',{hasChanged:changed.compareLastModifiedTime}))
	.pipe(gulp.dest('dist/css'))
	.pipe(browserSync.reload({stream:true}));
});

gulp.task("vendor",function(){
	gulp.src(['src/vendor/*','src/vendor/**/*'],{base:'./src/vendor'})
	.pipe(gulp.dest('dist/vendor'))
	.pipe(browserSync.reload({stream:true}));
});

gulp.task('angular',function(){
	gulp.src(['src/vendor/angular-1.4.8/angular.min.js',
		'src/vendor/angular-1.4.8/angular-route.min.js',
		'src/vendor/angular-1.4.8/angular.min.js.map',
		'src/vendor/angular-1.4.8/angular-route.min.js.map'])
	.pipe(gulp.dest('dist/vendor/angular'))
	.pipe(browserSync.reload({stream:true}));
});

gulp.task('serve',['delete'],function(){
	gulp.start('html','script','vendor','css','es6','angular');
	browserSync.init({
		port:2017,
		server:{
			baseDir:['dist']
		}
	});
	gulp.watch('src/*.html',['html']);
	gulp.watch(['src/*.js'],['script']);
	gulp.watch(['src/vendor','src/vendor/**/*'],['vendor']);
	gulp.watch('src/css/*.css',['css']);
	gulp.watch('src/js/es6index.js',['es6']);
	gulp.watch(['src/vendor/angular-1.4.8/angular.min.js','src/vendor/angular-1.4.8/angular-route.min.js'],['angular']);
});

gulp.task('default',['serve']);
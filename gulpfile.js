const gulp         = require('gulp');
const stylus       = require('gulp-stylus');
const postcss      = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps   = require('gulp-sourcemaps');
const concat       = require('gulp-concat');
const include      = require('gulp-include');
const gutil        = require('gulp-util');
const plumber      = require('gulp-plumber');
const notify       = require('gulp-notify');
const handlebars   = require('gulp-handlebars');
const wrap         = require('gulp-wrap');
const declare      = require('gulp-declare');
const cache        = require('gulp-cached');
const merge        = require('merge-stream');
const sequence     = require('run-sequence');
const path         = require('path');
const del          = require('del');
const svgSprite    = require("gulp-svg-sprites");
const svgo         = require('gulp-svgo');
const hbs          = require('handlebars');
const plugins      = require('gulp-load-plugins')();
const server       = require('browser-sync').create();
const isProd       = gutil.env.prod;

const errorHandler = (title = 'Error') => plumber({
	errorHandler: notify.onError({
		title,
		message: '<%= error.message %>',
		sound: 'Submarine'
	})
});

const svgoSettings = {
	plugins: [
		{removeViewBox: false},
		{removeTitle: true},
		{cleanupIDs: false}
	]
};

gulp.task('server', require('./gulp-tasks/server/server')(server, gutil));

gulp.task('styles', require('./gulp-tasks/styles/styles')(gulp, plugins, errorHandler, isProd, autoprefixer));

gulp.task('scripts:vendor', require('./gulp-tasks/bundle-scripts/bundle-scripts')(gulp, plugins, 'src/js/vendor.js', errorHandler, path, __dirname));

gulp.task('scripts:app', require('./gulp-tasks/bundle-scripts/bundle-scripts')(gulp, plugins, 'src/js/app.js', errorHandler, path, __dirname));

gulp.task('scripts', [
	'scripts:vendor',
	'scripts:app'
]);

gulp.task('templates', require('./gulp-tasks/templates/templates')(gulp, plugins, errorHandler, path, hbs, merge));

gulp.task('static:html', () => {
	return gulp
		.src('src/index.html')
		.pipe(errorHandler())
		.pipe(include())
		.pipe(gulp.dest('public'));
});

gulp.task('static:fonts', () => {
	return gulp
		.src([
			'node_modules/font-awesome/fonts/*.{woff2,woff}',
			'node_modules/bootstrap/dist/fonts/*.{woff2,woff}'
		])
		.pipe(errorHandler())
		.pipe(gulp.dest('public/fonts'));
});

gulp.task('static:images', () => {
	return gulp
		.src('src/img/**/*.*')
		.pipe(errorHandler())
		.pipe(gulp.dest('public/img'));
});

gulp.task('static', ['static:html', 'static:images', 'static:fonts'], () => {
	return gulp
		.src([
			'src/favicon.ico'
		])
		.pipe(errorHandler())
		.pipe(gulp.dest('public'));
});

gulp.task('clean', () => {
	return del('public').then((paths) => {
		gutil.log('Deleted:', gutil.colors.magenta(paths.join('\n')));
	});
});

// minify svg files
gulp.task('svgo', () => {
	return gulp.src('src/img/svg/*.svg')
		.pipe(svgo(svgoSettings))
		.pipe(gulp.dest('src/img/svg'));
});

// make sprite from svg files
gulp.task('sprites', () => {
	return gulp.src('src/img/svg/*.svg')
		.pipe(svgSprite({
			mode: "symbols",
			preview: false,
			svgId: "custom-icon-%f",
			svg: {
				symbols: "sprite.svg"
			}
		}))
		.pipe(gulp.dest('src/img/sprite'));
});

// minify svg sprite
gulp.task('minify-svg-sprite', () => {
	return gulp.src('src/img/sprite/*.svg')
		.pipe(svgo(svgoSettings))
		.pipe(gulp.dest('src/img/sprite'))
});

// task that run consistently all tasks that create svg sprite
gulp.task('svg-optimize-sprite', (done) => {
	sequence('svgo', 'sprites', 'minify-svg-sprite', function () {
		done();
	});
});

// build task
gulp.task('build', (cb) => {
	sequence(
		'clean',
		'styles',
		'scripts',
		'templates',
		'svg-optimize-sprite',
		'static',
		cb
	);
});

// watch task
gulp.task('watch', () => {
	gulp.watch('src/css/**/*.styl', ['styles']);
	gulp.watch(['src/js/**/*.js', '!src/js/vendor.js'], ['scripts:app']);
	gulp.watch('!src/js/vendor.js', ['scripts:vendor']);
	gulp.watch('src/index.html', ['static:html']);
	gulp.watch('src/templates/**/*.hbs', ['templates']);
});

// default task
gulp.task('default', () => {
	sequence(
		'build',
		'watch',
		'server'
	);
});
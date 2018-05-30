module.exports = (gulp, plugins, errorHandler, isProd, autoprefixer) => {
	return () => {
		gulp.src('src/css/[^_]*.styl')
			.pipe(errorHandler())
			.pipe(plugins.sourcemaps.init())
			.pipe(plugins.stylus({
				paths: ['src/css', 'node_modules'],
				'include css': true,
				compress: isProd
			}))
			.pipe(plugins.postcss([autoprefixer()]))
			.pipe(plugins.sourcemaps.write('./'))
			.pipe(gulp.dest('public/css'));
	};
};
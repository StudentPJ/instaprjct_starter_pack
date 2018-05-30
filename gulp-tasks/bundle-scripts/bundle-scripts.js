module.exports = (gulp, plugins, src, errorHandler, path, __dirname) => {
	return () => {
		gulp.src(src)
			.pipe(errorHandler())
			.pipe(plugins.sourcemaps.init())
			.pipe(plugins.include({
				includePaths: [
					path.join(__dirname, 'node_modules'),
					path.join(__dirname, 'src', 'js')
				]
			}))
			.pipe(plugins.sourcemaps.write('./'))
			.pipe(gulp.dest('public/js'));
	};
};
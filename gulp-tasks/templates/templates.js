module.exports = (gulp, plugins, errorHandler, path, hbs, merge) => {
	return () => {
		const partials = gulp
			.src('src/templates/**/_*.hbs')
			.pipe(errorHandler())
			.pipe(plugins.handlebars({
				handlebars: hbs
			}))
			.pipe(plugins.wrap('Handlebars.registerPartial(<%= partName(file.relative) %>, Handlebars.template(<%= contents %>));', {}, {
				imports: {
					partName(fileName) {
						return JSON.stringify(path.basename(fileName, '.js').substr(1));
					}
				}
			}));

		const templates = gulp
			.src('src/templates/**/[^_]*.hbs')
			.pipe(errorHandler())
			.pipe(plugins.handlebars({
				handlebars: hbs
			}))
			.pipe(plugins.wrap('Handlebars.template(<%= contents %>)'))
			.pipe(plugins.declare({
				namespace: 'templates',
				noRedeclare: true
			}));

		return merge(partials, templates)
			.pipe(plugins.concat('templates.js'))
			.pipe(gulp.dest('public/js'))
	};
};
module.exports = (server, gutil) => {
	return () => {
		server.init({
			server: {
				baseDir: ['public', 'src'],
				routes: {
					'/libs': 'node_modules'
				}
			},
			files: [
				'public/css/**/*.css',
				'public/js/**/*.js',
				'public/**/*.html'
			],
			open: gutil.env.open !== false,
			ghostMode: false,
			middleware: [
				require('connect-history-api-fallback')()
			]
		});
	};
};

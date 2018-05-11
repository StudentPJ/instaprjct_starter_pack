page('/', () => {
	document.getElementById('root');

	root.innerHTML = templates['main']({});
});

page();
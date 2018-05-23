function home(ctx) {
	console.log(ctx);
	rootEl.innerHTML = templates.main({
		user: ctx.user,
		profile: ctx.user
	});

	if (!ctx.user) {
		return;
	}

	const feed  = document.getElementById('feed');
	const dbRef = firebase.database().ref();

	dbRef
		.child('posts')
		.orderByChild('likesCountNum')
		.limitToLast(10)
		.once('value')
			.then(snapshot => {
				snapshot.forEach(childSnapshot => {
					let childKey = childSnapshot.key;
					let childData = childSnapshot.val();

					if (!childData) return;

					const post = new Post(childKey, { currentUser: ctx.user });
					feed.insertBefore(post.getElement(), feed.firstElementChild);
				});
			});
}
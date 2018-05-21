class Post {
	/**
	 * @param  {string|Object} post - Post id as string or already retrieved data of post
	 * @return {void}
	 */
	constructor(post, props = {}) {
		this.props = Object.assign({}, Post.defaults, props);
		this.tpl = Handlebars.partials.post;
		this.currentUser = this.props.currentUser;
		this.liked = false; // is post liked by currentUser?
		this.disliked = false; // is post disliked by currentUser?

		this._onDataRetrieved = this._onDataRetrieved.bind(this);
		// this._onDataChanged()

		this._setupDomElement();
		this._setupDbRef(post);
	}

	render() {
		console.time('render');
		this.element.innerHTML = this.tpl(
			Object.assign({}, this.data, {
				author: this.author,
				currentUser: this.currentUser,
				liked: this.liked,
				likesCount: Object.keys((this.data && this.data.likes) || {}).length,
				disliked: this.disliked,
				dislikesCount: Object.keys((this.data && this.data.dislikes) || {}).length,
				isOwner: this.data.author === this.currentUser.uid
			})
		);
		console.log('this is this', this);
		console.timeEnd('render');

		/*---=== click on like or dislike ===---*/
		this.element.addEventListener('click', (e) => {
			e.stopImmediatePropagation();

			let clickTargetClassList = e.target.className.split(' ');

			if (clickTargetClassList.indexOf('fa-heart-o') === 1) {
				console.log('like');

				firebase.database().ref(`posts/${this.data.id}`).child('likes').update({
					[this.currentUser.uid]: {
						type: 'default',
						createdAt: (new Date()).toISOString()
					}
				});

			} else if (clickTargetClassList.indexOf('custom-icon--broken-heart')) {
				console.log('dislike');
			}
		});
		/*---=== /click on like or dislike ===---*/

	}

	getElement() {
		return this.element;
	}

	_setupDomElement() {
		this.element = document.createElement('article');
		this.element.classList = 'post';
	}

	_fetchAutor() {
		firebase
			.database()
			.ref(`users/${this.data.author}`)
			.once('value', snapshot => {
				this.author = snapshot.val();
				this.render();
			});
	}

	_onDataRetrieved(snapshot) {
		this.data = snapshot.val();
		this.author || this._fetchAutor();
		this.element.setAttribute('data-post', this.data.id);
		this.liked = !!(this.data.likes && this.data.likes[this.currentUser.uid]);
		this.disliked = !!(this.data.dislikes && this.data.dislikes[this.currentUser.uid]);
		this.render();
		console.log('data retrived', this.data);
	}

	_onDataChanged(snapshot) {
		const key = snapshot.key;
		const value = snapshot.val();
		this.data[key] = value;
		this.render();
		console.log('data changed', key, value);
	}

	_setupDbRef(post) {
		const id = typeof post === 'string' ? post : post.id;
		this.dbRef = firebase.database().ref(`posts/${id}`);
		this.dbRef.on('value', this._onDataRetrieved);
	}

}

Post.defaults = {
	currentUser: {}
};
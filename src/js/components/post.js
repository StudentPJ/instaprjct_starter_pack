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
		// this._onDataChanged();

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

		/*---=== update likes count ===---*/
		function updateLikeCount(elemThis) {
			firebase.database().ref(`posts/${elemThis.data.id}`).update({
				likesCountNum: Object.keys((elemThis.data && elemThis.data.likes) || {}).length
			});
		}
		/*---=== /update likes count ===---*/

		/*---=== update db data on like or dislike ===---*/
		function dbUpdate(elemThis, child) {
			firebase.database().ref(`posts/${elemThis.data.id}`).child(child).update({
				[elemThis.currentUser.uid]: {
					createdByUserName: elemThis.currentUser.username,
					createdByUserEmail: elemThis.currentUser.email,
					type: 'default',
					createdAt: (new Date()).toLocaleString('uk'),
				}
			});
		}
		/*---=== /update db data on like or dislike ===---*/

		/*---=== click on like or dislike ===---*/
		this.element.addEventListener('click', (e) => {
			e.stopImmediatePropagation();

			let clickTarget = e.target.className;

			let checkClass = className => {
				if(e.target.className.split(' ').indexOf(className) === 1) {
					return true;
				}
			};

			if (clickTarget === 'post__like') {
				// console.log('like');
				dbUpdate(this, 'likes');
				updateLikeCount(this);

			} else if (clickTarget === 'post__dislike') {
				// console.log('dislike');
				dbUpdate(this, 'dislikes');
			} else if(checkClass('action-button-group__item--smiley-face')) {
				console.log('smiley-face');
			} else if(checkClass('action-button-group__item--sad-face')) {
				console.log('sad-face');
			} else if(checkClass('action-button-group__item--angry-face')) {
				console.log('angry-face');
			} else if(checkClass('action-button-group__item--surprised-face')) {
				console.log('surprised-face');
			} else if(checkClass('action-button-group__item--thumbs-up')) {
				console.log('thumbs-up');
			}
		});
		/*---=== /click on like or dislike ===---*/

		let myLazyLoad = new LazyLoad();

		[].slice.call(document.querySelectorAll('.post__content-image-item')).forEach((item) => {
			console.dir(item);
			console.log('clientHeight: ', item.height);
		})
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
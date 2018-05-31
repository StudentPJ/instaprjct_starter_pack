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
		this.emotionally = false; // is post emotional by currentUser?

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
				emotionally: this.emotionally,
				emotionsCount: Object.keys((this.data && this.data.emotions) || {}).length,
				isOwner: this.data.author === this.currentUser.uid
			})
		);
		console.log('this is this', this);
		console.timeEnd('render');

		let dbConnect = firebase.database();

		/*---=== update likes count ===---*/
		let updateLikeCount = elemThis => {
			dbConnect.ref(`posts/${elemThis.data.id}`).update({
				likesCountNum: Object.keys((elemThis.data && elemThis.data.likes) || {}).length
			});
		};
		/*---=== /update likes count ===---*/

		/*---=== update db data on like or dislike ===---*/
		let dbUpdate = (elemThis, child) => {
			dbConnect.ref(`posts/${elemThis.data.id}`).child(child).update({
				[elemThis.currentUser.uid]: {
					createdByUserName: elemThis.currentUser.username,
					createdByUserEmail: elemThis.currentUser.email,
					type: 'default',
					createdAt: (new Date()).toLocaleString('uk'),
				}
			});
		};
		/*---=== /update db data on like or dislike ===---*/

		/*---=== update db data on emotions ===---*/
		let emotionsDbUpdate = (elemThis, emotionType) => {
			dbConnect.ref(`posts/${elemThis.data.id}`).child('emotions').update({
				[elemThis.currentUser.uid]: {
					createdByUserName: elemThis.currentUser.username,
					createdByUserEmail: elemThis.currentUser.email,
					emotionType: emotionType,
					createdAt: (new Date()).toLocaleString('uk')
				}
			});
		};
		/*---=== /update db data on emotions ===---*/

		/*---=== click on like or dislike ===---*/
		this.element.addEventListener('click', (e) => {
			e.stopImmediatePropagation();

			let clickTarget = e.target;
			let clickTargetClass = clickTarget.className;
			let likeIcon = clickTarget.querySelector(".custom-icon").classList.contains('custom-icon-heart-active');

			// check class on clicked element
			let checkClass = classNamePart => {
				if(e.target.classList.contains(`action-button-group__item--${classNamePart}`)) {
					return true;
				}
			};

			if (clickTargetClass === 'post__like' && !likeIcon) {
				dbUpdate(this, 'likes');
				updateLikeCount(this);
			} else if (clickTargetClass === 'post__dislike') {
				dbUpdate(this, 'dislikes');
			} else if(checkClass('smiley-face')) {
				emotionsDbUpdate(this, 'smiley-face');
			} else if(checkClass('sad-face')) {
				emotionsDbUpdate(this, 'sad-face');
			} else if(checkClass('angry-face')) {
				emotionsDbUpdate(this, 'angry-face');
			} else if(checkClass('surprised-face')) {
				emotionsDbUpdate(this, 'surprised-face');
			} else if(checkClass('thumbs-up')) {
				emotionsDbUpdate(this, 'thumbs-up');
			}
		});
		/*---=== /click on like or dislike ===---*/

		// init LazyLoad plugin
		let myLazyLoad = new LazyLoad();
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
		this.emotionally = !!(this.data.emotions && this.data.emotions[this.currentUser.uid]);
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
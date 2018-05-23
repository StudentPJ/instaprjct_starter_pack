(function() {

  const icons = {
    twitter     : 'fa fa-twitter',
    facebook    : 'fa fa-facebook',
    vkontakte   : 'fa fa-vk',
    website     : 'fa fa-globe',
    publicEmail : 'fa fa-envelope-o',
    phoneNumber : 'fa fa-phone'
  };

  const socialLinkTemplates = {
    twitter     : (param) => `https://twitter.com/${param}`,
    facebook    : (param) => `https://www.facebook.com/${param}`,
    vkontakte   : (param) => `https://vk.com/${param}`,
    website     : (param) => param,
  };

  Handlebars.registerHelper('socialIconFor', (name) => {
    return icons[name] || '';
  });

  Handlebars.registerHelper('socialLinkFor', (name, value) => {
    const tpl = socialLinkTemplates[name];
    if (!tpl) return name;
    return tpl(value);
  });

  Handlebars.registerHelper('decamelize', (str) => {
    return str
      .split(/(?=[A-Z])/)
      .map(word => word[0].toUpperCase() + word.slice(1))
      .join(' ');
  });

  Handlebars.registerHelper('formatDate', (dateString) => {
    return moment(dateString).fromNow(true);
  });

  Handlebars.registerHelper('sortBy', () => {});

  Handlebars.registerHelper('ifCond', (v1, operator, v2, options) => {
    switch (operator) {
      case '==':
        // eslint-disable-next-line eqeqeq
        return (v1 == v2) ? options.fn(this) : options.inverse(this);
      case '===':
        return (v1 === v2) ? options.fn(this) : options.inverse(this);
      case '!=':
        // eslint-disable-next-line eqeqeq
        return (v1 != v2) ? options.fn(this) : options.inverse(this);
      case '!==':
        return (v1 !== v2) ? options.fn(this) : options.inverse(this);
      case '<':
        return (v1 < v2) ? options.fn(this) : options.inverse(this);
      case '<=':
        return (v1 <= v2) ? options.fn(this) : options.inverse(this);
      case '>':
        return (v1 > v2) ? options.fn(this) : options.inverse(this);
      case '>=':
        return (v1 >= v2) ? options.fn(this) : options.inverse(this);
      case '&&':
        return (v1 && v2) ? options.fn(this) : options.inverse(this);
      case '||':
        return (v1 || v2) ? options.fn(this) : options.inverse(this);
      default:
        return options.inverse(this);
    }
  });

} ());

// Initialize Firebase
var firebaseConfig = {
	apiKey: "AIzaSyC8jSUIU7CizElYAx21nBMz9nu0UemZ2mw",
	authDomain: "instaprjct-42ab8.firebaseapp.com",
	databaseURL: "https://instaprjct-42ab8.firebaseio.com",
	projectId: "instaprjct-42ab8",
	storageBucket: "instaprjct-42ab8.appspot.com",
	messagingSenderId: "881000761959"
};
const generateID = (prefix = '', len = 6) =>
  prefix + Math.random().toString(36).slice(2, len + 2);

class Editor {
  constructor(el, props) {
    this.root             = el;
    this.props            = Object.assign({}, Editor.defaults, props);
    this.canvasContainer  = this.root.querySelector(this.props.canvasContainer, this.root);
    this.filtersContainer = this.root.querySelector(this.props.filtersContainer, this.root);
    this.fileInput        = this.root.querySelector(this.props.fileInput, this.root);
    this.triggerReset     = this.root.querySelector(this.props.triggerReset, this.root);
    this.triggerUpload    = this.root.querySelector(this.props.triggerUpload, this.root);
    this.progressBar      = this.root.querySelector(this.props.progressBar, this.root);
    this.caption          = this.root.querySelector(this.props.caption, this.root);
    this.file             = null;
    this.filter           = null;
    this._processing      = false;

    this.resetFilter       = this.resetFilter.bind(this);
    this.save              = this.save.bind(this);
    this._onFileChange     = this._onFileChange.bind(this);
    this._onFilterClick    = this._onFilterClick.bind(this);
    this._onUploadProgress = this._onUploadProgress.bind(this);

    this.triggerReset.style.display = 'none';

    this._bindEvents();
    console.log(this);
  }

  applyFilter(filter) {
    if (!(filter in this.caman)) {
      console.log(`There is no filter with name "${filter}"`);
      return;
    }

    if (this.filter === filter || this._processing) {
      return;
    }

    this._processing = true;
    this._toggleBusyState();
    this.caman.revert();
    this.caman[filter]();
    this.caman.render(() => {
      this._processing = false;
      this._toggleBusyState();
      this.filter = filter;
      this._highlightActiveFilter();
    });
  }

  resetFilter() {
    if (!this.filter) return;
    this.filter = null;
    this.caman && this.caman.revert();
    this._highlightActiveFilter();
    this.triggerReset.style.display = 'none';
  }

  // get caption and add it to the post as first comment
  _getComments() {
    const caption = this.caption.value.trim();

    if (!caption) return {};

    const { uid, username } = this.props.currentUser;
    const commentId = generateID('comment-');
    console.log(this.props.currentUser);

    return {
      [commentId]: {
        id: commentId,
        value: caption,
        author: username,
        authorId: uid,
        created: (new Date()).toISOString()
      }
    };
  }

  save() {
    const id          = generateID('post-');
    const user        = firebase.auth().currentUser;
    const dbPath      = `/posts/${id}`;
    const storagePath = `/pictures/${user.uid}/${id}.jpg`;
    const storageRef  = firebase.storage().ref(storagePath);
    const dbRef       = firebase.database().ref(dbPath);

    // show spinner and progress bar
    this._toggleBusyState();
    this._toggleUploadingState();

    // upload image to firebase as base64 encoded string
    const uploadTask = storageRef.putString(
      this.caman.toBase64('.jpg'),
      'data_url'
    );

    // show progress while uploading
    uploadTask.on('state_changed', this._onUploadProgress);

    uploadTask
      // create entry in firebase database after successfull upload
      .then(snapshot => {
        const { timeCreated, downloadURLs, fullPath } = snapshot.metadata;
        return dbRef.set({
          id,
          author: user.uid,
          created: timeCreated,
          url: downloadURLs[0],
          filterName: this.filter,
          storagePath: fullPath,
          dimensions: {
            width: this.caman.width,
            height: this.caman.height
          },
          comments: this._getComments()
        });
      })
      // hide spinner and progress bar
      .then(() => {
        this._toggleBusyState();
        this._toggleUploadingState();
        this.props.onSave();
      })
      // handle error while uploading or entry creation
      .catch(error => {
        console.log(error);
        this.props.onError(error);
      });
  }

  _bindEvents() {
    this.triggerReset.addEventListener('click', this.resetFilter);
    this.triggerUpload.addEventListener('click', this.save);
    this.fileInput.addEventListener('change', this._onFileChange);

    this.filtersContainer.addEventListener('click', (event) => {
      if (event.target.matches('[data-filter]')) {
        this._onFilterClick(event);
      }
    });
  }

  _onFileChange(e) {
    this.file = this.fileInput.files[0];
    this._initEditor();
  }

  _onFilterClick(e) {
    const target     = e.target;
    const { filter } = target.dataset;
    if (!filter) return;
    this.applyFilter(filter);
  }

  _onUploadProgress(snapshot) {
    const progress = snapshot.bytesTransferred / snapshot.totalBytes * 100;
    this.progressBar.style.width = progress + '%';
  }

  _highlightActiveFilter() {
    const { activeClass } = this.props;
    const prevActive = document.querySelector('.is-active', this.filtersContainer);
    const nextActive = this.filter
      ? document.querySelector(`[data-filter="${this.filter}"]`, this.filtersContainer)
      : null;
    prevActive && prevActive.classList.remove(activeClass);
    nextActive && nextActive.classList.add(activeClass);
    this.triggerReset.style.display = '';
  }

  _toggleBusyState() {
    const { busyClass } = this.props;
    const isBusy   = this.root.classList.contains(busyClass);
    const triggers = [this.triggerReset, this.triggerUpload];
    const method   = isBusy ? 'removeAttribute' : 'setAttribute';

    this.root.classList.toggle(busyClass);
    triggers.forEach(el => el[method]('disabled', true));
  }

  _toggleUploadingState() {
    this.root.classList.toggle(this.props.uploadingClass);
  }

  _initEditor() {
    const { busyClass, hasImageClass, imageMaxSize } = this.props;
    const url    = URL.createObjectURL(this.file);
    const canvas = document.createElement('canvas');

    if (this.canvas) {
      this.canvas.parentNode.replaceChild(canvas, this.canvas);
    } else {
      this.canvasContainer.appendChild(canvas);
    }

    this.canvas = canvas;
    this._toggleBusyState();
    this.caman = Caman(this.canvas, url, (caman) => {
      const { originalWidth, originalHeight } = caman;
      const ratio  = originalWidth / originalHeight;
      const width  = originalWidth > imageMaxSize ? imageMaxSize : originalWidth;
      const height = Math.round(width / ratio);

      caman.resize({ width, height }).render();

      this._toggleBusyState();
      this.root.classList.add(hasImageClass);
    });
  }
}

Editor.defaults = {
  currentUser: {},
  activeClass: 'is-active',
  busyClass: 'is-busy',
  hasImageClass: 'has-image',
  uploadingClass: 'is-uploading',
  filtersContainer: '.editor__presets',
  canvasContainer: '.editor__canvas-container',
  triggerReset: '.editor__reset',
  triggerUpload: '.editor__upload',
  fileInput: 'input[type="file"]',
  progressBar: '.editor__progress .progress-bar',
  caption: '.editor__caption textarea',
  imageMaxSize: 1200,
  onSave: () => {},
  onError: () => {}
};

Editor.FILTERS = [
  'vintage',
  'lomo',
  'clarity',
  'sinCity',
  'sunrise',
  'crossProcess',
  'orangePeel',
  'love',
  'grungy',
  'jarques',
  'pinhole',
  'oldBoot',
  'glowingSun',
  'hazyDays',
  'herMajesty',
  'nostalgia',
  'hemingway',
  'concentrate'
];

const errorTexts = {
	required: 'Field should be required',
	hasAtSymbol: 'Field should has @',
	password: 'Password should be at least six symbols',
	username: 'Username should contains only letters',
	displayName: 'Username should contains only letters'
};

const validators = {
	required: value => value.length !== 0,
	hasAtSymbol: value => value.indexOf('@') !== -1,
	password: value => value.length > 6,
	username: value =>  /\w+/.test(value),
	displayName: value => /\w+/.test(value)
};

class FormField {
	constructor(element, options) {
		this.element = element;
		this.options = Object.assign({}, FormField.defaultOptions, options);
		this.errors = [];
	}

	isValid() {
		for(let i = 0; i < this.options.validations.length; i++) {
			let valName = this.options.validations[i];

			if(validators[valName](this.element.value) === false) {
				this.errors.push(errorTexts[valName]);
				return false;
			}

		}

		return true;
	}

	resetState() {
		this.element.parentNode.classList.remove(this.options.errorClass);
		this.element.parentNode.classList.remove(this.options.successClass);
		this.element.nextElementSibling.innerText = '';
	}

	setErrorState(message) {
		this.element.parentNode.classList.add(this.options.errorClass);
		this.element.nextElementSibling.innerText = this.errors;
		if(this.errors.length !== 0) {
			this.errors = [];
		}
	}

	setSuccessState() {
		this.errors = [];
		this.element.parentNode.classList.add(this.options.successClass);
	}

	validate() {
		if(this.isValid() === false) {
			this.resetState();
			this.setErrorState();
		} else {
			this.resetState();
			this.setSuccessState();
		}
	}
}

FormField.defaultOptions = {
	validations: [],
	errorClass: 'has-error',
	successClass: 'has-success'
};
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

			let clickTargetClassList = e.target.className.split(' ');

			if (clickTargetClassList.indexOf('fa-heart-o') === 1) {
				// console.log('like');
				dbUpdate(this, 'likes');
				updateLikeCount(this);

			} else if (clickTargetClassList.indexOf('custom-icon--broken-heart') === 1) {
				// console.log('dislike');
				dbUpdate(this, 'dislikes');
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
		// this.likesCountNum = this.likesCount.likesCountNum
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
function add(ctx, next) {
  rootEl.innerHTML = templates.add({
    user: ctx.user,
    profile: ctx.user,
    filters: Editor.FILTERS
  });

  const editor = document.getElementById('editor');
  new Editor(editor, {
    currentUser: ctx.user,
    onSave: () => {
      page.redirect('/');
    }
  });
}

function errorPage() {
	rootEl.innerHTML = templates['404']();
}
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
		.once('value', snapshot => {
			const entries = snapshot.val();
			console.log('entries::: =>', entries);
			if (!entries) return;
			Object.keys(entries).forEach((key) => {
				let entry = entries[key];
				const post = new Post(entry, { currentUser: ctx.user });
				feed.insertBefore(post.getElement(), feed.firstElementChild);
			})
		});
}
function login() {
	rootEl.innerHTML = templates.login();

	var form = document.getElementById('login-form');

	var {email, password} = form;

	form.addEventListener('submit', (e) => {
		e.preventDefault();

		let emailValidate = new FormField(email, {
			validations: ['required', 'hasAtSymbol']
		});

		let passwordValidate = new FormField(password, {
			validations: ['password']
		});

		emailValidate.validate();
		passwordValidate.validate();

		if(emailValidate.isValid() && passwordValidate.isValid()) {
			firebase.auth().signInWithEmailAndPassword(email.value, password.value)
				.then(() => {
					page('/');
				})
		}
	});

}
function logout() {
	firebase.auth().signOut()
		.then(() => {
			page('/');
		});
}
function profileEdit() {
	rootEl.innerHTML = templates['profile-edit']();
}
function signup () {
	rootEl.innerHTML = templates.signup();
	let form = document.getElementById('signup-form');

	let {email, username, displayName, password, passwordConfirm} = form;

	form.addEventListener('submit', (e) => {
		e.preventDefault();

		let emailValidate = new FormField(email, {
			validations: ['required', 'hasAtSymbol']
		});

		let passwordValidate = new FormField(password, {
			validations: ['password']
		});

		let usernameValidate = new FormField(username, {
			validations: ['username']
		});

		let displayNameValidate = new FormField(displayName, {
			validations: ['displayName']
		});

		emailValidate.validate();
		passwordValidate.validate();
		usernameValidate.validate();
		displayNameValidate.validate();

		if(emailValidate.isValid() && passwordValidate.isValid()) {
			firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
				.then((value) => {
					firebase.database().ref(`users/${value.uid}`).set({
						uid: value.uid,
						email: email.value,
						username: username.value,
						displayName: displayName.value,
						createdAt: (new Date()).toISOString()
					})
						.then(() => {
							page('/');
						});
				});
		}
	});
}

var rootEl = document.getElementById('root');

firebase.initializeApp(firebaseConfig);

page('*', authMiddleware);
page('/', home);
page('/signup', signup);
page('/login', login);
page('/logout', logout);
page('/profile-edit', profileEdit);
page('/add', add);
page('*', errorPage);

function authMiddleware(ctx, next) {
	var user = firebase.auth().currentUser;

	if (user) {
		firebase.database().ref(`users/${user.uid}`)
			.once('value')
			.then((userInfo) => {
				ctx.user = ctx.profile = userInfo.val();
				next();
			});
	} else {
		ctx.user =ctx.profile = null;
		next();
	}
}

const unsubsribe = firebase.auth().onAuthStateChanged(() => {
	page();
	unsubsribe();
});

//# sourceMappingURL=app.js.map

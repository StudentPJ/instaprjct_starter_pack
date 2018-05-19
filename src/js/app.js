//=require 'helpers/*.js'
//=require 'firebase.config.js'
//=require 'components/*.js'
//=require 'routes/*.js'

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

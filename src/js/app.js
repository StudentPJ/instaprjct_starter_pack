//=require 'routes/*'
//=require 'firebase.config.js'

var rootEl = document.getElementById('root');
firebase.initializeApp(firebaseConfig);

page('/', authMiddleware);
page('/', home);
page('/signup', signup);
page('/login', login);
page('/profile-edit', profileEdit);
page('*', errorPage);

page();

function authMiddleware(ctx, next) {
	var user = firebase.auth().currentUser;

	if(user) {
		firebase.database().ref(`users/${user.uid}`)
			.once('value')
			.then((userInfo) => {
				ctx.user = userInfo.val();
				next();
			})
	} else {
		ctx.user = null;
		next();
	}


}
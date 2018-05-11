// Initialize Firebase
var config = {
	apiKey: "AIzaSyC8jSUIU7CizElYAx21nBMz9nu0UemZ2mw",
	authDomain: "instaprjct-42ab8.firebaseapp.com",
	databaseURL: "https://instaprjct-42ab8.firebaseio.com",
	projectId: "instaprjct-42ab8",
	storageBucket: "instaprjct-42ab8.appspot.com",
	messagingSenderId: "881000761959"
};

firebase.initializeApp(config);

/*page('/', () => {
	var root = document.getElementById('root');

	root.innerHTML = templates.main();
});

page('/about', () => {
	console.log('about');
});*/

page('/', home);

function home() {
	var rootEl = document.getElementById('root');
	rootEl.innerHTML = templates.main();

	var login = document.getElementById('login');
	var create = document.getElementById('create');
	var logout = document.getElementById('logout');

	login.addEventListener('click', () => {
		firebase.auth().signInWithEmailAndPassword('user1@mai2.com', '123456789');
	});
	create.addEventListener('click', () => {
		firebase.auth().createUserWithEmailAndPassword('user1@mai2.com', '123456789');
	});
	logout.addEventListener('click', () => {
		firebase.auth().signOut();
	});

}

page();
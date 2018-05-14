function home(ctx) {

	console.log(ctx);
	rootEl.innerHTML = templates.main({
		user: ctx.user,
		profile: ctx.user
	});

	/*var login = document.getElementById('login');
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
	});*/

}
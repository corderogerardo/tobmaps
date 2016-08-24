'use strict';

Template.registerTobmaps.events({
	'submit .js-form-register':function(e){
		e.preventDefault();
		var userName = $('#username').val();
		var userEmail = $('#email').val();
		var userPass = $('#password').val();

		Accounts.createUser({
			username: userName,
			email:userEmail,
			password: userPass
		});

		$('.js-form-register').trigger('reset');
		Router.go('/');
	}
});
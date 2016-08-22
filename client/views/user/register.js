'use strict';

Template.registerTobmaps.events({
	'submit .js-form-register':function(e){
		e.preventDefault();
		var userName = $('#username').val();
		var userEmail = $('#email').val();
		var userPass = $('#password').val();
		console.log("User: "+userName+" "+userEmail+" "+userPass);
		Accounts.createUser({
			username: userName,
			email:userEmail,
			password: userPass
		});
		console.log("User Created");
	}
});
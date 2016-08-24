'use strict';
/*Events*/
/**
 * @param  {[type]}
 * @return {[type]}
 */
Template.loginForm.events({
	"submit .js-form-login":function(e){
		e.preventDefault();
		var userEmail = $('#login-email').val();
		var userPass = $('#login-pass').val();
		var user = Meteor.users.findOne({"email":userEmail});
		if(!user){
				Meteor.loginWithPassword(userEmail,userPass);
				Router.go('dashboard');
		}
	}
});
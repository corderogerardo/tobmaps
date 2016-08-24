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
		Meteor.loginWithPassword(userEmail,userPass);
		if(!Meteor.userId()){
			Router.go('/');
		}else{
			Router.go('dashboard');
		}
		$('.js-form-login').trigger('reset');
	}
});
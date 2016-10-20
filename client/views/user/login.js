'use strict';
/**
 * @memberOf Accounts
 * @name  LoginForm
 * @locus client/views/user
 * @summary Meteor Blaze Template Login
 *
 * @param {BlazeTemplate} onRendered
 * Meteor Blaze Template login onRendered:
 * Handler class to take email and password and login session.
 * 
 * @param {String} email - Get the email from the login form to login session.
 * @param {String} password - Get the password from the login form to login session.
 * @param {String} err/res - return the method value from the server side.
 *
 */

 Template.loginForm.onRendered(function(){
	var validator = $('.js-form-login').validate({
		submitHandler: function(){
			var email = $('[name=email]').val();
			var password = $('[name=password]').val();
			console.log(" "+email+" "+password);
			Meteor.loginWithPassword(email, password, function(error){
				if(error){
					if(error.reason == "User not found"){
						validator.showErrors({
							email: "That email doesn't belong to a registered user."
						});
					}
					if(error.reason == "Incorrect password"){
						validator.showErrors({
							password: "You entered an incorrect password."
						});
					}
				} else {
					Router.go("user.show", {_id: Meteor.userId()});
				}
			});
		}
	});
 });

 $.validator.setDefaults({
	rules: {
		email: {
			required: true,
			email: true
		},
		password: {
			required: true,
			minlength: 6
		}
	},
	messages: {
		email: {
			required: "You must enter an email address.",
			email: "You've entered an invalid email address."
		},
		password: {
			required: "You must enter a password.",
			minlength: "Your password must be at least {0} characters."
		}
	}
 });



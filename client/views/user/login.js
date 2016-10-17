/**
 * onRendered functions to execute a function when the “login” template is first created and then when the “login” template is rendered.
 * @param  {[class='js-register-form']} )
 * @param  {[name='emaio']} )
 * @param  {[name='password']} )
 * @return {[Meteor.call(function(error))]}
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

/**
 * setDefaults function define a default set of rules and error messages validate functions
 * @type {Object}
 */
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



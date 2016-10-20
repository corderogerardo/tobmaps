'use strict';
/**
 * @memberOf Accounts
 * @name  RegisterForm
 * @locus client/views/user
 * @summary Meteor Blaze Template register
 *
 * @param {BlazeTemplate} onRendered
 * Meteor Blaze Template register onRendered:
 * Handler class to take email and password and stores then in accounts scheme.
 * 
 * @param {Object} account - Object with the email and password values to register in accounts collection.
 * @param {String} err/res - return the method value from the server side.
 *
 */

Template.register.onRendered(function(){
  var validator = $('.js-register-form').validate({
    submitHandler: function(){
      var email = $('[name=email]').val();
      var password = $('[name=password]').val();
      var account = {
        email:email,
        password:password,
      };
      Meteor.call('addAccount',account, function(error, res){
        if(error){
            if(error.reason == "Email already exists."){
                validator.showErrors({
                    email: "That email already belongs to a registered user."   
                });
            }
        } else {
            toastr.success('You have create a new account.','User added!');
            $('.js-register-form').trigger('reset');
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





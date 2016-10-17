'use strict';

/**
 * @summary Register and Login Module - Client side Meteor for Register Form Template.
 * @module [Register and Login Module]
 *
 * Here you will find the methods for:
 * 1. register Template Methods:
 * 1.1 onRendered: Execute a validator function to add new users to the app.
 * 1.2 setDefaults Validator: Execute a function to set rules to the fields messages.
 *
 * Meteor General Methods.
 * @method check() from Meteor is used to validate data integrity and be sure that the data type is the same form the collection.
 */

/**
 * onRendered functions to execute a function when the “register” template is first created and then when the “register” template is rendered.
 * @param {string} js-register-form - handler class to get form values. 
 * @type  {string} email - Variable to get form email value.
 * @type  {string} password - Variable to get form password value.
 * @type  {Object} account - Object with the email and password values.
 *
 * This callback type is called 'addAccount' and is displayed as a global RPC.
 * 
 * @callback  addAccount
 * @param {Object} account - Object with the email and password values to register in the server side. 
 * @returns {string} err - return the string value with the error message from the server side.
 * @returns {string} res - return the string value with the response message from the server side.
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

/**
 * setDefaults function define a default set of rules and error messages validate functions
 * @type {Object} define rules and messages to the email and password.
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





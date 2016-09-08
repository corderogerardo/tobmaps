'use strict';

/**
 * onRendered functions to execute a function when the “add account” template is first created and then when the “add account” template is rendered.
 * @param  {[class='js-add-account']} )
 * @param  {[name='email']} )
 * @param  {[name='password']} )
 * @return {[Meteor.call(function(error))]}
 */
Template.yahooForm.onRendered(function(){
  var validator = $('.js-add-account').validate({
    submitHandler: function(){
      var email = $('[name=email]').val();
      var password = $('[name=password]').val();
      var account = {
        email:email,
        password:password,
      };
      Meteor.call('addAEmailYahoo', Meteor.userId(), account, function(error){
        if(error){
          validator.showErrors({
            email: "The domain is invalid."   
          });
        	} else {
          	toastr.success('Hi '+Meteor.user().emails[0].address+', You have added a new account.','Account added!');
            $('.js-add-account').trigger('reset');
        	}
      });
    }    
  });
  $('.js-multi-form').validate({
    rules: {
        yahhoString: {
            required: true
        },
    },
    messages: {
      yahhoString: {
          required: "You must enter an email address and password."
      },
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

/**
 * Event that takes a string and separates the pair takes a account and password and stores them in a scheme, 
 * repite the process for each pair and call a RPC
 * @param  {string} acounts and passwords
 * @param  {account} orders the string in mail and password pairs 
 */
Template.yahooForm.events({
	"submit .js-multi-form":function(event){
		event.preventDefault();
		var string = $('[name=yahhoString]').val();
		var array = string.split(",");
    for (var i = 0; i < array.length; i=i+2) {
			var email = array[i];
			var password = array[i+1];
			var account = {
				email:email,
				password:password,
			};
			/**
			 * @param {Meteor.call} - This meteor method call the server side method insertEmail that receive the email and an user to validate the insert in collection.
			 */
			Meteor.call('addAEmailYahoo',Session.get('userId'),account, function(err,res){
        if(err){
          console.log("Error "+err);
          toastr.error('The account is invalid: '+err,'Account could not be added!');
        }else{
          console.log("Success "+res);
          toastr.success('Hi '+Meteor.user().emails[0].address+', You have added a new account.','Account added!');
        }
      }); 
		}
		$('.js-multi-form').trigger("reset");
	}
});

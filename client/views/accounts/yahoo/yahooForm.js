'use strict';

/**
 * validate rules for multiple form
 */

Template.yahooForm.onRendered(function(){
  $('.js-multi-form').validate({
      rules: {
          yahhoString: {
              required: true
          },
      }
  });
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
		var string = $('[id=yahhoString]').val();
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
			Meteor.call('addMultiYahoo',Session.get('userId'),account);
		}
		$('.js-multi-form').trigger("reset");
	}
});

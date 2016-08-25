'use strict';
/**
 * Events triggers in the template outlookForm
 */
Template.outlookForm.events({
	/**
	 * This event triggers the insertEmail Meteor.methods in server side.
	 * @param  {submit} event listen for submit event to trigger
	 * @return {boolean} True if could insert false if not
	 */
	"submit .js-save-email-form-horizontal":function(event){
		event.preventDefault();
		var email = $("#email").val();
		var password = $("#password").val();
		var domain =  email.replace(/.*@/, "");

		var emailform = {
			email: email,
			password:password,
			domain:domain,
		};
		/**
		 * @param {Meteor.call} - This meteor method call the server side method insertEmail that receive the email and an user to validate the insert in collection.
		 */
		Meteor.call('insertEmail',Session.get('userId'),emailform);
		$('.js-save-email-form-horizontal').trigger('reset');
	}
});
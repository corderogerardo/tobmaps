/**
 * Emails Module
 * @module     Emails
 * @description Client side Meteor for Yahoo Emails Form Template.
 *
 * Here you will find the methods for blaze templates:
 * 1. yahooForm Template Methods:
 * 1.1 onRendered: Loads the validator jquery function.
 * 1.2 Events: Listen for all the template events example: click, change, dblclick, submit.
 *
 */

/**
 * @summary Emails Module - Client side Meteor for Yahoo Emails Form Template.
 * @module  Emails.
 *
 * Here you will find find the methods for:
 * 1. yahooForm Template Methods:
 * 1.1 onRendered: Execute a function to add yahoo accounts.
 * 1.2 Events:
 *   js-multi-form: Execute a function to add multiples yahoo accounts.
 * 1.3 setDefaults Validator: Execute a function to set rules to the fields messages.
 *
 * Meteor general methods.
 * @method check() from Meteor is used to validate data integrity and be sure that the data type is the same from the collection.
 */

/**
 * onRendered functions to execute a function when the “add account” template is first created and then when the “add account” template is rendered.
 * @param {string} js-add-account - handler class to get form values.
 * @type  {string} email - Variable to get form email value.
 * @type  {string} password - Variable to get form password value.
 * @type  {Object} account - Object with the email and password values.
 *
 * This callback type is called 'addEmailYahoo' and is displayed as a global RPC.
 *
 * @callback addEmailYahoo
 * @param {Object} account - Object with the email and password values to register accounts in the server side.
 * @return {string} err - return the string value with the error message from the server side.
 * @return {string} res - return the string value with the response message from the server side.                         
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
			Meteor.call('addAEmailYahoo', Meteor.userId(), account, function(err, res){
				if(err){
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

/**
 * Event that takes a string and separates the pair takes a account and password and stores them in a scheme, 
 * repite the process for each pair and call a RPC meteor method.
 *
 * @param {string} js-add-account - handler class to get form values.
 * @type  {string} data - Variable to get the pair values email and password from the form.
 * @type  {Object} account - Object with the email and password values for each iteration.
 *
 * The callback type is called 'addAEmailYahoo' and is displayed as a global RPC.
 * This meteor method call the server side method insertEmail that receive the email, password an user to validate the insert in collection.
 * @callback addEmailYahoo
 * @param {string} Meteor.userId() - string with the current user id
 * @return {string} err - return the string value with the error message from the server side.
 * @return {string} res - return the string value with the response message from the server side.
 */
 Template.yahooForm.events({
	"submit .js-multi-form":function(event){
		event.preventDefault();
		var lines, lineNumber, data, length;
		data = $('[name=yahhoString]').val();
		lines = data.split('\n');
		lineNumber = 0;
		for (var i = lines.length - 1; i >= 0; i--) {
			var l = lines[i];
			lineNumber++;
			data = l.split(',');
			var email = data[0];
			var password = data[1];
			var account = {
				email:email,
				password:password,
			};
			 Meteor.call('addAEmailYahoo', Meteor.userId(), account, function(err,res){
				if(err){
					console.log("Error "+err);
					toastr.error('The account is invalid '+err,'Account could not be added!');
				}else{
					console.log("Success "+res);
					toastr.success('Hi '+Meteor.user().emails[0].address+', You have added a new account.','Account added!');
				}
			 });
			}
			$('.js-multi-form').trigger("reset");
		}
	});

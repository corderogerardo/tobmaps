'use strict';
/**
 * @memberOf Emails
 * @name  YahooForm
 * @locus client/views/emails/yahoo/create
 * @summary Meteor Blaze Template yahooForm
 *
 * @param {BlazeTemplate} onRendered
 * Meteor Blaze Template yahooForm onRendered:
 * Handler class to take email and password and stores then in a scheme.
 * 
 * @param {Object} account - Object with the email and password values to register in email collection.
 * @param {String} err/res - return the method value from the server side.
 *
 * @param {BlazeTemplate} Events
 * Meteor Blaze Template yahooForm Events:
 * Handler to takes a string and separates the pair takes a email and password and stores them in a scheme, 
 * repite the process for each pair and call a RPC meteor method.
 * 
 * @param {Object} account - Object with the email and password values for each iteration to register in email collection.
 * @param {String} Meteor.userId() - string with the current user id.
 * @param {String} err/res - return the method value from the server side.
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

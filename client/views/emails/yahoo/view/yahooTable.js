/**
 * @memberOf Emails
 * @name  YahooTable
 * @locus client/views/emails/view/yahoo/view
 * @summary Client side Meteor for Emails Table Views Template.
 * 
 *
 * @param {MeteorSubscription} Subscribe
 * Meteor Subscribe for Emails is the way we use to take the emails data from publications and pass to client user template.
 * These functions control how Meteor servers publish sets of records and how clients can subscribe to those sets of records and how clients can subscribe to those sets of data.
 *
 *
 * @param {BlazeTemplate} Helpers
 * Meteor Blaze Template yahooTable Helpers
 * @param {Function} emails Get the emails and they are passed from publications.
 * @param  {Function} userCanEdit variable to check if there is an user.
 * 
 *
 * @param  {BlazeTemplate} Events
 * Meteor Blaze Template yahooTable Events
 * @param {event} delete-email
 * "click .js-delete-email" Here we create an event handler to listen when the user click on button to delete an email.
 * First check if there is an user logged in
 * Second looks for the email id to be deleted
 * Third Call Method pass the id data and finally use a callback to check if the operation was performed or not to inform the user.
 * @param this._id refer to email._id
 */


Template.yahooTables.onRendered(function(){
	$('.footable').footable();
});

 Meteor.subscribe("emails", function(){
	return Emails.find().fetch();
 });

 Template.yahooTables.helpers({
	emails:function(){
		return Emails.find({createdBy:Meteor.userId(), typeDomain:'yahoo.com'}).fetch();
	},
	// return true if I am allowed to edit the current account, false otherwise
	userCanEdit : function(doc,Collection) {
		// can edit if the current account is owned by me.
		doc = Emails.findOne({createdBy:Meteor.userId()});
		if (doc){
			return true;
		}
		else {
			return false;
		}
	}
});

 Template.yahooTables.events({
	'click .js-delete-account':function(){
		var account_id = this._id;
		console.log(account_id);
		Meteor.call('removeEmail', Meteor.userId(), account_id, function(err,res){
			if(err){
				console.log("Error "+err);
				toastr.error('Hi '+Meteor.user().emails[0].address+', '+err,'Account could not be deleted!');
			}else{
				console.log("Success "+res);
				toastr.success('Hi '+Meteor.user().emails[0].address+', You have deleted this account.','Account deleted!');
			}
		});
	},
 })

/**
 * @memberOf Accounts
 * @name  UsersTable
 * @locus client/views/user
 * @summary Client side Meteor for Accounts Table Views Template.
 * 
 *
 * @param {MeteorSubscription} Subscribe
 * Meteor Subscribe for Accounts is the way we use to take the accounrs data from publications and pass to client user template.
 * These functions control how Meteor servers publish sets of records and how clients can subscribe to those sets of records and how clients can subscribe to those sets of data.
 *
 *
 * @param {BlazeTemplate} Helpers
 * Meteor Blaze Template usersTable Helpers
 * @param {Function} accounts Get the Accounts and they are passed from publications.
 * 
 *
 * @param  {BlazeTemplate} Events
 * Meteor Blaze Template usersTable Events
 * @param {event} delete-account
 * "click .js-delete-account" Here we create an event handler to listen when the user click on button to delete an account.
 * First check if there is an user logged in
 * Second looks for the account id to be deleted
 * Third Call Method pass the id data and finally use a callback to check if the operation was performed or not to inform the user.
 * @param this._id refer to account._id
 */

Template.usersTable.onRendered(function(){
	$('.footable').footable();
});

Meteor.subscribe("userData", function(){
	return Meteor.users.find();
});

 Template.usersTable.helpers({
	accounts:function(){
		return Meteor.users.find({_id:{$ne:Meteor.userId()}});
	},
 });

 Template.usersTable.events({
	'click .js-delete-account':function(){
		var account_id = this._id;
		console.log(account_id);
		Meteor.call('removeAccount', Meteor.userId(), account_id, function(err,res){
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
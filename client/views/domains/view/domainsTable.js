/**
 * @memberOf Domains
 * @name  domainsTable
 * @locus client/view/domains/view
 * @summary Client side Meteor for Domains Table Views Template.
 *
 * Here you will find the methods for blaze templates:
 * 1. domainsTable Template Methods:
 * 1.1 onRendered: Loads the footable() jquery function.
 * 1.2 Helpers:
 * 		domainsData: Get all the domains data passed from publications.
 * 		userCanEdit: Return true or false if the user can edit.
 * 1.3 Events: Listen for all the template events example: click, change, dblclick, submit.
 * 2. Meteor subscriptions: To subscribe the Domains user data.
 *
 * @param      {MeteorSubscriptions} domains
 * Meteor Subscribe for domains is the way we use to take the domains data from publications and pass to client user template.
 * These functions control how Meteor servers publish sets of records and how clients can subscribe to those sets of data.
 *
 * @param  {BlazeTemplate} Helpers
 * Meteor Blaze Template domainsTable Helpers
 * @param  {helper} domainsData
 * Get all the domains data passed from publications.
 * @param  {helper} userCanEdit
 * variable to check if there is an user.
 *
 * @param  {BlazeTemplate} Events
 * Meteor Blaze Template domainsTable Events
 * @param {event} click
 * "click .js-delete-domain" We create an event handler to listen when the user click on button to delete an action.
 * First check if there is an user logged in
 * Second Call Method pass the id data and finally use a callback to check if the operation was performed or not to inform the user.
 * @param this._id refer to domain._id
 *
 */
Meteor.subscribe("domains");
Template.domainsTable.onRendered(function(){
	$('.footable').footable();
});
Template.domainsTable.helpers({
	domainsData:function(){
		return Domains.find().fetch();
	},
	userCanEdit : function() {
		if(Meteor.user()){
			return true;
		}else{
			return false;
		}
	}
});
Template.domainsTable.events({
	"click .js-delete-domain":function(){
		if(Meteor.user()){
			var domain_id = this._id;
			Meteor.call("removeDomain",domain_id, function(err,res){
				if(err){
					console.log("Error "+err);
					toastr.error('Hi '+Meteor.user().emails[0].address+'. '+err,'Domain could not be deleted!');
				}else{
					console.log("Success "+res);
					toastr.success('Hi '+Meteor.user().emails[0].address+'. You have deleted this Domain.','Domain deleted!');
				}
			});
		}
	}
});
/**
 * @summary Meteor Subscribe for domains is the way we use to take the domains data from publications and pass to client user template.
 * These functions control how Meteor servers publish sets of records and how clients can subscribe to those sets of data.
 */
Meteor.subscribe("domains");
Template.domainsTable.onRendered(function(){
	$('.footable').footable();
});
/**
 * @summary Meteor Blaze Template domainsTable Helpers
 * @param  {Domains} domainsData Get all the domains data passed from publications.
 * @param  {Boolean} userCanEdit variable to check if there is an user.
 *
 */
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

/**
 * @summary Meteor Blaze Template domainsTable Events
 * We create an event handler to listen when the user click on button to delete an action.
 * First check if there is an user logged in
 * Second Call Method pass the id data and finally use a callback to check if the operation was performed or not to inform the user.
 * @param this._id refer to domain._id
 */
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
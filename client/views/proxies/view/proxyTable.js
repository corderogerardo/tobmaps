/**
 * @memberOf Proxies
 * @name  proxyTable
 * @locus client/view/proxies/view
 *
 * @summary Client side Meteor for Proxies Table Views Template.
 *
 *
 * Here you will find the methods for blaze templates:
 * 1. proxyTable Template Methods:
 * 1.1 onRendered: Loads the footable() jquery function.
 * 1.2 Helpers:
 * 		proxiesdata: et all the proxies passed from publications.
 * 		userCanEdit: Return true or false if the user can edit.
 * 1.3 Events: Listen for all the template events example: click, change, dblclick, submit.
 * 2. Meteor subscriptions: To subscribe the emails user data.
 *
 * @param      {MeteorSubscriptions} proxies
 * Meteor Subscribe for proxies is the way we use to take the proxies data from publications and pass to client user template.
 * These functions control how Meteor servers publish sets of records and how clients can subscribe to those sets of data.
 *
 * @param      {BlazeTemplate} onRendered
 * Meteor Blaze Template proxyTable onRendered
 * Used to initialize the table Jquery footable element into the DOM.
 * onRendered I create a configuration variable then with a for pass the configuration to the footable element
 * This can be a good place to apply any DOM manipulations you want, after the template is rendered for the first time.
 *
 * @param  {BlazeTemplate} Helpers
 * Meteor Blaze Template proxyTable Helpers
 * @param  {helper} proxiesdata
 * Get all the proxies passed from publications.
 * @param  {helper} userCanEdit
 * variable to check if there is an user.
 *
 * @param  {BlazeTemplate} Events
 * Meteor Blaze Template proxyTable Events
 * Here is created an event handler to listen when the user click on button to delete an proxy.
 * @param {event} click
 * "click .js-delete-proxy" First check if there is an user logged in
 * Second looks for the proxy id to be deleted
 * Third Call Method pass the id data and finally use a callback to check if the operation was performed or not to inform the user.
 * @param this._id refer to proxy._id
 *
 */
Meteor.subscribe("proxies");
Template.proxyTable.onRendered(function(){
	$('.footable').footable();
});
Template.proxyTable.helpers({
	proxiesdata:function(){
		return Proxies.find().fetch();
	},
	userCanEdit : function() {
		if(Meteor.user()){
			return true;
		}else{
			return false;
		}
	}
});
Template.proxyTable.events({
	"click .js-delete-proxy":function(){
		if(Meteor.user()){
				var proxyId = this._id;
			Meteor.call("removeProxy",proxyId, function(err,res){
				if(err){
					console.log("Error "+err);
					toastr.error('Hi '+Meteor.user().emails[0].address+'. '+err,'Proxy could not be deleted!');
				}else{
					console.log("Success "+res);
					toastr.success('Hi '+Meteor.user().emails[0].address+'. You have deleted this Proxy.','Proxy deleted!');
				}
			});
		}
	},
});
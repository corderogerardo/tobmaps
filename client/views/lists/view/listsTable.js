/**
 * @memberOf Lists
 * @name  listsTable
 * @locus client/view/lists/view
 * @summary Client side Meteor for Lists Table Views Template.
 *
 * Here you will find the methods for blaze templates:
 * 1. listsTable Template Methods:
 * 1.1 onRendered: Loads the footable() jquery function.
 * 1.2 Helpers:
 * 		listsData: et all the lists passed from publications.
 * 		userCanEdit: Return true or false if the user can edit.
 * 1.3 Events: Listen for all the template events example: click, change, dblclick, submit.
 * 2. Meteor subscriptions: To subscribe the lists user data.
 *
 * @param      {MeteorSubscriptions} lists
 * Meteor Subscribe for Lists is the way we use to take the lists data from publications and pass to client user template.
 * These functions control how Meteor servers publish sets of records and how clients can subscribe to those sets of data.
 *
 *
 * @param      {BlazeTemplate} onRendered
 * Meteor Blaze Template listsTable onRendered
 * Used to initialize the table Jquery footable element into the DOM.
 * onRendered I create a configuration variable then with a for pass the configuration to the footable element
 * This can be a good place to apply any DOM manipulations you want, after the template is rendered for the first time.
 *
 * @param  {BlazeTemplate} Helpers
 * Meteor Blaze Template listsTable Helpers
 * @param  {helper} listsData Get all the lists passed from publications.
 * @param  {helper} userCanEdit variable to check if there is an user.
 *
 * @param  {BlazeTemplate} Events
 * Meteor Blaze Template listsTable Events
 * @param {event} click
 * "click .js-delete-list" We create an event handler to listen when the user click on button to delete an list.
 * First check if there is an user logged in
 * Second looks for the list id to be deleted
 * Third Call Method pass the id data and finally use a callback to check if the operation was performed or not to inform the user.
 * @param this._id refer to list._id
 *
 */
Meteor.subscribe("lists");
Template.listsTable.onRendered(function(){
	$('.footable').footable();
});
Template.listsTable.helpers({
	listsData:function(){
		return Lists.find().fetch();
	},
	userCanEdit : function() {
		if(Meteor.user()){
			return true;
		}else{
			return false;
		}
	}
});
Template.listsTable.events({
	"click .js-delete-list":function(){
		if(Meteor.user()){
			var list_id= this._id;
			Meteor.call("removeList",list_id,function(err,res){
				if(err){
					console.log("Error "+err);
					toastr.error('Hi '+Meteor.user().emails[0].address+'. '+err,'List could not be deleted!');
				}else{
					console.log("Success "+res);
					toastr.success('Hi '+Meteor.user().emails[0].address+'. You have deleted this List.','List deleted!');
				}
			});
		}
	}
});
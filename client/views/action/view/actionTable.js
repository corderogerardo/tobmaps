/**
 * Actions Module
 * @module    Actions
 * @description Client side Meteor for Actions Table Views Template.
 *
 * Here you will find the methods for blaze templates:
 * 1. actionTable Template Methods:
 * 1.1 onRendered: Loads the footable() jquery function.
 * 1.2 Helpers:
 * 		actionsdata: et all the actions passed from publications.
 * 		userCanEdit: Return true or false if the user can edit.
 * 1.3 Events: Listen for all the template events example: click, change, dblclick, submit.
 * 2. Meteor subscriptions: To subscribe the emails user data.
 *
 *
 */
/**
 * @summary Meteor Subscribe for Actions is the way we use to take the actions data from publications and pass to client user template.
 * These functions control how Meteor servers publish sets of records and how clients can subscribe to those sets of data.
 */
Meteor.subscribe("actions");
Template.actionTable.onRendered(function(){
	$('.footable').footable();
});
/**
 * @summary Meteor Blaze Template actionTable Helpers
 * @param  {Actions} actionsdata Get all the actions passed from publications.
 * @param  {Boolean} userCanEdit variable to check if there is an user.
 *
 */
Template.actionTable.helpers({
	actionsdata:function(){
		return Actions.find().fetch();
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
 * @summary Meteor Blaze Template actionTable Events
 * Here I create an event handler to listen when the user click on button to delete an action.
 * First check if there is an user logged in
 * Second looks for the action id to be deleted
 * Third Call Method pass the id data and finally use a callback to check if the operation was performed or not to inform the user.
 * @param this._id refer to action._id
 */
Template.actionTable.events({
	"click .js-delete-action":function(){
		if(Meteor.user()){
				var action_id = this._id;
			Meteor.call("removeAction",action_id, function(err,res){
				if(err){
					console.log("Error "+err);
					toastr.error('Hi '+Meteor.user().emails[0].address+'. '+err,'Action could not be deleted!');
				}else{
					console.log("Success "+res);
					toastr.success('Hi '+Meteor.user().emails[0].address+'. You have deleted this action.','Action deleted!');
				}
			});
		}
	},
});
/**
 * @summary Meteor Subscribe for Lists is the way we use to take the lists data from publications and pass to client user template.
 * These functions control how Meteor servers publish sets of records and how clients can subscribe to those sets of data.
 */
Meteor.subscribe("lists");

Template.listsTable.onRendered(function(){
	$('.footable').footable();
});
/**
 * @summary Meteor Blaze Template listsTable Helpers
 * @param  {Lists} listsData Get all the lists passed from publications.
 * @param  {Boolean} userCanEdit variable to check if there is an user.
 *
 */
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
/**
 * @summary Meteor Blaze Template listsTable Events
 * We create an event handler to listen when the user click on button to delete an action.
 * First check if there is an user logged in
 * Second looks for the action id to be deleted
 * Third Call Method pass the id data and finally use a callback to check if the operation was performed or not to inform the user.
 * @param this._id refer to list._id
 */
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
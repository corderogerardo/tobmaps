/**
 * @summary Meteor Subscribe for Schedule is the way we use to take the schedules data from publications and pass to client user template.
 * These functions control how Meteor servers publish sets of records and how clients can subscribe to those sets of data.
 * @return  {Array} Schedule Array Data.
 */
Meteor.subscribe("schedules",function(){
	return Schedules.find().fetch();
});
/**
 * @summary Meteor Subscribe for Actions is the way we use to take the actions data from publications and pass to client user template.
 * These functions control how Meteor servers publish sets of records and how clients can subscribe to those sets of data.
 * @return  {Array} Schedule Array Data.
 */
Meteor.subscribe("actions",function(){
	return Actions.find().fetch();
});

/**
 * @summary Meteor Blaze Template scheduleViewTable Helpers
 * @param  {Schedules} schedules Get all the schedules passed from publications.
 *
 */
Template.scheduleViewTable.helpers({
	schedules:function(){
		return Schedules.find().fetch();
	},
});
/**
 * @summary Meteor Blaze Template scheduleTableItemsActionsName Helpers
 * @param  {Actions} getById search over actions with given id and get the name.
 *
 */
Template.scheduleTableItemsActionsName.helpers({
	getById:function(botId){
		var name = Actions.findOne({
			_id:botId
		}).name;
		return name;
	}
});
/**
 * @summary Meteor Blaze Template scheduleViewTable Events
 * Here I create an event handler to listen when the user click on button to delete an schedule.
 * First check if there is an user logged in
 * Second looks for the schedule id to be deleted
 * Third Call Method pass the id data and finally use a callback to check if the operation was performed or not to inform the user.
 * @param this._id refer to schedule._id
 */
Template.scheduleViewTable.events({
	"click .js-delete-schedule":function(){
		if(Meteor.user()){
			var schedule_id= this._id;
			Meteor.call("removeSchedule",schedule_id,function(err,res){
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
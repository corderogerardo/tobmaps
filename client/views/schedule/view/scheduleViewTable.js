Template.scheduleTableItems.onRendered(function(){
	$('.footable').footable();
});
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
 * @summary Meteor Blaze Template scheduleViewTable Helpers
 * @param  {Schedules} schedules Get all the schedules passed from publications.
 *
 */
Template.scheduleTableItems.helpers({
	actionsData:function(){
		return Actions.find().fetch();
	},
});
/**
 * @summary Meteor Blaze Template scheduleTableItemsActionsName Helpers
 * @param  {Actions} getById search over actions with given id and get the name.
 *
 */
Template.scheduleTableItemsActionsName.helpers({
	getById:function(botId){
		var actions = Actions.findOne({
			_id:botId
		}).actions;
		return actions;
	}
});
Template.scheduleTableItemsWhiteDomains.helpers({
	getWhiteById:function(whiteId){
		var wdomains = Lists.findOne({
			_id:whiteId
		}).domains;
		return wdomains;
	}
});
Template.scheduleTableItemsBlackDomains.helpers({
	getBlackById:function(blackId){
		var bdomains = Lists.findOne({
			_id:blackId
		}).domains;
		return bdomains;
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
	"click .js-activate-schedule":function(){
		if(Meteor.user()){
			var schedule_id= this._id;
			Meteor.call("activateSchedule",schedule_id,function(err,res){
				if(err){
					console.log("Error "+err);
					toastr.error('Hi '+Meteor.user().emails[0].address+'. '+err,'Schedule could not be deleted!');
				}else{
					console.log("Success "+res);
					toastr.success('Hi '+Meteor.user().emails[0].address+'. You have deleted this Schedule.','Schedule deleted!');
				}
			});
		}
	},
	"click .js-delete-schedule":function(){
		if(Meteor.user()){
			var schedule_id= this._id;
			Meteor.call("removeSchedule",schedule_id,function(err,res){
				if(err){
					console.log("Error "+err);
					toastr.error('Hi '+Meteor.user().emails[0].address+'. '+err,'Schedule could not be deleted!');
				}else{
					console.log("Success "+res);
					toastr.success('Hi '+Meteor.user().emails[0].address+'. You have deleted this Schedule.','Schedule deleted!');
				}
			});
		}
	},
	"change .js-check-switch":function(){
		if(Meteor.user()){
			var schedule_id= this._id;
			var changeCheckbox = document.querySelector("#v"+schedule_id);
			var check_value = changeCheckbox.checked;
			Meteor.call("activateSchedule",schedule_id, check_value, function(err,res){
				if(err){
					$("#v"+schedule_id).removeAttr('checked');
					toastr.error('Hi '+Meteor.user().emails[0].address+'. '+err,'Schedule could not be activated');
				}else{
					toastr.success('Hi '+Meteor.user().emails[0].address+'. You have activated this schedule.','Schedule Active!');
				}
			});
		}
	},
});


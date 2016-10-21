/**
 * @memberOf Schedules
 * @name  scheduleTable
 * @locus client/view/schedule/view
 * @summary Client side Meteor for Schedules Table Views Template.
 *
 * Here you will find the methods for blaze template:
 * 1. scheduleViewTable Template Methods:
 * 1.1 onRendered: Loads the footable() jquery function.
 * 1.2 Helpers:
 * 		schedules: et all the actions passed from publications.
 * 		actionsData: et all the actions passed from publications.
 * 		getById: et all the actions passed from publications.
 * 		getWhiteById: et all the actions passed from publications.
 * 		getBlackById: et all the actions passed from publications.
 * 1.3 Events: Listen for all the template events example: click, change, dblclick, submit.
 * 2. Meteor subscriptions: To subscribe the schedules/actions user data.
 *
 * @param      {MeteorSubscriptions} schedules
 * Meteor Subscribe for Schedule is the way we use to take the schedules data from publications and pass to client user template.
 * These functions control how Meteor servers publish sets of records and how clients can subscribe to those sets of data.
 *
 * @param      {MeteorSubscriptions} actions
 * Meteor Subscribe for Actions is the way we use to take the actions data from publications and pass to client user template.
 * These functions control how Meteor servers publish sets of records and how clients can subscribe to those sets of data.
 *
 * @param      {BlazeTemplate} onRendered
 * Meteor Blaze Template scheduleTableItems onRendered
 * Used to initialize the table Jquery footable element into the DOM.
 * onRendered I create a configuration variable then with a for pass the configuration to the footable element
 * This can be a good place to apply any DOM manipulations you want, after the template is rendered for the first time.
 *
 * @param      {BlazeTemplate} Helpers
 * Meteor Blaze Template scheduleViewTable Helpers
 * @param  {helper} schedules
 * Get all the schedules passed from publications.
 * @param  {helper} actionsData
 * Get all the actionsData passed from publications, scheduleTableItemsActionsName template.
 * @param  {helper} getById
 * search over actions with given id and get the name,Blaze Template scheduleTableItemsActionsName Helpers
 * @param  {helper} getWhiteById
 * search over lists with given id and get the name,Blaze Template scheduleTableItemsWhiteDomains Helpers
 * @param  {helper} getBlackById
 * search over lists with given id and get the name,Blaze Template scheduleTableItemsBlackDomains Helpers
 *
 *
 * @param  {BlazeTemplate} Events
 * Meteor Blaze Template scheduleViewTable Events
 * @param {event} click
 * "click .js-delete-schedule" Here I create an event handler to listen when the user click on button to delete an schedule.
 * First check if there is an user logged in
 * Second looks for the schedule id to be deleted
 * Third Call Method pass the id data and finally use a callback to check if the operation was performed or not to inform the user.
 * @param this._id refer to schedule._id
 *
 * @param {event} change
 * "change .js-check-switch" Here I create an event handler to listen when the user click on button to delete an schedule.
 * First check if there is an user logged in
 * Second looks for the schedule id to be activated
 * Third Call MeteorMethod pass the schedule_id and finally use a callback to check if the operation was performed or not to inform the user.
 * @param this._id refer to schedule._id
 *
 */

Template.scheduleTableItems.onRendered(function(){
	$('.footable').footable();
});

Meteor.subscribe("schedules",function(){
	return Schedules.find().fetch();
});

Meteor.subscribe("actions",function(){
	return Actions.find().fetch();
});

Template.scheduleViewTable.helpers({
	schedules:function(){
		return Schedules.find().fetch();
	},
});

Template.scheduleTableItems.helpers({
	actionsData:function(){
		return Actions.find().fetch();
	},
});

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

Template.scheduleViewTable.events({
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


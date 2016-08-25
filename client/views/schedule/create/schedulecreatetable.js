Meteor.subscribe("schedules");

Template.scheduleCreateTableBots.helpers({
	schedules:function(){
		return Schedules.find().fetch();
	}
});
Meteor.subscribe("schedules",function(){
	return Schedules.find().fetch();
});
Meteor.subscribe("actions",function(){
	return Bots.find().fetch();
});

Template.scheduleCreateTableBots.helpers({
	schedules:function(){
		return Schedules.find().fetch();
	},

});
Template.scheduleTableItemsActionsName.helpers({
	getById:function(botId){
		var name = Bots.findOne({
			_id:botId
		}).action;
		return name;
	}
});
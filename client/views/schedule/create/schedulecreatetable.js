Meteor.subscribe("schedules",function(){
	return Schedules.find().fetch();
});
Meteor.subscribe("actions",function(){
	return Actions.find().fetch();
});

Template.scheduleCreateTableBots.helpers({
	schedules:function(){
		return Schedules.find().fetch();
	},

});
Template.scheduleTableItemsActionsName.helpers({
	getById:function(botId){
		var name = Actions.findOne({
			_id:botId
		}).name;
		return name;
	}
});
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
Template.scheduleTableItemsActionsName.helpers({
	getById:function(botId){
		var name = Actions.findOne({
			_id:botId
		}).name;
		return name;
	}
});
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
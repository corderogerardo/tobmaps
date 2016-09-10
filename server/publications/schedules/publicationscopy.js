Meteor.publish('schedulescopy', function(){
	if(this.userId){
		return Schedules.find({
			$or:[
				{
					createdBy:this.userId
				}
			]
		});
	}
});
Meteor.publish('actionsBotscopy', function(){
	if(this.userId){
		return Actions.find({

		});
	}
});
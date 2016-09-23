Meteor.publish('schedules', function(){
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
Meteor.publish('actionsBots', function(){
	if(this.userId){
		return Actions.find({

		});
	}
});
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
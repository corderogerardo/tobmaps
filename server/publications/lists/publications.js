Meteor.publish('lists', function(){
	if(this.userId){
		return Lists.find({
			$or:[
				{
					createdBy:this.userId,
				}
			]
		});
	}
});
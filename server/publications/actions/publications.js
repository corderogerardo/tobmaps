Meteor.publish("actions", function(){
	if(this.userId){
		return Actions.find({
			$or:[
			{
				createdBy:this.userId,
			}
			]
		});
	}
});
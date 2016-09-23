Meteor.publish('emails', function(){
	if(this.userId){
		return Emails.find({
			$or:[
				{
					createdBy:this.userId,
				}
			]
		});
	}
});
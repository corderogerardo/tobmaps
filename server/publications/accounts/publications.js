Meteor.publish('emails', function(domainName){
	if(this.userId){
		return Emails.find({
			$or:[
				{
					createdBy:this.userId,
					domain:domainName
				}
			]
		});
	}
});
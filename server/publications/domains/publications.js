Meteor.publish('domains', function(){
	if(this.userId){
		return Domains.find({
			$or:[
				{
					createdBy:this.userId,
				}
			]
		});
	}
});
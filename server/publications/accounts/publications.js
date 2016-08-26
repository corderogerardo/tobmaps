Meteor.publish('accounts', function(){
	if(this.userId){
		return Accounts.find({
			$or:[
				{
					createdBy:this.userId,
				}
			]
		});
	}
});
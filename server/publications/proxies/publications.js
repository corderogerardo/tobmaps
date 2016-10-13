Meteor.publish('proxies', function(){
	if(this.userId){
		return Proxies.find({
			$or:[
			{
				createdBy:this.userId,
			}
			]
		});
	}
});
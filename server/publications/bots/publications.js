Meteor.publish("bots", function(){
	if(this.userId){
  	return Bots.find({});
	}
});
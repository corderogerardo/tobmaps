Meteor.publish("actions", function(){
	if(this.userId){
  	return Actions.find({});
	}
});
Meteor.publish("bots", function(){
  return Bots.find();
});
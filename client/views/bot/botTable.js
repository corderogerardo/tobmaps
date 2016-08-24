Meteor.subscribe("bots");

Template.createTableBots.helpers({
  bots:function(){
    return Bots.find();
  }
})
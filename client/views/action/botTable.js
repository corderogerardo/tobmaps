Meteor.subscribe("actions");

Template.botTable.helpers({
  bots:function(){
    return Actions.find().fetch();
  }
})
Meteor.subscribe("actions");

Template.actionTable.helpers({
  actions:function(){
			return Actions.find().fetch();
	}
});
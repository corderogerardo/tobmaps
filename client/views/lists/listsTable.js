Meteor.subscribe("lists");

Template.listsTable.helpers({
		lists:function(){
			return Lists.find().fetch();
		},

});
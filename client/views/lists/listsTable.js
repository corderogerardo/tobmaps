Meteor.subscribe("lists");
Meteor.subscribe("domains");

Template.listsTable.helpers({
		lists:function(){
			return Lists.find().fetch();
		},
		domains:function(){
				return Domains.find().fetch();
		}
});
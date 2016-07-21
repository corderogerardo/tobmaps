Meteor.subscribe("emails", function(){
	return Emails.find().fetch();
});
Template.email_table.helpers({
	emails:function(){
		return Emails.find().fetch();
	},
});
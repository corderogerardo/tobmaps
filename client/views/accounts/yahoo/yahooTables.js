Template.addYahoo.onRendered(function(){
    // Initialize fooTable
    $('.footable').footable();
    $('.footable2').footable();
});
Meteor.subscribe("emails", function(){
	return Emails.find().fetch();
});
Template.yahoo_email_table.helpers({
	emails:function(){
		return Emails.find().fetch();
	},
});
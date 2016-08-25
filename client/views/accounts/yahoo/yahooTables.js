Meteor.subscribe("emails","yahoo.com");

Template.addYahoo.onRendered(function(){
    // Initialize fooTable
    $('.footable').footable();
    $('.footable2').footable();
});

Template.yahoo_email_table.helpers({
	emailsYahoo:function(){
		return Emails.find().fetch();
	},
});
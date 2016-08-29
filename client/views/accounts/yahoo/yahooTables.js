/**
 * Initialize fooTable
 */

Template.addYahoo.onRendered(function(){
  $('.footable').footable();
  $('.footable2').footable();
});

/**
 * subscribe to read data
 */

Meteor.subscribe("emails", function(){
	return Emails.find().fetch();
});

Template.yahooTables.helpers({
	emails:function(){
		return Emails.find().fetch();
	},
});
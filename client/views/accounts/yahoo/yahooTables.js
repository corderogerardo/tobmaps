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

Meteor.subscribe("accounts", function(){
	return Accounts.find().fetch();
});

Template.yahooTables.helpers({
	accounts:function(){
		return Accounts.find().fetch();
	},
});
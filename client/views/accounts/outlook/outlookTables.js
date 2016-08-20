'use strict';
/**
 * Wjem addOutlook template render invoke function callback
 * @param  {onRendered} Event)
 * @return {boolean}
 */
Template.addOutlook.onRendered(function(){
    // Initialize fooTable
    $('.footable').footable();
    $('.footable2').footable();
});

/**
 * @summary The subscribe Meteor Event to fetch data that will be passed to template using helpers methods
 * @param  {function}
 * @return {emails}
 */
Meteor.subscribe("emails", function(){
	return Emails.find().fetch();
});


Template.outlook_email_table.helpers({
	emails:function(){
		return Emails.find().fetch();
	},
});
/* Initialize fooTable*/
Template.aolTables.onRendered(function(){
  $('.footable').footable();
  $('.footable2').footable();
});

/* Subscribe to read data */
Meteor.subscribe("emails", function(){
	return Emails.find().fetch();
});

/**
 * Summary The subscribe Meteor Event to filter data that will be passed to template using helpers methods
 * @param  {[function]} 
 * @return {[emails] (Query projection)}
 */
Template.aolTables.helpers({
	emails:function(){
		return Emails.find({createdBy:Meteor.userId(), typeDomain:'aol.com'});
	},
});
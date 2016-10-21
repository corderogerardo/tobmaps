/**
 * @memberOf Lists
 * @name  listsForm
 * @locus client/view/lists/create
 * @summary Meteor Blaze Template listsForm
 *
 * @param      {BlazeTemplate} onRendered
 * We used to initialize the Select Multiple Jquery chosen-select element into the DOM.
 * onRendered We create a configuration variable then with a for pass the configuration to the select element
 * This can be a good place to apply any DOM manipulations you want, after the template is rendered for the first time.
 *
 * @param      {MeteorSubscriptions} domains
 * Meteor Subscribe for Domains is the way we use to take the domains data from publications and pass to client user template.
 * These functions control how Meteor servers publish sets of records and how clients can subscribe to those sets of data.
 *
 * @param      {BlazeTemplate} Helpers
 * Meteor Blaze Template listsForm Helpers
 * @param  {helper} listDomains
 * Get all the domains passed from publications.
 *
 * @param  {BlazeTemplate} Events
 * Meteor Blaze Template listsForm Events
 * @param {event} click button[type=reset]
 * 'click button[type=reset]' We create an event handler to listen then the user click on cancel button to reset form.
 *
 */
Template.listsForm.onRendered(function(){
	var config = {
				'.chosen-select'           : {},
				'.chosen-select-deselect'  : {allow_single_deselect:true},
				'.chosen-select-no-single' : {disable_search_threshold:10},
				'.chosen-select-no-results': {no_results_text:'Oops, nothing found!'},
				'.chosen-select-width'     : {width:"95%"}
		};
		for (var selector in config) {
				$(selector).chosen(config[selector]);
		}
});

Meteor.subscribe("domains");
Template.listsForm.helpers({
	listDomains:function(){
		return Domains.find().map(function (c) {
			return {label: c.domain, value: c.domain};
		});
	}
});

Template.listsForm.events({
	'click button[type=reset]':function(event){
		event.preventDefault();
		$('.chosen-select').val('').trigger('chosen:updated');
		$('#listsForm').trigger('reset');
		$('#listsForm > button[type="submit"]').removeAttr('disabled');
	}
});
/**
 * @summary Meteor Blaze Template listsForm onRendered
 * We used to initialize the Select Multiple Jquery chosen-select element into the DOM.
 * [onRendered We create a configuration variable then with a for pass the configuration to the select element]
 * This can be a good place to apply any DOM manipulations you want, after the template is rendered for the first time.
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
/**
 * @summary Meteor Subscribe for Domains is the way we use to take the domains data from publications and pass to client user template.
 * These functions control how Meteor servers publish sets of records and how clients can subscribe to those sets of data.
 */
Meteor.subscribe("domains");

/**
 * @summary Meteor Blaze Template listsForm Helpers
 * @param  {Domains} listDomains Get all the domains passed from publications.
 *
 */
Template.listsForm.helpers({
	listDomains:function(){
		return Domains.find().map(function (c) {
			return {label: c.domain, value: c.domain};
		});
	}
});

/**
 * @summary Meteor Blaze Template listsForm Events
 * We create an event handler to listen then the user click on cancel button to reset form.
 */
Template.listsForm.events({
	'click button[type=reset]':function(event){
		event.preventDefault();
		$('.chosen-select').val('').trigger('chosen:updated');
		$('#listsForm').trigger('reset');
		$('#listsForm > button[type="submit"]').removeAttr('disabled');
	}
});
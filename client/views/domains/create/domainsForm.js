/**
 * @memberOf Domains
 * @name  domainsForm
 * @locus client/view/action/create
 * @summary Meteor Blaze Template domainsForm.
 *
 *
 * Here you will find the methods for blaze templates:
 * 1. domainsForm Template Methods:
 * 1.1 Events: Listen for all the template events example: click, change, dblclick, submit.
 * 1.2 Hooks, seach for Hooks events in the file hooks.js
 *
 * @param      {BlazeTemplate} Events
 * @summary Meteor Blaze Template domainsForm Events
 * @param {event} click button[type=reset]
 * We create an event handler in the meteor way to listen then the user click on cancel button to reset form.
 */
Template.domainsForm.events({
	'click button[type=reset]':function(event){
		event.preventDefault();
		$('.chosen-select').val('').trigger('chosen:updated');
		$('#domainsForm').trigger('reset');
		$('#domainsForm > button[type="submit"]').removeAttr('disabled');
	}
});
/**
 * @summary Meteor Blaze Template domainsForm Events
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
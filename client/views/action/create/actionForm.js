/**
 * @memberOf Actions
 * @name  actionForm
 * @locus client/view/action/create
 * @summary Meteor Blaze Template actionForm.
 *
 * @param      {BlazeTemplate} onRendered
 * Meteor Blaze Template actionForm onRendered
 * Used to initialize the Select Multiple Jquery chosen-select element into the DOM.
 * onRendered I create a configuration variable then with a for pass the configuration to the select element
 * This can be a good place to apply any DOM manipulations you want, after the template is rendered for the first time.
 *
 * @param      {BlazeTemplate} Helpers
 * Meteor Blaze Template actionForm Helpers
 * @param {helper} definableActions
 * variable array where we save the definable actions to be shown to the user and the will be selected in a random.
 *
 * @param      {BlazeTemplate} Events
 * Meteor Blaze Template actionForm Events
 * @param {event} click button[type=reset]
 * Here I create an event handler to listen then the user click on cancel button to reset form.
 */

Template.actionForm.onRendered(function(){
	var config = {
		'.chosen-select'           : {},
		'.chosen-select-deselect'  : {allow_single_deselect:true},
		'.chosen-select-no-single' : {disable_search_threshold:10},
		'.chosen-select-no-results': {no_results_text:'Oops, nothing found!'},
		'.chosen-select-width'     : {width:"95%"},
};
for (var selector in config) {
	$(selector).chosen(config[selector]);
}
	// Get a reference to the DOM element
var MY_SELECT = $('.chosen-select').get(0);
var selection = ChosenOrder.getSelectionOrder(MY_SELECT);
});

Template.actionForm.helpers({
	definableActions: function(){
		var arractions=[];
		arractions.push({label:"moveSpamAction",value:"moveSpamAction"});
		arractions.push({label:"unsubscribeAction",value:"unsubscribeAction"});
		arractions.push({label:"multipleAccountsSendEmailAction",value:"multipleAccountsSendEmailAction"});
		arractions.push({label:"moveInboxAction",value:"moveInboxAction"});
		return arractions;
	}
});

Template.actionForm.events({
	'click button[type=reset]':function(event){
		event.preventDefault();
		$('.chosen-select').val('').trigger('chosen:updated');
		$('#actionForm').trigger('reset');
		$('#actionForm > button[type="submit"]').removeAttr('disabled');
	}
});
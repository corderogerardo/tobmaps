Template.actionForm.rendered = function(){
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
console.log(selection);
};

Template.actionForm.helpers({
	definableActions: function(){
		var arractions=[];
		arractions.push({label:"moveSpamAction",value:"moveSpamAction"});
		arractions.push({label:"unsubscribeAction",value:"unsubscribeAction"});
		arractions.push({label:"multipleAccountsSendEmailAction",value:"multipleAccountsSendEmailAction"});
		return arractions;
	}
});
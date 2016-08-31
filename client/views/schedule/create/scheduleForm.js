'use strict';

Template.scheduleForm.events({
	"submit .js-form-schedule":function(event){
		event.preventDefault();
		var name = $('#nameSchedule').val();
		var description = $('#descriptionSchedule').val();
		var days = [];
		var hours = [];
		var actions = [];
		$('.switch input').each(function(index){
				days.push($(this).is(":checked"));
		});
		var omultiselect = document.querySelector('#scheduleHours');
		var multiselect = document.querySelector('#actionsBot');
		hours = omultiselect.selectedItems();
		actions = multiselect.selectedItems();
		var awakening = $('#awakening').val();
		var scheduleForm = {
			name:name,
			description:description,
			days:days,
			hours:hours,
			awakening:awakening,
			actions:actions,
		};

		Meteor.call('insertSchedule',Session.get('userId'),scheduleForm);

		$('.js-form-schedule').trigger("reset");

	}
});
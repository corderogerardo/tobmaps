'use strict';

Meteor.subscribe("bots", function(){
	return Schedules.find().fetch();
});

Template.scheduleCreateForm.helpers({
	bots:function(){
		return Schedules.find().fetch();
	}
});

Template.scheduleCreateForm.events({
	"click #js-form-schedule":function(event){
		event.preventDefault();
		var name = $('#nameSchedule').val();
		var description = $('#descriptionSchedule').val();
		var days = [];
		var hours =[];
		$('.switch input').each(function(index){
				days.push($(this).is(":checked"));
		});
		$('.select-options input').each(function(index){
			hours.push($(this).is(":checked"));
		});
		var awakening = $('#awakening').val();
		var actions = $('#actions').val();
		var scheduleForm = {
			name:name,
			description:description,
			days:days,
			hours:hours,
			awakening:awakening,
			actions:actions,
		};
		console.log(days);
		console.log(hours);
		console.log(awakening);
		console.log(actions);
		console.log("Submit pressed");

		Meteor.call('insertSchedules',Session.get('userId'),scheduleForm);

		return false;

	}
});
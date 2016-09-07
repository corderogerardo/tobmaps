Template.schedule_view_table.events({
	'click .js-active-botone':function(event){
		console.log('I clicked button one');
		event.preventDefault();
		var command = 'outlook/moveSpamAction.js';

		Meteor.call('runCasperJS', command, function (error, result) {
			console.log(error);
			console.log(result);
		});
	},
	'click .js-active-bottwo':function(event){
		console.log('I clicked button two');
		console.log("command");
		var replyId = Meteor.call('command');
		Session.set('replyId', replyId);
	},
});
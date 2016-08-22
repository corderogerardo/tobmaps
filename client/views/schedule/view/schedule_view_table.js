'use strict';

Template.scheduleViewTable.events({
	'click .js-active-botone':function(event){
		console.log('I clicked button one');
		event.preventDefault();
		var command = 'casperjs ../../../../../tests/outlook/readalistofaccountsbot.js --engine=slimerjs --disk-cache=no';
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
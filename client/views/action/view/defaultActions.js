Template.defaultActions.events({
	"click .js-action-moveinbox-o":function(){
		if(Meteor.user()){
			console.log('I clicked button one');
			event.preventDefault();
			var commandAction = 'outlook/moveInboxAction.js';
			var domain = 'outlook';
			Meteor.call("commandcopy",commandAction,domain, function (error, result){
				if(error){
					console.log(error);
					toastr.error('Hi '+Meteor.user().emails[0].address+'. '+error,'This error happen when running this bot! '+commandAction);
				}if(result){
					console.log(result);
					toastr.success('Hi '+Meteor.user().emails[0].address+'. Everything works nicely.','The bot finished! '+commandAction);
				}
			});
		}
	},
	"click .js-action-movespam-o":function(){
		if(Meteor.user()){
			console.log('I clicked button one');
			event.preventDefault();
			var commandAction = 'outlook/moveSpamAction.js';
			var domain = 'outlook';
			Meteor.call("commandcopy",commandAction,domain, function (error, result){
				if(error){
					console.log(error);
					toastr.error('Hi '+Meteor.user().emails[0].address+'. '+error,'This error happen when running this bot! '+commandAction);
				}if(result){
					console.log(result);
					toastr.success('Hi '+Meteor.user().emails[0].address+'. Everything works nicely.','The bot finished! '+commandAction);
				}
			});
		}
	},
	"click .js-action-unsubscribe-o":function(){
		if(Meteor.user()){
			console.log('I clicked button one');
			event.preventDefault();
			var commandAction = 'outlook/unsubscribeAction.js';
			var domain = 'outlook';
			Meteor.call("commandcopy",commandAction,domain, function (error, result){
				if(error){
					console.log(error);
					toastr.error('Hi '+Meteor.user().emails[0].address+'. '+error,'This error happen when running this bot! '+commandAction);
				}if(result){
					console.log(result);
					toastr.success('Hi '+Meteor.user().emails[0].address+'. Everything works nicely.','The bot finished! '+commandAction);
				}
			});
		}
	},
	"click .js-action-sendemail-o":function(){
		if(Meteor.user()){
			console.log('I clicked button one');
			event.preventDefault();
			var commandAction = 'outlook/multipleAccountsSendEmailAction.js';
			var domain = 'outlook';
			Meteor.call("commandcopy",commandAction,domain, function (error, result){
				if(error){
					console.log(error);
					toastr.error('Hi '+Meteor.user().emails[0].address+'. '+error,'This error happen when running this bot! '+commandAction);
				}if(result){
					console.log(result);
					toastr.success('Hi '+Meteor.user().emails[0].address+'. Everything works nicely.','The bot finished! '+commandAction);
				}
			});
		}
	},
	"click .js-actions-o":function(){
		if(Meteor.user()){
			console.log('I clicked button one');
			event.preventDefault();
			var commandAction = 'actionsbots.js';
			var domain = 'outlook';
			Meteor.call("commandcopy",commandAction,domain, function (error, result){
				if(error){
					console.log(error);
					toastr.error('Hi '+Meteor.user().emails[0].address+'. '+error,'This error happen when running this bot! '+commandAction);
				}if(result){
					console.log(result);
					toastr.success('Hi '+Meteor.user().emails[0].address+'. Everything works nicely.','The bot finished! '+commandAction);
				}
			});
		}
	},
	/*Yahoo*/
	"click .js-action-moveinbox-y":function(){
		if(Meteor.user()){
			console.log('I clicked button one');
			event.preventDefault();
			var commandAction = 'yahoo/moveSpamAction.js';
			var domain = 'yahoo';
			Meteor.call("command",commandAction,domain, function (error, result){
				if(error){
					console.log(error);
					toastr.error('Hi '+Meteor.user().emails[0].address+'. '+error,'This error happen when running this bot! '+commandAction);
				}if(result){
					console.log(result);
					toastr.success('Hi '+Meteor.user().emails[0].address+'. Everything works nicely.','The bot finished! '+commandAction);
				}
			});
		}
	},
	"click .js-action-movespam-y":function(){
		if(Meteor.user()){
			console.log('I clicked button one');
			event.preventDefault();
			var commandAction = 'yahoo/moveSpamAction.js';
			var domain = 'yahoo';
			Meteor.call("command",commandAction,domain, function (error, result){
				if(error){
					console.log(error);
					toastr.error('Hi '+Meteor.user().emails[0].address+'. '+error,'This error happen when running this bot! '+commandAction);
				}if(result){
					console.log(result);
					toastr.success('Hi '+Meteor.user().emails[0].address+'. Everything works nicely.','The bot finished! '+commandAction);
				}
			});
		}
	},
	"click .js-action-unsubscribe-y":function(){
		if(Meteor.user()){
			console.log('I clicked button one');
			event.preventDefault();
			var commandAction = 'yahoo/unsubscribeAction.js';
			var domain = 'yahoo';
			Meteor.call("command",commandAction,domain, function (error, result){
				if(error){
					console.log(error);
					toastr.error('Hi '+Meteor.user().emails[0].address+'. '+error,'This error happen when running this bot! '+commandAction);
				}if(result){
					console.log(result);
					toastr.success('Hi '+Meteor.user().emails[0].address+'. Everything works nicely.','The bot finished! '+commandAction);
				}
			});
		}
	},
	"click .js-action-sendemail-y":function(){
		if(Meteor.user()){
			console.log('I clicked button one');
			event.preventDefault();
			var commandAction = 'yahoo/multipleAccountsSendEmailAction.js';
			var domain = 'yahoo';
			Meteor.call("command",commandAction,domain, function (error, result){
				if(error){
					console.log(error);
					toastr.error('Hi '+Meteor.user().emails[0].address+'. '+error,'This error happen when running this bot! '+commandAction);
				}if(result){
					console.log(result);
					toastr.success('Hi '+Meteor.user().emails[0].address+'. Everything works nicely.','The bot finished! '+commandAction);
				}
			});
		}
	},

});
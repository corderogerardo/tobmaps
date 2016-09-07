Meteor.subscribe("actions");

Template.actionTable.helpers({
	actionsdata:function(){
		return Actions.find().fetch();
	},
	userCanEdit : function() {
		if(Meteor.user()){
			return true;
		}else{
			return false;
		}
	}
});

Template.actionTable.events({
	"click .js-delete-action":function(){
		if(Meteor.user()){
			var id = $(".js-delete-action").val();
			Meteor.call("removeAction",id, function(err,res){
				if(err){
					console.log("Error "+err);
					toastr.error('Hi '+Meteor.user().emails[0].address+'. '+err,'Action could not be deleted!');
				}else{
					console.log("Success "+res);
					toastr.success('Hi '+Meteor.user().emails[0].address+'. You have deleted this action.','Action deleted!');
				}
			});
		}
	},
});
Template.defaultActions.events({
	/*Outlook*/
	"click .js-action-moveinbox-o":function(){
		if(Meteor.user()){
			console.log('I clicked button one');
			event.preventDefault();
			var commandAction = 'outlook/moveInboxAction.js';
			var domain = 'outlook';
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
	"click .js-action-movespam-o":function(){
		if(Meteor.user()){
			console.log('I clicked button one');
			event.preventDefault();
			var commandAction = 'outlook/moveSpamAction.js';
			var domain = 'outlook';
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
	"click .js-action-unsubscribe-o":function(){
		if(Meteor.user()){
			console.log('I clicked button one');
			event.preventDefault();
			var commandAction = 'outlook/unsubscribeAction.js';
			var domain = 'outlook';
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
	"click .js-action-sendemail-o":function(){
		if(Meteor.user()){
			console.log('I clicked button one');
			event.preventDefault();
			var commandAction = 'outlook/multipleAccountsSendEmailAction.js';
			var domain = 'outlook';
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
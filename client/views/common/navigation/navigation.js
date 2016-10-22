/**
 * @memberOf Menu
 * @name  Navigation
 * @locus client/views/common/navigation
 * @summary Client side Meteor for Navigation Menu View Template.
 *
 * @param {BlazeTemplate} Helpers
 * Meteor Blaze Template navigation Helpers
 * @param {Function} isAdminUser check if the current user is an "Admin".
 * @param {Function} isUser check if the current user is an "User" else upsert a "User" rol
 *
 * @param {BlazeTemplate} Events
 * Meteor Blaze Template navigation Events
 * @param {method} Router.go We defined a click event handler for each button to navigate in given url
 * @param {String} Meteor.userId() We used the current user id to personalize the url route and adding security validations   
 */

Template.navigation.rendered = function(){
		// Initialize metisMenu
		$('#side-menu').metisMenu();
	};

	Template.navigation.helpers({
		// check if user is an admin
		isAdminUser: function() {
			if(Roles.userIsInRole(Meteor.user(), ['Admin'])){
				console.log("admin");
				return Roles.userIsInRole(Meteor.user(), ['Admin']);
			}
		},
		isUser: function() {
			if(Roles.userIsInRole(Meteor.user(), ['User'])){
				return Roles.userIsInRole(Meteor.user(), ['User']);
			}
			else {
				console.log("new user");
				Meteor.call("addRoles", Meteor.userId());
			}
		}
	});

	Template.navigation.events({
		'click .js-show-register':function(event){
			event.preventDefault();
			if(Meteor.user()){
				Router.go("register.show", {_id: Meteor.userId()});
			}
		},
		'click .js-show-users-view':function(event){
			event.preventDefault();
			if(Meteor.user()){
				Router.go("usersView.show", {_id: Meteor.userId()});
			}
		},
		'click .js-show-yahoo-register':function(event){
			event.preventDefault();
			if(Meteor.user()){
				Router.go("yahoo.show-add", {_id: Meteor.userId()});
			}
		},
		'click .js-show-yahoo-view':function(event){
			event.preventDefault();
			if(Meteor.user()){
				Router.go("yahoo.show-view", {_id: Meteor.userId()});
			}
		},
		'click .js-show-gmail-register':function(event){
			event.preventDefault();
			if(Meteor.user()){
				Router.go("gmail.show-add", {_id: Meteor.userId()});
			}
		},
		'click .js-show-gmail-view':function(event){
			event.preventDefault();
			if(Meteor.user()){
				Router.go("gmail.show-view", {_id: Meteor.userId()});
			}
		},
		'click .js-show-outlook-register':function(event){
			event.preventDefault();
			if(Meteor.user()){
				Router.go("outlook.show-add", {_id: Meteor.userId()});
			}
		},
		'click .js-show-outlook-view':function(event){
			event.preventDefault();
			if(Meteor.user()){
				Router.go("outlook.show-view", {_id: Meteor.userId()});
			}
		},
		'click .js-show-aol-register':function(event){
			event.preventDefault();
			if(Meteor.user()){
				Router.go("aol.show-add", {_id: Meteor.userId()});
			}
		},
		'click .js-show-aol-view':function(event){
			event.preventDefault();
			if(Meteor.user()){
				Router.go("aol.show-view", {_id: Meteor.userId()});
			}
		},
		'click .js-show-schedule-activities':function(event){
			event.preventDefault();
			if(Meteor.user()){
				Router.go("schedule.show-activities", {_id: Meteor.userId()});
			}
		},
		'click .js-show-schedule-register':function(event){
			event.preventDefault();
			if(Meteor.user()){
				Router.go("schedule.show-add", {_id: Meteor.userId()});
			}
		},
		'click .js-show-schedule-view':function(event){
			event.preventDefault();
			if(Meteor.user()){
				Router.go("schedule.show-view", {_id: Meteor.userId()});
			}
		},
		'click .js-show-actions-register':function(event){
			event.preventDefault();
			if(Meteor.user()){
				Router.go("actions.show-add", {_id: Meteor.userId()});
			}
		},
		'click .js-show-actions-view':function(event){
			event.preventDefault();
			if(Meteor.user()){
				Router.go("actions.show-view", {_id: Meteor.userId()});
			}
		},
		'click .js-show-domains-register':function(event){
			event.preventDefault();
			if(Meteor.user()){
				Router.go("domains.show-add", {_id: Meteor.userId()});
			}
		},
		'click .js-show-domains-view':function(event){
			event.preventDefault();
			if(Meteor.user()){
				Router.go("domains.show-view", {_id: Meteor.userId()});
			}
		},
		'click .js-show-lists-register':function(event){
			event.preventDefault();
			if(Meteor.user()){
				Router.go("lists.show-add", {_id: Meteor.userId()});
			}
		},
		'click .js-show-lists-view':function(event){
			event.preventDefault();
			if(Meteor.user()){
				Router.go("lists.show-view", {_id: Meteor.userId()});
			}
		},
		'click .js-create-proxies':function(event){
			event.preventDefault();
			if(Meteor.user()){
				Router.go("proxies.show-form", {_id: Meteor.userId()});
			}
		},
		'click .js-view-proxies':function(event){
			event.preventDefault();
			if(Meteor.user()){
				Router.go("proxies.show-view", {_id: Meteor.userId()});
			}
		},
	});
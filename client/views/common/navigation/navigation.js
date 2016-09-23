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
})

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
  'click .js-show-schedule-view':function(event){
    event.preventDefault();
    if(Meteor.user()){
      Router.go("scheduleView.show", {_id: Meteor.userId()});
    }
  },
  'click .js-show-schedule-create':function(event){
    event.preventDefault();
    if(Meteor.user()){
      Router.go("scheduleFormView.show", {_id: Meteor.userId()});
    }
  },
  'click .js-show-actions':function(event){
    event.preventDefault();
    if(Meteor.user()){
      Router.go("actions.show", {_id: Meteor.userId()});
    }
  },
  'click .js-show-domains':function(event){
    event.preventDefault();
    if(Meteor.user()){
      Router.go("domains.show", {_id: Meteor.userId()});
    }
  },
  'click .js-show-lists':function(event){
    event.preventDefault();
    if(Meteor.user()){
      Router.go("lists.show", {_id: Meteor.userId()});
    }
  },
})
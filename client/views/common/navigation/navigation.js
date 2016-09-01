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
      else if(Roles.addUsersToRoles(Meteor.user(), ['User'])){
        console.log("User");
        return;
      }
      else {
        console.log("new user");
        Meteor.call("addRoles", Meteor.userId());
      }
   	},
    isUser: function() {
      return Roles.userIsInRole(Meteor.user(), ['User']);
    }
})

Template.navigation.events({
  'click .js-show-register':function(event){
    event.preventDefault();
    if(Meteor.user()){
      Router.go("register.show", {_id: Meteor.userId()});
    }
  },
  'click .js-show-yahoo':function(event){
    event.preventDefault();
    if(Meteor.user()){
      Router.go("yahoo.show", {_id: Meteor.userId()});
    }
  },
  'click .js-show-gmail':function(event){
    event.preventDefault();
    if(Meteor.user()){
      Router.go("gmail.show", {_id: Meteor.userId()});
    }
  },
  'click .js-show-outlook':function(event){
    event.preventDefault();
    if(Meteor.user()){
      Router.go("outlook.show", {_id: Meteor.userId()});
    }
  },
  'click .js-show-aol':function(event){
    event.preventDefault();
    if(Meteor.user()){
      Router.go("aol.show", {_id: Meteor.userId()});
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
      Router.go("scheduleCreate.show", {_id: Meteor.userId()});
    }
  },
})
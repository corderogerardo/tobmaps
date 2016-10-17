/**
 * @summary Emails Module - Client side Meteor for Yahoo Emails Form Template.
 * @module  Emails.
 *
 * Here you will find the methods for:
 * 1. yahooTables Template Methods for:
 * 1.1 onRendered: Loads the footable() jquery functions.
 * 1.2 Helpers:
 *     emails: Search all the yahoo emails where the type of doamin es yahoo.com.
 *     userCanEdit: Return true or false if the user cant edit.
 * 1.3 Events: Listen for all the template events.
 *     Delete accounts: When the user click on button to delete an account.
 * 2.  Meteor subscriptions: To subscribe the emails user data.
 *
 * Meteor general methods.
 * @method check() from Meteor is used to validate data integrity and be sure that the data type is the same from the collection.
 */

/* Initialize fooTable*/
Template.yahooTables.onRendered(function(){
  $('.footable').footable();
});

/**
 * Meteor Subscribe is the way we use to take the data from publications and pass to client user template.
 * These functions control how Meteor servers publish sets of records and how clients can subscribe to those sets.
 */
Meteor.subscribe("emails", function(){
	return Emails.find().fetch();
});

/**
 * The subscribe Meteor Event to filter data that will be passed to template using helpers methods
 * @param  {[function]} 
 * @return {[emails] (Query projection)}
 */
Template.yahooTables.helpers({
	emails:function(){
		return Emails.find({createdBy:Meteor.userId(), typeDomain:'yahoo.com'}).fetch();
	},
  // return true if I am allowed to edit the current account, false otherwise
  userCanEdit : function(doc,Collection) {
    // can edit if the current account is owned by me.
    doc = Emails.findOne({createdBy:Meteor.userId()});
    if (doc){
      return true;
    }
    else {
      return false;
    }
  } 
});

/**
 * Meteor Blaze Template actionTable Events
 * Here I create an event handler to listen when the user click on button to delete an account.
 * First check if there is an user logged in
 * Second looks for the account id to be deleted
 * Third Call Method pass the id data and finally use a callback to check if the operation was performed or not to inform the user.
 * @param this._id refer to account._id
 */
Template.yahooTables.events({
  'click .js-delete-account':function(){
    var account_id = this._id;
    console.log(account_id);
    Meteor.call('removeAccount', Meteor.userId(), account_id, function(err,res){
        if(err){
          console.log("Error "+err);
          toastr.error('Hi '+Meteor.user().emails[0].address+', '+err,'Account could not be deleted!');
        }else{
          console.log("Success "+res);
          toastr.success('Hi '+Meteor.user().emails[0].address+', You have deleted this account.','Account deleted!');
        }
      });
  },
})
/* Initialize fooTable*/
Template.outlookTables.onRendered(function(){
    // Initialize fooTable
    $('.footable').footable();
    $('.footable2').footable();
});

/**
 * @summary Meteor Subscribe is the way we use to take the data from publications and pass to client user template.
 * These functions control how Meteor servers publish sets of records and how clients can subscribe to those sets.
 */
Meteor.subscribe("emails","outlook.com");

/**
 * Summary The subscribe Meteor Event to filter data that will be passed to template using helpers methods
 * @param  {[function]} 
 * @return {[emails] (Query projection)}
 */
Template.outlookTables.helpers({
	emails:function(){
		return Emails.find({createdBy:Meteor.userId(), typeDomain:'outlook.com'}).fetch();
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
 * @summary Meteor Blaze Template actionTable Events
 * Here I create an event handler to listen when the user click on button to delete an account.
 * First check if there is an user logged in
 * Second looks for the account id to be deleted
 * Third Call Method pass the id data and finally use a callback to check if the operation was performed or not to inform the user.
 * @param this._id refer to account._id
 */
Template.outlookTables.events({
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
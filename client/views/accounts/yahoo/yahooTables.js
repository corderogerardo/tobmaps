/* Initialize fooTable*/
Template.yahooTables.onRendered(function(){
  $('.footable').footable();
});

/* Subscribe to read data */
Meteor.subscribe("emails", function(){
	return Emails.find().fetch();
});

/**
 * Summary The subscribe Meteor Event to filter data that will be passed to template using helpers methods
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

Template.yahooTables.events({
  'click .js-delete-account':function(){
    var account_id = this._id;
    console.log(account_id);
    Meteor.call('removeEmailYahoo', Meteor.userId(), account_id, function(err,res){
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
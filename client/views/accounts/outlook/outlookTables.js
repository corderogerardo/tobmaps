/**
 *AddOutlook template render invoke function callback
 * @param  {onRendered} Event)
 * @return {boolean}
 */
Meteor.subscribe("emails","outlook.com");

Template.outlookTables.onRendered(function(){
    // Initialize fooTable
    $('.footable').footable();
    $('.footable2').footable();
});

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
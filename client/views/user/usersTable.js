/* Initialize fooTable*/
Template.usersTable.onRendered(function(){
	$('.footable').footable();
});

/* Subscribe to read data */
Meteor.subscribe("userData", function(){
	return Meteor.users.find();
});

/**
 * Summary The subscribe Meteor Event to filter data that will be passed to template using helpers methods
 * @param  {[function]}
 * @return {[emails] (Query projection)}
 */
 Template.usersTable.helpers({
	accounts:function(){
		return Meteor.users.find({_id:{$ne:Meteor.userId()}});
	},
 });

 Template.usersTable.events({
	'click .js-delete-account':function(){
		var account_id = this._id;
		console.log(account_id);
		Meteor.call('removeUserAccount', Meteor.userId(), account_id, function(err,res){
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
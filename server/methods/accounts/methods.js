'use strict';
/**
 * Meteor methods in server side for accounts
 */

Meteor.methods({
	/**
	 * addRoles: Method that set a User rol when the user login first time 
	 * @param {User Object} userId
	 */
	addRoles:function(userId){
    Roles.addUsersToRoles(userId, ['User']);
  },
  /**
	 * addAccount: Method that validate if there is an user logged to insert an email to it's the collection
	 * and send a verification email.
	 * @param  {User Object} userId
	 * @param  {Email Object} from the email form.
	 * @return {Boolean} Return true if the email was insected correctly, false if does not.
	 */
  addAccount: function(account){
		var userId = Accounts.createUser({
      email: account.email,
      password: account.password
    });
    console.log(userId);
    if(userId){
    	return Accounts.sendVerificationEmail(userId);
    }
	},
	 /* removeAccount: Method that validate if there is an user logged to remove an email to it's the collection.
	 * @param  {User Object} userId
	 * @param  {Email Object} from the email form.
	 * @return {Boolean} Return true if the email was remove correctly, false if does not.
	 */
	removeUserAccount: function(userId, account_id){
		if(! this.userId) {
				throw new Meteor.Error('not-authorized');
		}
		if(this.userId){
    	Meteor.users.remove({"_id":account_id});
    }
	},
});

Meteor.publish("userData", function () {
    return Meteor.users.find();
});

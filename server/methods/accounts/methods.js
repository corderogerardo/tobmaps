/**
 * @summary    Users Accounts Module - Server side Meteor Method for Users
 * @module     UsersAccounts
 *
 * Here you will find the methods for:
 * 1. Add or Assign roles.
 * 2. Add a new User Account.
 * 3. Remove a User Account.
 *
 * Meteor general methods.
 * @method check() from Meteor is used to validate data integrity and be sure that the data type is the same from the collection.
 */

 Meteor.methods({
	/**
	 * @method 1. addRoles: Method that set a User rol when the user login first time
	 * @param {userId String} userId
	 */
	 addRoles:function(userId){
		check(userId, String);
		Roles.addUsersToRoles(userId, ['User']);
	 },
	/**
	 * @method 1. addAccount: Method that validate if there is an user logged to insert an email to the collection
	 * and send a verification email.
	 * @param  {User Account Object} account: data received from the registration user form.
	 * @return {Boolean} userId Return true if the email was inserted correctly, false if does not.
	 */
	 addAccount: function(account){
		check(account.email,String);
		check(account.password,String);
		var userId = Accounts.createUser({
			email: account.email,
			password: account.password
		});
		console.log(userId);
		if(userId){
			return Accounts.sendVerificationEmail(userId);
		}
	 },
	 /* @method 3. removeAccount: Method that validate if there is an user session(user logged) to remove an email to it's the collection.
	 * @param  {User Session Object} userId: Data received from the user actual session.
	 * @param  {User Account Object} account_id: data received from the view table users.
	 * @return {Boolean} Return true if the user account was remove correctly, false if does not.
	 */
	 removeUserAccount: function(userId, account_id){
		if(! this.userId) {
			throw new Meteor.Error('not-authorized');
		}
		if(this.userId){
			check(account_id,String);
			Meteor.users.remove({"_id":account_id});
		}
	 },
	});
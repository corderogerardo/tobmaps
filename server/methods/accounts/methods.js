/**
 * @memberOf Accounts
 * @name  Methods
 * @locus server/methods/accounts
 * @summary Accounts Methods - Server side Meteor Method for Accounts
 *
 * @param {MeteorMethod} addRoles
 * Method used to set a rol when the user login first time.
 * @param {String} userId from logged user for validations.
 *
 * @param {MeteorMethod} addAccount
 * Method that validate if there is an user logged to insert an account to the collection and send a verification email.
 * @param {Object} account from the register form.
 *
 * @param {MeteorMethod} removeAccount
 * Method that validate if there is an user session(user logged) to remove an email to it's the collection.
 * @param {String} userId from logged user for validations.
 * @param {String} account_id from the current user
 *
 */	

 Meteor.methods({
	 addRoles:function(userId){
		check(userId, String);
		Roles.addUsersToRoles(userId, ['User']);
	 },
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
	 removeAccount: function(userId, account_id){
		if(! this.userId) {
			throw new Meteor.Error('not-authorized');
		}
		if(this.userId){
			check(account_id,String);
			Meteor.users.remove({"_id":account_id});
		}
	 },
	});
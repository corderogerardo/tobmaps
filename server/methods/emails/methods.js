/**
 * @summary    Emails Module - Server side Meteor Method for Emails
 * @module     Emails
 *
 * Here you will find the methods for:
 * 1. AddEmail new Emails-addAction.
 * 2. Update Emails-updateAction.
 * 3. Remove Emails-removeAction.
 *
 * Meteor general methods.
 * @method check() from Meteor is used to validate data integrity and be sure that the data type is the same from the collection.
 *
 */
Meteor.methods({
	/**
	 * @method 1. addAEmail(domain): Methods used to insert new Emails, first we check if there is an user logged in, if does then check the data integrity that comes from the form object if pass validations then insert action.
	 * @param      {User Object} userId from logged user for validations.
	 * @param      {Account(email) Object} userId from logged user for validations.
	 * @return {Boolean} Return true if the schedule was inserted correctly, false if does not.
	 */
	addAEmailYahoo: function(userId, account){
		if(! this.userId) {
				throw new Meteor.Error('not-authorized');
		}
		if((this.userId) && (account.email.replace(/.*@/, "") == "yahoo.com") ){
			check(account.email, String);
			check(account.password, String);
			return Emails.insert({
				email: account.email,
				password: account.password,
				imap: 'Accessable',
				typeDomain: account.email.replace(/.*@/, ""),
				createdOn: (new Date).toTimeString(),
				createdBy: this.userId,
			});
		} else {
			throw new Meteor.Error(account.email);
		}
	},
	addAEmailGmail: function(userId, account){
		if(! this.userId) {
				throw new Meteor.Error('not-authorized');
		}
		if((this.userId) && (account.email.replace(/.*@/, "") == "gmail.com") ){
			check(account.email, String);
			check(account.password, String);
			return Emails.insert({
				email: account.email,
				password: account.password,
				imap: 'Accessable',
				typeDomain: account.email.replace(/.*@/, ""),
				createdOn: (new Date).toTimeString(),
				createdBy: this.userId,
			});
		} else {
			throw new Meteor.Error(account.email);
		}
	},
	addAEmailOutlook: function(userId, account){
		if(! this.userId) {
				throw new Meteor.Error('not-authorized');
		}
		if((this.userId) && (account.email.replace(/.*@/, "") == "outlook.com") ){
			check(account.email, String);
			check(account.password, String);
			return Emails.insert({
				email: account.email,
				password: account.password,
				imap: 'Accessable',
				typeDomain: account.email.replace(/.*@/, ""),
				createdOn: (new Date).toTimeString(),
				createdBy: this.userId,
			});
		} else {
			throw new Meteor.Error(account.email);
		}
	},
	addAEmailAol: function(userId, account){
		if(! this.userId) {
				throw new Meteor.Error('not-authorized');
		}
		if((this.userId) && (account.email.replace(/.*@/, "") == "aol.com") ){
			check(account.email, String);
			check(account.password, String);
			return Emails.insert({
				email: account.email,
				password: account.password,
				imap: 'Accessable',
				typeDomain: account.email.replace(/.*@/, ""),
				createdOn: (new Date).toTimeString(),
				createdBy: this.userId,
			});
		} else {
			throw new Meteor.Error(account.email);
		}
	},
	 /* @method 3. removeAccount: Method that validate if there is an user logged to remove an email to it's the collection.
	 * @param  {User Object} userId
	 * @param  {Email Object} account_id: from the email table view.
	 * @return {Boolean} Return true if the email was remove correctly, false if does not.
	 */
	removeAccount: function(userId, account_id){
		if(! this.userId) {
				throw new Meteor.Error('not-authorized');
		}

		if(this.userId){
			check(account_id,String);
			Emails.remove({"_id":account_id});
		}
	},
});
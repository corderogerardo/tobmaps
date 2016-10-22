/**
 * @memberOf Emails
 * @name  Methods
 * @locus server/methods/emails
 * @summary Emails Methods - Server side Meteor Method for Emails
 *
 * @param {MeteorMethod} addEmailYahoo
 * Method used to insert new yahoo email, first check if there is a an user logged in, if does then check the data integrity that comes from the form object if pass validations then insert email.
 * @param {String} userId from logged user for validations.
 * @param {Object} account from the yahoo email form.
 *
 * @param {MeteorMethod} addEmailGmail
 * Method used to insert new gmail email, first check if there is a an user logged in, if does then check the data integrity that comes from the form object if pass validations then insert email.
 * @param {String} userId from logged user for validations.
 * @param {Object} account from the gmail email form.
 *
 * @param {MeteorMethod} addEmailOutlook
 * Method used to insert new outlook email, first check if there is a an user logged in, if does then check the data integrity that comes from the form object if pass validations then insert email.
 * @param {String} userId from logged user for validations.
 * @param {Object} account from the outlook email form.
 *
 * @param {MeteorMethod} addEmailAOL
 * Method used to insert new aol email, first check if there is a an user logged in, if does then check the data integrity that comes from the form object if pass validations then insert email.
 * @param {String} userId from logged user for validations.
 * @param {Object} account from the aol email form.
 *
 * @param {MeteorMethod} removeEmail
 * Method used to remove emails, first we check if there is an user logged in, if does then check the data integrity that comes from object if pass validations then delete emails.
 * @param {String} userId from logged user for validations.
 * @param {String} email_id from the current email
 *
 */	
Meteor.methods({
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
	removeEmail: function(userId, account_id){
		if(! this.userId) {
				throw new Meteor.Error('not-authorized');
		}

		if(this.userId){
			check(account_id,String);
			Emails.remove({"_id":account_id});
		}
	},
});
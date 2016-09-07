'use strict';
/**
 * Meteor methods in server side for accounts
 */
Meteor.methods({
	/**
	 * insertEmail: Method that validate if there is an user logged to insert an email to it's the collection.
	 * @param  {User Object} userId
	 * @param  {Email Object} from the email form.
	 * @return {Boolean} Return true if the email was insected correctly, false if does not.
	 */
	addAEmailAol: function(account){
		if((this.userId) && (account.email.replace(/.*@/, "") == "aol.com") ){
			account.imap = 'Accessable';
			account.typeDomain = account.email.replace(/.*@/, ""); 
			account.createdOn = (new Date).toTimeString();
			account.createdBy = this.userId;
			return Emails.insert(account);
		}
	},
  addAEmailYahoo: function(userId, account){
  	if(! this.userId) {
				throw new Meteor.Error('not-authorized');
		}
		if((this.userId) && (account.email.replace(/.*@/, "") == "yahoo.com") ){
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
	addMultiAol: function(userId, account){
		if(! this.userId) {
				throw new Meteor.Error('not-authorized');
		}
		if((this.userId) && (account.email.replace(/.*@/, "") == "aol.com") ){
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
	 /* removeEmail: Method that validate if there is an user logged to insert an email to it's the collection.
	 * @param  {User Object} userId
	 * @param  {Email Object} from the email form.
	 * @return {Boolean} Return true if the email was insected correctly, false if does not.
	 */
	removeEmailYahoo: function(userId, account_id){
		if(! this.userId) {
				throw new Meteor.Error('not-authorized');
		}
		if(this.userId){
    	Emails.remove({"_id":account_id});
    }
	},
});
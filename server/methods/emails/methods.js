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
	addAEmailYahoo: function(account){
		if((this.userId) && (account.email.replace(/.*@/, "") == "yahoo.com") ){
			account.imap = 'Accessable';
			account.typeDomain = account.email.replace(/.*@/, ""); 
			account.createdOn = (new Date).toTimeString();
			account.createdBy = this.userId;
			return Emails.insert(account);
		}
	},
	addAEmailAol: function(account){
		if((this.userId) && (account.email.replace(/.*@/, "") == "aol.com") ){
			account.imap = 'Accessable';
			account.typeDomain = account.email.replace(/.*@/, ""); 
			account.createdOn = (new Date).toTimeString();
			account.createdBy = this.userId;
			return Emails.insert(account);
		}
	},
	addAEmailGmail: function(account){
		if((this.userId) && (account.email.replace(/.*@/, "") == "gmail.com") ){
			account.imap = 'Accessable';
			account.typeDomain = account.email.replace(/.*@/, ""); 
			account.createdOn = (new Date).toTimeString();
			account.createdBy = this.userId;
			return Emails.insert(account);
		}
	},
	addAEmailOutlook: function(account){
		if((this.userId) && (account.email.replace(/.*@/, "") == "outlook.com") ){
			account.imap = 'Accessable';
			account.typeDomain = account.email.replace(/.*@/, ""); 
			account.createdOn = (new Date).toTimeString();
			account.createdBy = this.userId;
			return Emails.insert(account);
		}
	},
});
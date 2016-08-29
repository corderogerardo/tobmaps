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
	addAccount: function(email){
		//if(this.userId){
			email.imap = true;
			email.createdOn = new Date();
			return Emails.insert(email);
	}
		//}

});
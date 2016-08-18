Meteor.methods({
	insertEmail: function(emailform){
		Emails.insert({
		email:emailform.email,
		password:emailform.password,
		domain:emailform.domain,
		imap:emailform.imap,
		createdOn:new Date(),
		});
	}
});
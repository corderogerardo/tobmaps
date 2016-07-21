Meteor.methods({
	insertEmail: function(emailform){
		Emails.insert({
		email:emailform.email,
		password:emailform.password,
		domain:emailform.domain,
		accesible:emailform.accesible,
		createdOn:new Date(),
		});
	}
});
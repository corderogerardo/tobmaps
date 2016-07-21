Template.formBasic.events({
	"submit .js-save-email-form-horizontal":function(event){
		event.preventDefault();
		email = $("#email").val();
		password = $("#password").val();
		domain =  email.replace(/.*@/, "");
		console.log("Domain: "+domain);
		console.log("email: "+email);

		emailform = {
			email: email,
			password:password,
		};
		Meteor.call('insertEmail',emailform);
		$('.js-save-email-form-horizontal').trigger('reset');
	}
});
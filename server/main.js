Meteor.startup(function () {
	// bootstrap the admin user if they exist -- You'll be replacing the id later
	if (Meteor.users.findOne("myQpmPqNZwsYNn6GW"))
	  Roles.addUsersToRoles("myQpmPqNZwsYNn6GW", ['Admin']);
})
// start up script that creates some users for testing
// users have the username 'user1@test.com' .. 'user8@test.com'
// and the password test123
 Meteor.startup(function () {
 	// bootstrap the admin user if they exist -- You'll be replacing the id later
	if (Meteor.users.findOne("myQpmPqNZwsYNn6GW"))
	  Roles.addUsersToRoles("myQpmPqNZwsYNn6GW", ['Admin']);

	if (!Meteor.users.findOne()){
      for (var i=1;i<3;i++){
        var email = "user"+i+"@test.com";
        var avatar = "ava"+i+".png"
        console.log("creating a user with password 'test123' and username/ email: "+email);
        Meteor.users.insert({
        	emails:[{address:email}],
        	services:{ password:{"bcrypt" : "$2a$10$I3erQ084OiyILTv8ybtQ4ON6wusgPbMZ6.P33zzSDei.BbDL.Q4EO"}}});
      }
    }
  });
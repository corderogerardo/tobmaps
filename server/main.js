// start up script that creates some users for testing
// users have the username 'user1@test.com' .. 'user8@test.com'
// and the password test123
Meteor.startup(function () {
	// bootstrap the admin user if they exist -- You'll be replacing the id later
	
	/**
	 * SMTP [Stored in the object configuration variables]
	 * @type {Object}
	 */
	smtp = {
    username: 'username@example.com',
    password: 'password',
    server: 'smtp.example.com',
    port: 465
  };
  /**
   * MAIL_URL: Set the environment variable with the parameters obtained from the SMTP object
   * @type {String} 
   */
  //process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;

  /**
   * emailTemplates: Personalize the appearance of verification email 
   * that is sent to the user when registering.
   * @type {Object}
   */
  Accounts.emailTemplates = {
    from: smtp.username,
    siteName: 'YourSite',
    verifyEmail: {
      subject: function(user) {
        return 'Verification email from tobmaps.com';
      },
      text: function(user, url) {
        return 'Hi,\n' +
          'Please open the link below to verify your account on tobmaps.com:\n' + url;
      }
    }
  };

	if (!Meteor.users.findOne()){
		for (var i=1;i<3;i++){
			var email = "user"+i+"@test.com";
			var avatar = "ava"+i+".png";
			Meteor.users.insert({
			emails:[{address:email}],
			services:{ password:{"bcrypt" : "$2a$10$I3erQ084OiyILTv8ybtQ4ON6wusgPbMZ6.P33zzSDei.BbDL.Q4EO"}}});
			}
		}
	var userAdmin = Meteor.users.findOne({
		emails:[{address:"user1@test.com"}],
	});
	var userx = Meteor.users.findOne({
		emails:[{address:"user2@test.com"}],
	});
	if (userAdmin){
		Roles.addUsersToRoles(userAdmin._id, ['Admin']);
	}
	if (userx){
		Roles.addUsersToRoles(userx._id, ['User']);
	}
	});
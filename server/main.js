// start up script that creates some users for testing
// users have the username 'user1@test.com' .. 'user8@test.com'
// and the password test123
Meteor.startup(function () {
	var exec = Npm.require('child_process').exec;

var process_exec_sync = function (command) {
	 // Load future from fibers
	 var Future = Npm.require("fibers/future");
	// Load exec
	var child = Npm.require("child_process");
	// Create new future
	var future = new Future();
	// Run command synchronous
	child.exec(command, function(error, stdout, stderr) {
		// return an onbject to identify error and success
		var result = {};
		// test for error
		if (error) {
			result.error = error;
		}
		// return stdout
		result.stdout = stdout;
		result.stderr = stderr;
		future.return(result);
	});
	// wait for future
	return future.wait();
};


var cron = Npm.require('node-schedule');

var Fiber = Npm.require('fibers');


var rule = new cron.RecurrenceRule();
	// bootstrap the admin user if they exist -- You'll be replacing the id later

	/**
	 * SMTP [Stored in the object configuration variables]
	 * @type {Object}
	 */
	 smtp = {
		username: 'tobmapsadm@gmail.com',
		password: 'tobmaps12345678',
		server: 'smtp.gmail.com',
		port: 465
	 };
	/**
	 * MAIL_URL: Set the environment variable with the parameters obtained from the SMTP object
	 * @type {String}
	 */
	 process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;

	/**
	 * emailTemplates: Personalize the appearance of verification email
	 * that is sent to the user when registering.
	 * @type {Object}
	 */
	 Accounts.emailTemplates = {
		from: smtp.username,
		siteName: 'tobmapsAdm <'+smtp.username+'>',
		verifyEmail: {
			subject: function(user) {
				return '[TobMaps] Verify You Email Address';
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

	/**
	 * All the accounts for the schedules
	 *
	 */

	 var allSchedules = Schedules.find({
		$or:[{
			state:true
		}]
	 });
	 allSchedules.forEach(function(schedule,index){
		var allAccounts = Emails.find({
		$or:[
		{
			createdBy:schedule.createdBy
		}
		]
	 }).map(function(c){
		return {email:c.email, email:c.email,
			password:c.password,password:c.password}
		});
	 var proxies = Proxies.find({
		$or:[{
			createdBy:schedule.createdBy
		}]
	 }).map(function(c){
		return {ip:c.ip,ip:c.ip,
			port:c.port,port:c.port,
			user:c.user,user:c.user,
			pass:c.pass,pass:c.pass,
			type:c.type,type:c.type}
		});
		var daysArr=schedule.days;
		var daysArrNum=[];
		daysArr.forEach(function(day,index){
			switch(day){
				case "sunday":
				daysArrNum.push(0);
				break;
				case "monday":
				daysArrNum.push(1);
				break;
				case "tuesday":
				daysArrNum.push(2);
				break;
				case "wednesday":
				daysArrNum.push(3);
				break;
				case "thurstday":
				daysArrNum.push(4);
				break;
				case "friday":
				daysArrNum.push(5);
				break;
				case "saturday":
				daysArrNum.push(6);
				break;
				default:
				break;
			}
		});
		var schedulehours = schedule.hours.map(Number);
		rule.dayOfWeek = daysArrNum;
		rule.hour = schedulehours;
		rule.minute = [schedule.awakening];

		var whitelist = Lists.find({
			$or:[
			{
				_id:schedule.whitelist
			}
			]
		}).map(function(c){
			return {domains:c.domains, domains:c.domains}
		});

		var blacklist = Lists.find({
			$or:[
			{
				_id:schedule.blacklist
			}
			]
		}).map(function(c){
			return {domains:c.domains, domains:c.domains}
		});
		var actions = Actions.find({
			$or:[
			{
				_id:schedule.actions
			}
			]
		}).map(function(c){
			return {actions:c.actions, actions:c.actions}
		});
		cron.scheduleJob(schedule._id, rule, function(){
			/*console.log(schedule._id, 'Schedule Active');
			console.log(allAccounts, 'that user accounts');
			console.log(blacklist, 'that user black list');
			console.log(whitelist, 'that user white list');
			console.log(actions, 'that user actions');
			console.log(proxies, 'that user actions');*/

			var toproxies = Math.floor(Math.random() * proxies.length) + 1;

			allAccounts.forEach(function (account,index) {
				var line = "";

				if(account.email.replace(/.*@/, "")=="outlook.com"){
					line = "xvfb-run casperjs ../../../../../tests/outlook/outlookactions.js --blacklist="+ JSON.stringify(whitelist)+" --whitelist="+ JSON.stringify(blacklist)+" --accounts="+ JSON.stringify(account)+" --actions="+ JSON.stringify(actions)+" --engine=slimerjs --disk-cache=no --proxy="+proxies[toproxies-1].ip+":"+proxies[toproxies-1].port +" --proxy-auth="+proxies[toproxies-1].user+":"+proxies[toproxies-1].pass+" --proxy-type="+proxies[toproxies-1].type;
					/*console.log("In command method", line);*/
					Fiber = Npm.require('fibers');
					exec(line, function(stderr, stdout) {
						/*console.log('Command Method STDOUT: '+ stdout);
						console.log('Command Method STDERR: '+ stderr);*/
						Fiber(function() {
							var botcli = ScheduleLoggers.insert({
								out: JSON.stringify(stdout),
								stderror: JSON.stringify(stderr),
								command:line,
								createdOn: new Date(),
								createdBy:this.userId,
							});
							return botcli;
						}).run(); /*END FIBER*/
					});/*END EXEC*/
				}/*END IF OUTLOOK.COM*/
				if(account.email.replace(/.*@/, "")=="yahoo.com"){
					line = "xvfb-run casperjs ../../../../../tests/yahoo/yahooactions.js --blacklist="+ JSON.stringify(whitelist)+" --whitelist="+ JSON.stringify(blacklist)+" --accounts="+ JSON.stringify(account)+" --actions="+ JSON.stringify(actions)+" --engine=slimerjs --disk-cache=no --proxy="+proxies[toproxies-1].ip+":"+proxies[toproxies-1].port +" --proxy-auth="+proxies[toproxies-1].user+":"+proxies[toproxies-1].pass+" --proxy-type="+proxies[toproxies-1].type;
					/*console.log("In command method", line);*/
					Fiber = Npm.require('fibers');
					exec(line, function(stderr, stdout) {
					/*	console.log('Command Method STDOUT: '+ stdout);
						console.log('Command Method STDERR: '+ stderr);*/
						Fiber(function() {
							var botcli = ScheduleLoggers.insert({
								out: JSON.stringify(stdout),
								stderror: JSON.stringify(stderr),
								command:line,
								createdOn: new Date(),
								createdBy:this.userId,
							});
							return botcli;
						}).run(); /*END FIBER*/
					});/*END EXEC*/
				}

			});/*END FOREACH ACCOUNTS*/

		});/*END CRON JOB SCHEDULE*/

	 });/*End AllSchedules ForEach*/

});
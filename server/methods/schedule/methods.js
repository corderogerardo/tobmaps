
var exec = Npm.require('child_process').exec;

var cron = Npm.require('node-schedule');

var rule = new cron.RecurrenceRule();

rule.dayOfWeek = [0, 2, 4, 5];
rule.hour = [16, 17, 18, 19];
rule.minute = [55, 57, 58];

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

 Meteor.methods({
	command: function(commandAction,domain) {
		if(!this.userId){
			throw new Meteor.Error('not-authorized');
		}
		var yahooAccounts = Emails.find({
			$or:[
			{
				typeDomain:"yahoo.com",
				createdBy:this.userId
			}
			]
		}).fetch();
		var outlookAccounts = Emails.find({
			$or:[
			{
				typeDomain:"outlook.com",
				createdBy:this.userId
			}
			]
		}).fetch();
		var gmailAccounts = Emails.find({
			$or:[
			{
				typeDomain:"gmail.com",
				createdBy:this.userId
			}
			]
		}).fetch();
		var aolAccounts = Emails.find({
			$or:[
			{
				typeDomain:"aol.com",
				createdBy:this.userId
			}
			]
		}).fetch();

		var userSchedules = Schedules.find({
			$or:[
				{
					createdBy:this.userId
				}
			]
		}).fetch();

		var accounts = [
		{user: "tobmaps@yahoo.com", pwd: "spamBOT-12345678"},
		{user: "tobmaps@yahoo.com", pwd: "spamBOT-12345678"},
		{loginfmt: 'tobmapx@outlook.com',passwd: 'tobMAPS-123'}
		];
		console.log(userSchedules);
		if(domain==="yahoo"){
			for (var i = 0; i < yahooAccounts.length; i++) {
				var username = yahooAccounts[i]["email"];
				console.log(username);
				var password = yahooAccounts[i]["password"];
				console.log(password);
				var line = 'xvfb-run casperjs ../../../../../tests/'+commandAction+' yahoo.com outlook.com --username="'+username+'" --password="'+password+'" --engine=slimerjs --disk-cache=no';
				console.log("In command method", line);
				var Fiber = Npm.require('fibers');
				this.unblock();
				exec(line, function(error, stdout, stderr) {
					console.log('Command Method Error: '+ error);
					console.log('Command Method STOUT: '+ stdout);
					console.log('Command Method STDERR: '+ stderr);
					Fiber(function() {
						//Replies.remove({});
						var botcli = ScheduleLoggers.insert({
							out: JSON.stringify(stdout),
							stderror: JSON.stringify(stderr),
							errors:JSON.stringify(error),
							command:line,
							createdOn: new Date(),
							createdBy:this.userId,
						});
						return botcli;
					}).run();
				});
			}
		}
		if(domain==="outlook"){
			for (var i = 0; i < outlookAccounts.length; i++) {
				var username = outlookAccounts[i]["email"];
				console.log(username);
				var password = outlookAccounts[i]["password"];
				console.log(password);
				var line = 'casperjs ../../../../../tests/'+commandAction+' yahoo.com outlook.com --username="'+username+'" --password="'+password+'" --engine=slimerjs --disk-cache=no';
				console.log("In command method", line);
				var Fiber = Npm.require('fibers');
				this.unblock();
				exec(line, function(error, stdout, stderr) {
					console.log('Command Method Error: '+ error);
					console.log('Command Method STOUT: '+ stdout);
					console.log('Command Method STDERR: '+ stderr);
					Fiber(function() {
						//Replies.remove({});
						var botcli = ScheduleLoggers.insert({
							out: JSON.stringify(stdout),
							stderror: JSON.stringify(stderr),
							errors:JSON.stringify(error),
							command:line,
							createdOn: new Date(),
							createdBy:this.userId,
						});
						return botcli;
					}).run();
				});
			}
		}

	},
	runCasperJS: function(command) {
		if(!this.userId){
			throw new Meteor.Error('not-authorized');
		}
		// This method call won't return immediately, it will wait for the
		// asynchronous code to finish, so we call unblock to allow this client
		// to queue other method calls (see Meteor docs)
		this.unblock();
		// run synchonous system command
		var result = process_exec_sync(command);
		// check for error
		if (result.error) {
			throw new Meteor.Error("exec-fail", "Error running CasperJS: " + result.error.message);
		}
		// success
		return true;
	},
	/**
	 * @summary   Meteor Server Side Methods for Schedules Module
	 * insertSchedule: Method that validate if there is an user logged to insert a schedule to it's collection.
	 * @param  {User Object} userId User logged
	 * @param  {schedule Object} from the scheduleForm form.
	 * @return {Boolean} Return true if the schedule was inserted correctly, false if does not.
	 *
	 *
	 * removeSchedule: Method used to remove Schedules, first we check if there is an user logged in, if does then check the data integrity that comes from the form object if pass validations then Delete Schedule.
	 * @param  {String} id of the actual Schedule
	 * @return {Boolean} Return true if the schedule was deleted correctly, false if does not.
	 */
	 insertSchedule: function(schedulef){
		if(!this.userId){
			throw new Meteor.Error('not-authorized');
		}
		if(this.userId){
			check(schedulef.name,String);
			check(schedulef.description,String);
			check(schedulef.days,Array);
			check(schedulef.hours,Array);
			check(schedulef.awakening,Number);
			check(schedulef.actions,String);
			check(schedulef.whitelist,String);
			check(schedulef.blacklist,String);
			schedulef.schedulelogged = [''];
			schedulef.createdOn = new Date();
			schedulef.createdBy = this.userId;
			return Schedules.insert(schedulef);
		}
	 },
	 removeSchedule:function(schedule_id){
		if(!this.userId){
			throw new Meteor.Error('not-authorized');
		}
		if(this.userId){
			check(schedule_id,String);
			return Schedules.remove(schedule_id);
		}
	 },
	 activateSchedule:function(schedule_id, check_value){
		if(!this.userId){
			throw new Meteor.Error('not-authorized');
		}
		if(this.userId){
			check(schedule_id,String);
			/**
			 * [schedule description]
			 * @type {[type]}
			 */
			var schedule = Schedules.findOne({_id:schedule_id});
			console.log(schedule);
			/**
			 * [description]
			 * @param  {[type]} c){				return {domains:c.domains, domains:c.domains}			} [description]
			 * @return {[type]}                [description]
			 */
			var whitelist = Lists.find({
				$or:[
				{
					_id:schedule.whitelist
				}
				]
			}).map(function(c){
				return {domains:c.domains, domains:c.domains}
			});
			console.log(whitelist);
			/**
			 * [description]
			 * @param  {[type]} c){				return {domains:c.domains, domains:c.domains}			} [description]
			 * @return {[type]}                [description]
			 */
			var blacklist = Lists.find({
				$or:[
				{
					_id:schedule.blacklist
				}
				]
			}).map(function(c){
				return {domains:c.domains, domains:c.domains}
			});
			console.log(blacklist);
			/**
			 * [description]
			 * @param  {[type]} c){				return {actions:c.actions, actions:c.actions}			} [description]
			 * @return {[type]}                [description]
			 */
			var actions = Actions.find({
				$or:[
				{
					_id:schedule.actions
				}
				]
			}).map(function(c){
				return {actions:c.actions, actions:c.actions}
			});
			console.log(actions);
			/**
			 * [description]
			 * @param  {[type]} c){				return {email:c.email, email:c.email,								password:c.password,password:c.password}			} [description]
			 * @return {[type]}                [description]
			 */
			var actionObject = Actions.findOne({_id:schedule.actions});
			
			if(actionObject.isp === 'yahoo'){
				var accounts = Emails.find({
					$or:[
						{
							createdBy:schedule.createdBy,
							typeDomain:'yahoo.com'
						}
					]
					}).map(function(c){
					return {email:c.email, email:c.email,
									password:c.password,password:c.password}
				});
				console.log(accounts);
			}
			else if(actionObject.isp === 'gmail'){
				var accounts = Emails.find({
					$or:[
						{
							createdBy:schedule.createdBy,
							typeDomain:'gmail.com'
						}
					]
					}).map(function(c){
					return {email:c.email, email:c.email,
									password:c.password,password:c.password}
				});
				console.log(accounts);
			}
			else if(actionObject.isp === 'gmail'){
				var accounts = Emails.find({
					$or:[
						{
							createdBy:schedule.createdBy,
							typeDomain:'gmail.com'
						}
					]
					}).map(function(c){
					return {email:c.email, email:c.email,
									password:c.password,password:c.password}
				});
				console.log(accounts)
			}
			else{
				var accounts = Emails.find({
					$or:[
						{
							createdBy:schedule.createdBy
						}
					]
					}).map(function(c){
					return {email:c.email, email:c.email,
									password:c.password,password:c.password}
				});
				console.log(accounts)
			}
			/**
		  * [line description]
		  * @type {String}
		  */
			if(check_value == true){
				Schedules.update(schedule_id, {
		      $set: { checked: ! schedule.checked },
		    });
				console.log("Schedule Active", check_value); 
				cron.scheduleJob(schedule.name, rule, function(){
		    	console.log(schedule_id, 'Schedule Active');
					var line = "casperjs ../../../../../tests/actionsBot.js --whiteList="+ JSON.stringify(whitelist)+" --blackList="+ JSON.stringify(blacklist)+" --accounts="+ JSON.stringify(accounts)+" --actions="+ JSON.stringify(actions)+" --engine=slimerjs --disk-cache=no";
					console.log("In command method", line);
					var Fiber = Npm.require('fibers');
					exec(line, function(stderr, stdout) {
						console.log('Command Method STDOUT: '+ stdout);
						console.log('Command Method STDERR: '+ stderr);
						Fiber(function() {
							var botcli = ScheduleLoggers.insert({
								out: JSON.stringify(stdout),
								stderror: JSON.stringify(stderr),
								command:line,
								createdOn: new Date(),
								createdBy:this.userId,
							});
							return botcli;
						}).run();
					});
				});
			}
			else {
				console.log("Schedule Inactive", check_value);
				var my_bot = cron.scheduledJobs[schedule.name];
				my_bot.cancel();
			}
		}
	},
});
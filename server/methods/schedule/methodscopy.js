
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

/**
 * Meteor methods in server side for schedules
 */
 Meteor.methods({
	commandcopy: function(commandAction,domain) {
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
		}).map(function(c){
			return {email:c.email, email:c.email,
							password:c.password,password:c.password}
		});
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
				var line = 'casperjs ../../../../../tests/'+commandAction+' yahoo.com outlook.com --accounts="'+outlookAccounts+'" --engine=slimerjs --disk-cache=no';
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
			console.log(outlookAccounts);
			/*for (var i = 0; i < outlookAccounts.length; i++) {*/
				console.log("xvfb-run -a "+password);
				var line = "casperjs ../../../../../tests/"+commandAction+" yahoo.com outlook.com --accounts="+ JSON.stringify(outlookAccounts)+" --engine=slimerjs --disk-cache=no";
				console.log("In command method copy", line);
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
			/*}*/ //end for
		}

	},
	runCasperJScopy: function(command) {
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
	 * insertSchedule: Method that validate if there is an user logged to insert a schedule to it's collection.
	 * @param  {User Object} userId User logged
	 * @param  {schedule Object} from the scheduleForm form.
	 * @return {Boolean} Return true if the schedule was inserted correctly, false if does not.
	 */
	 insertSchedulecopy: function(schedulef){
		if(!this.userId){
			throw new Meteor.Error('not-authorized');
		}
		if(this.userId){
			check(schedulef.name,String);
			check(schedulef.description,String);
			check(schedulef.days,Array);
			check(schedulef.hours,Array);
			check(schedulef.awakening,Number);
			check(schedulef.actions,Array);
			check(schedulef.whitelist,String);
			check(schedulef.blacklist,String);
			schedulef.schedulelogged = [''];
			schedulef.createdOn = new Date();
			schedulef.createdBy = this.userId;
			Schedules.insert(schedulef);
		}
	 },
	 removeSchedulecopy:function(schedule_id){
		if(!this.userId){
			throw new Meteor.Error('not-authorized');
		}
		if(this.userId){
			check(schedule_id,String);
			return Schedules.remove(schedule_id);
		}
	 },
	});
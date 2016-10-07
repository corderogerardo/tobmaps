
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
		var allAccounts = Emails.find({
			$or:[
			{
				createdBy:this.userId
			}
			]
		}).map(function(c){
			return {email:c.email, email:c.email,
				password:c.password,password:c.password}
		});

		var userSchedules = Schedules.find({
			$or:[
			{
				createdBy:this.userId,
			}
			]
		},{skip: 0, limit: 1}).map(function(c){
			return {days:c.days, days:c.days,
						hours:c.hours,hours:c.hours,
						awakening:c.awakening, awakening:c.awakening,
						actions:c.actions,actions:c.actions,
						whitelist:c.whitelist, whitelist:c.whitelist,
						blacklist:c.blacklist,blacklist:c.blacklist}
		});
		var daysArr=userSchedules[0].days;
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

		var scheduleActions = Actions.find({_id:userSchedules[0].actions
		},{skip: 0, limit: 1}).map(function(c){
			return {actions:c.actions, actions:c.actions}
		});
		var scheduleWhitelist = Lists.find({
			$or:[
			{
				_id:userSchedules[0].whitelist,
				typelist:"whiteList",
				createdBy:this.userId
			}
			]
		}).map(function(c){
			return {domains:c.domains, domains:c.domains}
		});
		var scheduleBlacklist = Lists.find({
			$or:[
			{
				_id:userSchedules[0].blacklist,
				typelist:"blackList",
				createdBy:this.userId
			}
			]
		}).map(function(c){
			return {domains:c.domains, domains:c.domains}
		});
		console.log("User Schedules: "+JSON.stringify(userSchedules));
		if(domain==="yahoo"){
			var line = "casperjs ../../../../../tests/"+commandAction+" --whiteList="+ JSON.stringify(whitelist)+" --blackList="+ JSON.stringify(blacklist)+" --accounts="+ JSON.stringify(allAccounts)+" --engine=slimerjs --disk-cache=no --proxy=180.177.157.62:80";
			console.log("In command method", line);
			var Fiber = Npm.require('fibers');
			this.unblock();
			exec(line, function(stderr, stdout) {
				console.log('Command Method STDOUT: '+ stdout);
				console.log('Command Method STDERR: '+ stderr);
				Fiber(function() {
					//Replies.remove({});
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
		}
		if(domain==="outlook"){
			console.log(allAccounts);
			console.log(daysArr);
			console.log(daysArrNum.sort());

			/*for (var i = 0; i < outlookAccounts.length; i++) {*/
				var line = "casperjs ../../../../../tests/"+commandAction+"  --blacklist="+JSON.stringify(scheduleBlacklist) +" --whitelist="+ JSON.stringify(scheduleWhitelist)+" --accounts="+ JSON.stringify(allAccounts)+" --actions="+JSON.stringify(scheduleActions)+" --engine=slimerjs --disk-cache=no";
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
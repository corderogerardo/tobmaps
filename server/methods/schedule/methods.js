
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
		future.return(result);
	});
	// wait for future
	return future.wait();
};

/**
 * Meteor methods in server side for schedules
 */
 Meteor.methods({
	command: function(commandAction) {
		var accounts =
		[
		{user: "tobmaps@yahoo.com", pwd: "spamBOT-12345678"},
		{user: "tobmaps@yahoo.com", pwd: "spamBOT-12345678"}
		];

		for (var i = 0; i < accounts.length; i++) {
			var username = accounts[i]["user"];
			var password = accounts[i]["pwd"];
			var line = 'casperjs ../../../../../tests/'+commandAction+' yahoo.com outlook.com --username="'+username+'" --password="'+password+'" --engine=slimerjs --disk-cache=no';
			console.log("In command method", line);
			var Fiber = Npm.require('fibers');
			exec(line, function(error, stdout, stderr) {
				console.log('Command Method', error, stdout, stderr);
				Fiber(function() {
						//Replies.remove({});
						var botcli = ScheduleLoggers.insert(
						{
							message: stdout ? JSON.stringify(stdout) : JSON.stringify(stderr),
							time_exec: (new Date).toTimeString(),
							domain: "@yahoo.com"
						});
						return botcli;
					}).run();
			});
		};
	},
	runCasperJS: function(command) {
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
			check(schedulef.actions,Array);
			check(schedulef.whitelist,String);
			check(schedulef.blacklist,String);
			schedulef.schedulelogged = [''];
			schedulef.createdOn = new Date();
			schedulef.createdBy = this.userId;
			Schedules.insert(schedulef);
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
	});
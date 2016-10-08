
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

Meteor.methods({
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
			 console.log("Days array: "+daysArrNum);
			 console.log("Hours: "+schedulehours);
			 console.log("Minutes: "+schedule.awakening);
			 rule.dayOfWeek = daysArrNum;

			 rule.hour = schedulehours;

			 rule.minute = [schedule.awakening];
			/**
			 * [description]
			 * @param  {[type]} c){				return {domains:c.domains, domains:c.domains}			} [description]
			 * @return {[type]}                [description]
			 */

			/**
			 * [description]
			 * @param  {[type]} c){				return {email:c.email, email:c.email,								password:c.password,password:c.password}			} [description]
			 * @return {[type]}                [description]
			 */

			/**
			* [line description]
			* @type {String}
			*/
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
					console.log(allAccounts);
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
			if(check_value == true){
				/*Schedules.update(schedule_id, {
					$set: { checked: ! schedule.checked },
				});*/
				console.log("Schedule Active", check_value);
				cron.scheduleJob(schedule.name, rule, function(){
					console.log(schedule_id, 'Schedule Active');
					console.log(allAccounts, 'that user accounts');
					console.log(blacklist, 'that user black list');
					console.log(whitelist, 'that user white list');
					console.log(actions, 'that user actions');

			 allAccounts.forEach(function (account,index) {
				var line = "";

				if(account.email.replace(/.*@/, "")=="outlook.com"){

					line = "xvfb-run casperjs ../../../../../tests/outlookactions.js --blacklist="+ JSON.stringify(whitelist)+" --whitelist="+ JSON.stringify(blacklist)+" --accounts="+ JSON.stringify(account)+" --actions="+ JSON.stringify(actions)+" --engine=slimerjs --disk-cache=no";
					console.log("In command method", line);
					Fiber = Npm.require('fibers');
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
						}).run(); /*END FIBER*/
					});/*END EXEC*/
				}/*END IF OUTLOOK.COM*/
				if(account.email.replace(/.*@/, "")=="yahoo.com"){
					line = "xvfb-run casperjs ../../../../../tests/yahooactions.js --blacklist="+ JSON.stringify(whitelist)+" --whitelist="+ JSON.stringify(blacklist)+" --accounts="+ JSON.stringify(account)+" --actions="+ JSON.stringify(actions)+" --engine=slimerjs --disk-cache=no";
					console.log("In command method", line);
					Fiber = Npm.require('fibers');
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
						}).run(); /*END FIBER*/
					});/*END EXEC*/
				}

			 });/*END FOREACH*/

			});/*END CRON JOB SCHEDULE*/


			}/*END IF CHECKED TRUE*/
			else {
				console.log("Schedule Inactive", check_value);
				var my_bot = cron.scheduledJobs[schedule.name];
				my_bot.cancel();
			}
		}
	},
});
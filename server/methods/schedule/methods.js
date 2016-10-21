/**
 * @memberof   Schedules
 * @name       Methods
 * @locus	server/methods/schedule
 *
 * @summary    Schedule Module - Server side Meteor Method for Schedule
 *
 * Here you will find the methods for:
 * 1. Add new Schedule-addAction.
 * 2. Update Schedule-updateAction.
 * 3. Remove Schedule-removeAction.
 * 4. Turn On/Off Schedule-activateSchedule.
 *
 * @param {MeteorMethod} insertSchedule
 * Method that validate if there is an user logged to insert a schedule to it's collection.
 * @param  {String} userId User id logged
 * @param  {Object} scheduleForm from the scheduleForm form.
 * @return {Boolean} insertSchedule Return true if the schedule was inserted correctly, false if does not.
 *
 * @param {MeteorMethod} removeSchedule
 * Method used to remove Schedules, first we check if there is an user logged in, if does then check the data integrity that comes from the form object if pass validations then validate if the schedule state is true which means is active send an error message to the user and doesn't Delete Schedule, only if the schedule is not active(turn off) delete the schedule.
 * @param  {String} schedule_id of the actual Schedule to be deleted.
 * @return {Boolean} removeSchedule Return true if the schedule was deleted correctly, false if does not.
 *
 * @param {MeteorMethod} activateSchedule
 * Method used to change the state of a Schedule, first we check if there is an user logged in, if does then check the data integrity that comes from the form object if pass validations then turn on or turn off the Schedule.
 * @param  {String} schedule_id of the actual Schedule to be activated.
 * @return {Boolean} activateSchedule Return true if the schedule was activated correctly, false if does not.
 * To activate successfully a Schedule, the user needs to has at least an email and a proxy, otherwise the user could not activate the Schedule.
 *
 * @param {MeteorMethod} Meteor general methods.
 * check() from Meteor is used to validate data integrity and be sure that the data type is the same from the collection.
 *
 */
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
			schedulef.state = false;
			return Schedules.insert(schedulef);
		}
	 },
	 removeSchedule:function(schedule_id){
		if(!this.userId){
			throw new Meteor.Error('not-authorized');
		}
		if(this.userId){
			check(schedule_id,String);

			var schedule = Schedules.findOne({
				_id:schedule_id
			});

			if(schedule.state===true){
				throw new Meteor.Error('Schedule is active, please turn off first.');
			}

			return Schedules.remove(schedule_id);
		}
	 },
	 activateSchedule:function(schedule_id,check_value){
		if(!this.userId){
			throw new Meteor.Error('not-authorized');
		}
		if(this.userId){
			check(schedule_id,String);
			check(check_value,Boolean);

			var checkUserEmails = Emails.findOne({createdBy:this.userId});
			var checkUserProxies = Proxies.findOne({createdBy:this.userId});
			if(!checkUserEmails){
				throw new Meteor.Error('You need to add an email and a proxy at least to activate the Schedule.');
			}
			if(!checkUserProxies){
				throw new Meteor.Error('You need to add a proxy at least to activate the Schedule.');
			}

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


			rule.dayOfWeek = daysArrNum;
			rule.hour = schedulehours;
			rule.minute = [schedule.awakening];

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
					_id:schedule.actions,
					createdBy:schedule.createdBy
				}
				]
			 }).map(function(c){
				return {actions:c.actions, actions:c.actions}
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
			 console.log(proxies);

			 if(check_value === true){

				/*
				 START THE NODE-SCHEDULE INSTANCE - CRON JOB SCHEDULE
				 */
				 cron.scheduleJob(schedule_id, rule, function(){
				/* Uncomment for test.
					console.log("Schedule Active", schedule.state);
					console.log(schedule_id, 'Schedule Active');
					console.log(allAccounts, 'that user accounts');
					console.log(blacklist, 'that user black list');
					console.log(whitelist, 'that user white list');
					console.log(actions, 'that user actions');
					console.log(proxies, 'that user actions');*/

					allAccounts.forEach(function (account,index) {
					/*
					toproxies variable to calculate a random proxy to be used when exec the line with the casperjs instance.
					*/
					var toproxies = Math.floor(Math.random() * proxies.length) + 1;
						var line = "";

						if(account.email.replace(/.*@/, "")=="outlook.com"){

						line = "xvfb-run casperjs ../../../../../tests/outlook/outlookactions.js --blacklist="+ JSON.stringify(whitelist)+" --whitelist="+ JSON.stringify(blacklist)+" --accounts="+ JSON.stringify(account)+" --actions="+ JSON.stringify(actions)+" --engine=slimerjs --disk-cache=no --proxy="+proxies[toproxies-1].ip+":"+proxies[toproxies-1].port +" --proxy-auth="+proxies[toproxies-1].user+":"+proxies[toproxies-1].pass+" --proxy-type="+proxies[toproxies-1].type;
						/*line = "casperjs ../../../../../tests/outlook/outlookactions.js --blacklist="+ JSON.stringify(whitelist)+" --whitelist="+ JSON.stringify(blacklist)+" --accounts="+ JSON.stringify(account)+" --actions="+ JSON.stringify(actions)+" --engine=slimerjs --disk-cache=no --proxy="+proxies[toproxies-1].ip+":"+proxies[toproxies-1].port +" --proxy-auth="+proxies[toproxies-1].user+":"+proxies[toproxies-1].pass+" --proxy-type="+proxies[toproxies-1].type;*/
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
										status:false,
										schedule_id:schedule_id,
										createdOn: new Date(),
										createdBy:this.userId,
									});
									return botcli;
								}).run(); /*END FIBER*/
							});/*END EXEC*/
						}/*END IF OUTLOOK.COM*/
						if(account.email.replace(/.*@/, "")=="yahoo.com"){
						line = "xvfb-run casperjs ../../../../../tests/yahoo/yahooactions.js --blacklist="+ JSON.stringify(whitelist)+" --whitelist="+ JSON.stringify(blacklist)+" --accounts="+ JSON.stringify(account)+" --actions="+ JSON.stringify(actions)+" --engine=slimerjs --disk-cache=no --proxy="+proxies[toproxies-1].ip+":"+proxies[toproxies-1].port +" --proxy-auth="+proxies[toproxies-1].user+":"+proxies[toproxies-1].pass+" --proxy-type="+proxies[toproxies-1].type;
					/*	line = "casperjs ../../../../../tests/yahoo/yahooactions.js --blacklist="+ JSON.stringify(whitelist)+" --whitelist="+ JSON.stringify(blacklist)+" --accounts="+ JSON.stringify(account)+" --actions="+ JSON.stringify(actions)+" --engine=slimerjs --disk-cache=no --proxy="+proxies[toproxies-1].ip+":"+proxies[toproxies-1].port +" --proxy-auth="+proxies[toproxies-1].user+":"+proxies[toproxies-1].pass+" --proxy-type="+proxies[toproxies-1].type;*/
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
					Schedules.update(schedule_id, {
						$set: { state: check_value },
					});
				}/*END IF CHECKED TRUE*/
				else {
					console.log("Schedule Inactive", schedule.state);
					myBot = cron.scheduledJobs[schedule_id];
					console.log("Schedules in queue ", myBot);
					myBot.cancel();
					Schedules.update(schedule_id, {
						$set: { state: check_value },
					});
				}
			}
		},
	});
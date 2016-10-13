/**
 * Import CasperJS module and create an instance with configurations.
 */
	/*clientScripts: ['jquery.min.js'],*/
 var casper = require("casper").create({
	clientScripts: ['../../../../../tests/jquery.min.js'],
	verbose: true,
	logLevel: "debug",
	viewportSize:
	{
		width: 1300,
		height: 700
	},
	pageSettings:
	{
		userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.97 Safari/537.11",
		proxy:'http://180.177.157.62:80',
	},
	localToRemoteUrlAccessEnabled: true,
	loadPlugins: true,
	XSSAuditingEnabled: true,
 });

 casper.on('page.error', function(msg, trace) {
	this.echo('Error: ' + msg, 'ERROR');
	for(var i=0; i<trace.length; i++) {
		var step = trace[i];
		this.echo('   ' + step.file + ' (line ' + step.line + ')', 'ERROR');
	}
 });
/**
 * Import the mouse module from the casper instance
 * @type {Module}
 */
 var mouse = require('mouse').create(casper);
/**
 * Import que selectXPath casperjs module
 * @type {Module}
 */
 var x = require('casper').selectXPath;
/**
 * Used import the casperjs utils library
 * @Module {Casperjs Utils}
 */
 var utils = require("utils");
 /**
 *	We take the args we passed from meteorjs app.
 * @Args {args}
 */
 var meteorarguments = casper.cli.args;
/**
 *	Accounts variable
 * 	The accounts array is where we save the user and password data we passed in the args when we use the meteor method.
 * @type {Array}
 */
/**
 * The Yahoo URL where login
 * @type {String}
 */
 var yahoourl = "https://login.yahoo.com/config/mail?.intl=us&.done=https%3A%2F%2Fmg.mail.yahoo.com%3A443%2Fneo%2Flaunch%3F.rand%3Degtpucj7f6kvm";
/* ,{"email":"ogeretle@outlook.com","password":"goMAD.123"},{"email":"mastercasper@outlook.com","password":"casper.123"},{"email":"tobmaps@yahoo.com","password":"12345678tm"},{"email":"tobmaps@yahoo.com","password":"12345678tm"},{"email":"tobmaps@yahoo.com","password":"12345678tm"},{"email":"tobmaps@yahoo.com","password":"12345678tm"}*/
 /*var accounts = '[{"email":"tobmaps@yahoo.com","password":"12345678tm"}]';*/
 var accounts = casper.cli.get("accounts");
 accounts = accounts.replace(/\[/g,"");
 accounts = accounts.replace(/]/g,"");
 accounts = accounts.replace(/{/g,"");
 accounts = accounts.replace(/}/g,"");
 accounts = accounts.replace(/email:/g,"");
 accounts = accounts.replace(/password:/g,"");

//for running in console
 /*accounts = accounts.replace(/"/g,"");
 accounts = accounts.replace(/:/g,"");

 accounts = accounts.replace(/email/g,"");
 accounts = accounts.replace(/password/g,"");*/
//end running in console

 accounts = accounts.split(",");
 var objAccounts=[];
 for(var i = 0;i<accounts.length;i=i+2){
	objAccounts.push({
		email:accounts[i],
		password:accounts[i+1]
	});
 }
 /*var accounts = [{user: 'tobmapx@outlook.com',pwd: 'tobMAPS-123'}];*/

/**
 *	BlackList Variable
 * The blackList array is where we save the user domains the user specified in schedule as the selected blacklist, passed in the args when we use the meteor method.
 * @type {Array}
 */
/* var blackList = '[{"domains":["yahoo.com","outlook.com"]}]';*/
 var blackList = casper.cli.get("blacklist");
 blackList = blackList.replace("[","");
 blackList = blackList.replace("]","");
 blackList = blackList.replace(/\[/g,"");
 blackList = blackList.replace(/\]/g,"");
 blackList = blackList.replace(/{/g,"");
 blackList = blackList.replace(/}/g,"");
 blackList = blackList.replace(/domains:/g,"");

//for running on console
/* blackList = blackList.replace(/"/g,"");
 blackList = blackList.replace(/:/g,"");

 blackList = blackList.replace(/domains/g,"");*/
//for running on console

 blackList = blackList.split(",");
/**
 *	WhiteList Variable
 * The whiteList array is where we save the user domains the user specified in schedule as the selected whitelist, passed in the args when we use the meteor method.
 * @type {Array}
 */
 /*var whiteList ='[{"domains":["gmail.com","hotmail.com","corderogerardo.com.ve"]}]';*/
 var whiteList = casper.cli.get("whitelist");
 whiteList = whiteList.replace("[","");
 whiteList = whiteList.replace("]","");
 whiteList = whiteList.replace(/\[/g,"");
 whiteList = whiteList.replace(/\]/g,"");
 whiteList = whiteList.replace(/{/g,"");
 whiteList = whiteList.replace(/}/g,"");
 whiteList = whiteList.replace(/domains:/g,"");

//for running on console
/* whiteList = whiteList.replace(/"/g,"");
 whiteList = whiteList.replace(/:/g,"");
 whiteList = whiteList.replace(/domains/g,"");*/
//for running on console

 whiteList = whiteList.split(",");

 /*var actions ='[{"actions":["multipleAccountsSendEmailAction","unsubscribeAction","moveSpamAction","moveInboxAction"]}]';*/
 var actions = casper.cli.get("actions");
 actions = actions.replace("[","");
 actions = actions.replace("]","");
 actions = actions.replace(/\[/g,"");
 actions = actions.replace(/\]/g,"");
 actions = actions.replace(/{/g,"");
 actions = actions.replace(/}/g,"");
 actions = actions.replace(/actions:/g,"");

//for running on console
/* actions = actions.replace(/"/g,"");
 actions = actions.replace(/:/g,"");

 actions = actions.replace(/actions/g,"");*/
//for running on console


 actions = actions.split(",");

 console.log("Data: "+accounts);
 console.log("Data: "+whiteList);
 console.log("Data: "+blackList);
 console.log("Data: "+actions);

/**
 *	We take the args we passed from meteorjs app.
 * @Args {args}
 */
 var meteorarguments = casper.cli.args;

/**
 *	Here start the Bots.
 */
 casper.start(function(self, index,objAccounts, whiteList, blackList, actions,outlookurl,yahoourl){

 });

/**
 * Here we need to think how to build the functions
 * that will contain each casperjs script or bot and how are we going to call or make use of that function
 *
 * To execute all the actions we MUST have the accounts and passwords, the black and white list of domains and the lists of actions to be performed
 *
 * To have in mind: those actions can not be executed in parallel if those are in the same instance, so they must be called just right after the other has ended and not in asynchronous way
 *
 * What are going to be asynchronous or multi-threaded the schedules executions, each schedule is going to be an instance of casperjs and the user can have multiple schedules, so as much  instances as schedules created.
 *
 * 26/09/2016 We should not filter the accounts by domain in the server method, we should pass all the accounts to the script casperjs without filtering and the casperjs script will ITERATE(actions.each or for while), we pass the definable actions to be performed by all the accounts, each account will ITERATE(actions.each or for while) over all same actions.
 * We are going to iterate over each account, take the domain account and its domain, to know the path or way to follow, then LOGIN, then ITERATE over all the actions then LOGOUT, and start again with another account.
 *
 * We need to test performance, error handling when execute multi-threaded
 */

/**
 * @summary    Login for Outlook accounts
 *
 */

 objAccounts.forEach(function(account,index){

	var results;
	var ids;
	/**
	 * Username from email to login
	 * @type {String}
	 */

	 /* var username = "tobmapx@outlook.com";*/
	 var username = account.email;
	/**
	 * Password from email to loginactions
	 * @type {[type]}
	 */
	 /* var password = "tobMAPS-123";*/
	 var password = account.password;

	casper.then(function(){
		this.wait(2000);
	});
	casper.thenOpen(yahoourl, function() {
	/**
	 * Casper.then we add a new navigation step to the bot.
	 */
	 casper.then(function(){
		/**
		 * With Casper.fill method we send the email values of the form
		 * @type {String}
		 */
		 casper.fill('form[id="mbr-login-form"]', {
			username : username
		 }, false);
		});
		/**
		 * waitForSelector Waits until the form-login button element selector expression does not exist in remote DOM to process a next step
		 */
		 this.waitForSelector("form#mbr-login-form button[type=submit][value='authtype']", function() {
			this.click("form#mbr-login-form button[type=submit][value='authtype']");
			this.wait(6000);
		 });

		 casper.then(function(){
	/**
	* With Casper.fill method we send the password values of the form
	* @type {String}
	*/
	casper.fill('form[id="mbr-login-form"]', {
		passwd : password
	}, true);
	this.wait(10000);
});
casper.then(function(){

 /**
	* Loop with all actions
	*/
	actions.forEach(function(action,index){
		if(action == 'moveSpamAction'){
			console.log("Here enter to MOVESPAM Yahoo WORKS");
			moveSpamMessagesYahoo(whiteList);
		}
		if(action == 'unsubscribeAction'){
			console.log("Here enter to unsubscribe yahoo");
			unsubscribeYahoo(whiteList);
		}
		if(action == 'multipleAccountsSendEmailAction'){
			console.log("Here enter to SendManyMAils yahoo TEST");
			sendManyMessagesYahoo();
		}
		if(action == 'moveInboxAction'){
			console.log("Here enter to MOVEINBOX, out of Junk/spam, yahoo WORKS");
			moveInboxMessagesYahoo(blackList);
		}
		/*** end loop actions ***/
	});
});


	 /**
	 * waitForSelector waits for the div.not-you selector associate to logout button.
	 * then when the button loads we click the logout function
	 */

	 casper.then(function(){
		this.waitForSelector("a[aria-label='Profile']", function(){
			this.click("a[aria-label='Profile']");
		});
	 });

	 casper.then(function(){
		this.wait(5000);
	 });

	 casper.then(function(){
		this.waitForText("Sign out",function(){
			this.clickLabel("Sign out");
		});
	 }); casper.then(function(){
		this.wait(10000);
	 });
	 this.thenOpen('https://login.yahoo.com/config/login/?.crumb=/FQbWwV4wmK&logout=1&.direct=1&.done=https://www.yahoo.com/&logout_all=1',function(){
		});
	 casper.then(function(){
		this.wait(10000);
	 });

});// End casper.then function

}); /*End accounts.each*/

/**
 *
 * @summary     START YAHOO FUNCTIONS
 * START YAHOO FUNCTIONS
 *
 */
/** Functions with the actions for yahoo accounts */

function moveSpamMessagesYahoo(whiteList) {
	casper.then(function(){
		this.waitForText("Inbox", function() {
			this.clickLabel("Inbox");
			this.wait(5000);
		});
	});

	/**
	 *	Casper.then we add a new navigation step to the bot.
	 *	We iterate over all emails messages and save their ids, title and checkbox status
	 */
	var messagesSpam;
	casper.then(function(){
		/**
		 *	Casper.evaluate - Evaluates an expression in the current page DOM context - This case we iterate over all the messages in the inbox folder of the yahoo email account and save their ids in array ids.
		 * @type {Array objects}
		 */
		messagesSpam = this.evaluate(function(){
			ids = [];
			/**
			 * Jquery.Each function.
			 * @return {Object}
			 */
			$.each($("div.list-view-item"), function(x,y){
				ids.push({
					message_id: $(this).attr("id"),
					email: $('div.from', this).attr("title"),
					data_cid: $('input[title="Checkbox, not checked"]', this).attr("data-cid")
				});
			});
			return ids;
		});
		utils.dump(messagesSpam);
	});

	/**
	 * Casper.then we add a new navigation step to the bot.
	 */
	casper.then(function(){
		/**
		 * Casper.each method to Iterates over messagesSpam array items and execute a callback
		 * @return {[type]}
		 */
		this.each(messagesSpam, function(self, obj){
			var tag = false;
			self.then(function(){
				this.each(whiteList, function(self, white){
					if(obj.email.replace(/.*@/, "") == white){
						tag = true;
					}
				});
				if (tag == false) {
					this.click('input[data-cid="'+obj.data_cid+'"]');
				}
			});
		});

		casper.waitForSelector("button[id='main-btn-spam']", function() {
			this.click("button[id='main-btn-spam']");
			this.wait(20000);
		});
	});

	casper.then(function(){
		this.wait(5000);
	});
}

function moveInboxMessagesYahoo(blackList){
	casper.then(function(){
		this.waitForText("Spam", function() {
			this.clickLabel("Spam");
			this.wait(10000);
		});
	});
		/**
		 *	Casper.then we add a new navigation step to the bot.
		 *	We iterate over all emails messages and save their ids, title and checkbox status
		 */
	var messagesSpam;
	casper.then(function(){
			/**
			 *	Casper.evaluate - Evaluates an expression in the current page DOM context - This case we iterate over all the messages in the inbox folder of the yahoo email account and save their ids in array ids.
			 * @type {Array objects}
			 */
		messagesSpam = this.evaluate(function(){
			ids = [];
			/**
			 * Jquery.Each function.
			 * @return {Object}
			 */
			 $.each($("div.list-view-item"), function(x,y){
				ids.push({
					message_id: $(this).attr("id"),
					email: $('div.from', this).attr("title"),
					data_cid: $('input[title="Checkbox, not checked"]', this).attr("data-cid")
				});
			 });
			 return ids;
		});
		utils.dump(messagesSpam);
	});

		/**
		 * Casper.then we add a new navigation step to the bot.
		 */
	casper.then(function(){
			/**
			 * Casper.each method to Iterates over messagesSpam array items and execute a callback
			 * @return {[type]}
			 */
		this.each(messagesSpam, function(self, obj){
			var tag = false;
			self.then(function(){
				this.each(blackList, function(self, black){
					if(obj.email.replace(/.*@/, "") == black){
						tag = true;
					}
				});
				if (tag == false) {
					this.click('input[data-cid="'+obj.data_cid+'"]');
				}
			});
		});

		casper.waitForSelector("button[id='btn-not-spam']", function() {
			this.click("button[id='btn-not-spam']");
			this.wait(20000);
		});
	});

	casper.then(function(){
		this.wait(10000);
	});
}

function unsubscribeYahoo(whiteList){
	casper.then(function(){
		this.waitForText("Inbox", function() {
			this.clickLabel("Inbox");
		});
	this.wait(5000);
	});

	var messages;
	casper.then(function(){
		messages = this.evaluate(function(){
			ids = [];
			$.each($("div.list-view-item"), function(x,y){
				ids.push({
					message_id: $(this).attr("id"),
					email: $('div.from', this).attr("title")
				});
			});
			return ids;
		});
	});

	casper.then(function(){
		this.each(messages, function(self, obj){
			var tag = false;
			self.then(function(){
				if(whiteList.indexOf(obj.email.replace(/.*@/, ""))!=-1){
						tag = true;
				}
				if (tag == true) {
					this.click('div[id="'+obj.message_id+'"]');
					this.wait(3000);
					casper.then(function(){
						this.evaluate(function(){
							$.each($("div.thread-body a"), function(){
								if($(this).text() != "unsubscribe"){
									this.click();
								}
							});
						});
						this.wait(2000);
					});
					casper.then(function(){
						this.waitForText("Inbox", function() {
							this.clickLabel("Inbox");
						});
						this.wait(4000);
					});
				}
			});
		});
	});
}

function ramdomLinksMessagesYahoo(whiteList){
	casper.then(function(){
		this.waitForText("Inbox", function() {
			this.clickLabel("Inbox");
		});
		this.wait(2000);
	});

	var messages;
	casper.then(function(){
		messages = this.evaluate(function(){
			ids = [];
			$.each($("div.list-view-item"), function(x,y){
				ids.push({
					message_id: $(this).attr("id"),
					email: $('div.from', this).attr("title")
				});
			});
			return ids;
		});
	});

	casper.then(function(){
		this.echo("Messages: "+messages);
		this.each(messages, function(self, obj){
			var tag = false;
			this.echo("Message: "+obj);
			this.then(function(){
				this.echo("Print whiteList "+whiteList);
				this.echo("Print domain "+obj.email.replace(/.*@/, ""));
				this.echo("Print is on whiteList "+whiteList.indexOf(obj.email.replace(/.*@/, "")));
				if(whiteList.indexOf(obj.email.replace(/.*@/, ""))!=-1){
						tag = true;
				}
				if (tag == false) {
					this.click('div[id="'+obj.message_id+'"]');
					this.wait(3000);
					casper.then(function(){
						this.evaluate(function(){
							$.each($("div.thread-body a"), function(self,indx){
								self = this;
								if((Math.floor((Math.random() * 2) + 1)) == 1){
									alert("this this"+this);
									self.click();
								}
							});
						});
						this.wait(2000);
					});
					casper.then(function(){
						this.waitForText("Inbox", function() {
							this.clickLabel("Inbox");
						});
						this.wait(4000);
					});
				}
			});
		});
	});
}

function sendManyMessagesYahoo(){
	casper.then(function(){
		this.wait(2000);
	});
	casper.repeat(3, function(){

		casper.then(function(){
			this.waitForText("Compose", function() {
				this.clickLabel("Compose");
			});
		this.wait(2000);
		});
		casper.then(function(){

			casper.waitForSelector("input[name='to-field']", function() {
			this.click("input[name='to-field']");
		});
		});

		casper.then(function(){
			this.wait(200);
		});
		casper.then(function(){
			var toaccount = Math.floor(Math.random() * objAccounts.length) + 1;
			casper.waitForSelector("input[name='to-field']", function() {
				this.sendKeys("input[name='to-field']",""+objAccounts[toaccount-1].email+" ");
			});
		});

		casper.then(function(){
			this.wait(200);
		});
		casper.then(function(){
			casper.waitForSelector("input[id='subject-field']", function() {
				this.click("input[id='subject-field']");
			});
		});
		casper.then(function(){
			this.wait(200);
		});
		casper.then(function(){
			casper.waitForSelector("input[id='subject-field']", function() {
				this.sendKeys("input[id='subject-field']", "Send Message with links ");
			});
		});

		casper.then(function(){
			this.wait(200);
		});
		casper.then(function(){
			casper.waitForSelector("div[id='rtetext']", function() {
				this.click("input[id='rtetext']");
			});
		});
		casper.then(function(){
			this.wait(200);
		});
		casper.then(function(){
			casper.waitForSelector("div[id='rtetext']", function() {
				this.sendKeys("div[id='rtetext']", "http://casperjs.org/ \n");
				this.sendKeys("div[id='rtetext']", "https://slimerjs.org/ \n");
			});
		});
		casper.then(function(){
			this.wait(2000);
		});

		casper.then(function(){
			this.waitForText("Send", function() {
				this.clickLabel("Send");
			});
		});
		casper.then(function(){
			this.wait(4000);
		});

	});
}

/**
 * Runs the whole suite of steps and optionally executes a callback when they’ve all been done.
 * calling this method is mandatory in order to run the Casper navigation suite.
 */
 casper.run(function(){
	this.exit();
 });
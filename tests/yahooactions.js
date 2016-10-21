/**
 * @memberof Bots
 * @name Yahoo
 * @locus	tests/
 * @summary Import CasperJS module and create an instance with configurations.
 * Here you will find the function or Actions that will perform the bot for Yahoo emails.
 *
 * 1. Set up casperjs and create the configuration for the instance.
 * 2. Imports Libraries for mouse, SelectXPath, utils, cli.
 * 3. From TobMaps MeteorJS APP we pass arguments(args), to this bot, casper.cli.args;
 * 4. Create the outlookurl variable.  The outlook URL where login.
 * 5. Emails and Passwords: Take the casper.cli.args accounts that we passed from MeteorAPP, casper.cli.get("accounts"), and clean the data received.
 * 6. BlackList: The blackList array is where we save the user domains the user specified in schedule as the selected blacklist, passed in the args when we use the meteor method, casper.cli.get("blacklist").
 * 7. WhiteList: The whiteList array is where we save the user domains the user specified in schedule as the selected whitelist, passed in the args when we use the meteor method, casper.cli.get("whitelist").
 * 8. Actions: The actions array variable is where we save the actions that the user has specified in schedule as the selected actions, passed in the args when we use the meteor method, casper.cli.get("actions").
 * 9. We take the args we passed from meteorjs app.
 *
 *
 * @param {casper} start
 * Step one: We start the casper instance and pass the data we received from Meteor TobMaps App.
 * Take the objAccounts array of objects and iterate if there are more than one email account and password.
 * In this case the instance only should receive one email and password.
 *
 * @param {casper} thenOpen
 * Step two: the thenOpen function receive an url as parameter, the outlook website to be requested and where the bot is going to login with the email and password. Once the website loads successfully, we send the account email data and password and click on login/submit to login.
 *
 * @param {casper} then
 * Step three: then we receive all the actions defined by the user and iterate all those actions in the order they came.
 * IMPORTANT: Each action is a function defined in this file.
 * @param {function} moveSpamMessagesOutlook
 * This function receive as param a the blackList that the user selected for the schedule.
 * This function needs another function that perform click on Outlook INBOX before of been executed.
 * The function needs to be located in the INBOX folder of outlook to take the data and work correctly.
 * CasperJS Step to iterate over the ids messages, search the email's sender in the message and extract the domain, if the domain match with a given blacklisted domain move the message to the Junk or Spam folder.
 *
 * @param {function} moveInboxMessagesOutlook
 * This function receive as param a the whiteList- that the user selected for the schedule.
 * This function needs another function that perform click on Outlook SPAM Folder before of been executed.
 * The function needs to be located in the SPAM folder of outlook to take the data and work correctly.
 * CasperJS Step to iterate over the ids emails search the email and extract the domain, if the domain match with a given blacklisted domain move the email to the Junk or Spam folder.
 *
 * @param {function} sendManyMessagesOutlook
 *This function work as follows:
 * 1.perform click on New for send a new Message, that opens the form to send a message.
 * 2.Wait for elements in the form to load correctly to send the email in the TO input. then fill the subject, the main message.
 * 3. then wait for the label "Send", and click on the button called send to send the message.
 *
 *
 * @param {function} dontClickUnsubscribeOutlook
 * This function receive as params the white and black Lists that the user selected for the schedule.
 * This function iterate over all the messages in the INBOX folder. Make click over each message, then perform a click over the title or name of the sender message to look for the email. Once it has gotten the email take the email domain. With the domain search if the domain is in the white or black list with a javascript native function indexOf, this returns -1 if is not, >0 if it is.
 * Then with those values follow a some steps, for example if the domain is in the white list the bot search for all the links <a> tags in the message, if the <a> tag has the text unsubscribe and the domain is in the white list this is ignored, if not then it is clicked by the bot. The case where the domain is not on the white or black list, the decision of making click is taken randomly.
 *
 *
 * @param {functions} MoreFunctions
 *
 * @param {function} takeIdsInboxOutlook
 * This function search and extract all the messages ID's on the Inbox Folder. The messages ids are different to the spam folder.
 * I separate this function because is used in other function and it was more maintainable to separate it. So if there are some changes in the Outlook Website in this specific function, the developer/programmer only needs to change this function.
 *
 * @param {function} takeIdsSpamOutlook
 * This function search and extract all the messages ID's on the Spam Folder. The messages ids are different to the Inbox folder.
 * I separate this function because is used in other function and it was more maintainable to separate it. So if there are some changes in the Outlook Website in this specific function, the developer/programmer only needs to change this function.
 *
 * @param {functions} forClickDifferentOptions
 * 1. clickInboxOutlook for click on the inbox outlook menu option.
 * 1. clickDraftsOutlook for click on the Draft outlook menu option.
 * 1. clickSentItemsOutlook for click on the SentItems outlook menu option.
 * 1. clickDeletedItemsOutlook for click on the DeletedItems outlook menu option.
 * 1. clickArchiveOutlook for click on the Archived outlook menu option.
 * 1. clickJunkOutlook for click on the Junk outlook menu option.
 * 1. logoutOutlook for logout from outlook.
 *
 *
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
 var mouse = require('mouse').create(casper);
 var x = require('casper').selectXPath;
 var utils = require("utils");
 var meteorarguments = casper.cli.args;
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

var meteorarguments = casper.cli.args;

casper.start(function(self, index,objAccounts, whiteList, blackList, actions,outlookurl,yahoourl){

 });

 objAccounts.forEach(function(account,index){

	var results;
	var ids;

	 /* var username = "tobmapx@outlook.com";*/
	 var username = account.email;

	 /* var password = "tobMAPS-123";*/
	 var password = account.password;

	casper.then(function(){
		this.wait(2000);
	});
	casper.thenOpen(yahoourl, function() {

	 casper.then(function(){
		 casper.fill('form[id="mbr-login-form"]', {
			username : username
		 }, false);
		});

		 this.waitForSelector("form#mbr-login-form button[type=submit][value='authtype']", function() {
			this.click("form#mbr-login-form button[type=submit][value='authtype']");
			this.wait(6000);
		 });

		 casper.then(function(){

	casper.fill('form[id="mbr-login-form"]', {
		passwd : password
	}, true);
	this.wait(10000);
});
casper.then(function(){


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

function moveSpamMessagesYahoo(whiteList) {
	casper.then(function(){
		this.waitForText("Inbox", function() {
			this.clickLabel("Inbox");
			this.wait(5000);
		});
	});

	var messagesSpam;
	casper.then(function(){

		messagesSpam = this.evaluate(function(){
			ids = [];

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


	casper.then(function(){

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

	var messagesSpam;
	casper.then(function(){

		messagesSpam = this.evaluate(function(){
			ids = [];

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


	casper.then(function(){

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

 casper.run(function(){
	this.exit();
 });
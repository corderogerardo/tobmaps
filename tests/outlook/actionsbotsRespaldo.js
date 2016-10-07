/**
 * Import CasperJS module and create an instance with configurations.
 */
 var casper = require("casper").create({
	clientScripts: ['jquery.min.js'],
	/*clientScripts: ['../../../../../tests/jquery.min.js'],*/
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
 * The outlook URL where login
 * @type {String}
 */
 var outlookurl = "https://login.live.com/login.srf?wa=wsignin1.0&ct=1469453425&rver=6.6.6556.0&wp=MBI_SSL&wreply=https:%2F%2Foutlook.live.com%2Fowa%2F&id=292841&CBCXT=out";
/**
 * The Yahoo URL where login
 * @type {String}
 */
 var yahoourl = "https://login.yahoo.com/config/mail?.intl=us&.done=https%3A%2F%2Fmg.mail.yahoo.com%3A443%2Fneo%2Flaunch%3F.rand%3Degtpucj7f6kvm";
 /**
 * The Gmail URL where login
 * @type {String}
 */
 var gmailurl = "https://login.live.com/login.srf?wa=wsignin1.0&ct=1469453425&rver=6.6.6556.0&wp=MBI_SSL&wreply=https:%2F%2Foutlook.live.com%2Fowa%2F&id=292841&CBCXT=out";
 /**
 * The AOL URL where login
 * @type {String}
 */
 var aolurl = "https://login.live.com/login.srf?wa=wsignin1.0&ct=1469453425&rver=6.6.6556.0&wp=MBI_SSL&wreply=https:%2F%2Foutlook.live.com%2Fowa%2F&id=292841&CBCXT=out";

 /*var accounts = casper.cli.get("accounts");*/
/* ,{"email":"ogeretle@outlook.com","password":"goMAD.123"},{"email":"mastercasper@outlook.com","password":"casper.123"},{"email":"tobmaps@yahoo.com","password":"12345678tm"},{"email":"tobmaps@yahoo.com","password":"12345678tm"},{"email":"tobmaps@yahoo.com","password":"12345678tm"},{"email":"tobmaps@yahoo.com","password":"12345678tm"}*/
 var accounts = '[{"email":"tobmapx@outlook.com","password":"tobMAPS-123"}]';
 accounts = accounts.replace(/\[/g,"");
 accounts = accounts.replace(/]/g,"");
 accounts = accounts.replace(/{/g,"");
 accounts = accounts.replace(/}/g,"");
 accounts = accounts.replace(/email:/g,"");
 accounts = accounts.replace(/password:/g,"");

//for running in console
 accounts = accounts.replace(/"/g,"");
 accounts = accounts.replace(/:/g,"");

 accounts = accounts.replace(/email/g,"");
 accounts = accounts.replace(/password/g,"");
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
 var blackList = '[{"domains":["yahoo.com","outlook.com"]}]';
 /*var blackList = casper.cli.get("blacklist");*/
 blackList = blackList.replace("[","");
 blackList = blackList.replace("]","");
 blackList = blackList.replace(/\[/g,"");
 blackList = blackList.replace(/\]/g,"");
 blackList = blackList.replace(/{/g,"");
 blackList = blackList.replace(/}/g,"");
 blackList = blackList.replace(/domains:/g,"");

//for running on console
 blackList = blackList.replace(/"/g,"");
 blackList = blackList.replace(/:/g,"");

 blackList = blackList.replace(/domains/g,"");

 blackList = blackList.split(",");
/**
 *	WhiteList Variable
 * The whiteList array is where we save the user domains the user specified in schedule as the selected whitelist, passed in the args when we use the meteor method.
 * @type {Array}
 */
 var whiteList ='[{"domains":["gmail.com","hotmail.com","corderogerardo.com.ve"]}]';
 /*var whiteList = casper.cli.get("whitelist");*/
 whiteList = whiteList.replace("[","");
 whiteList = whiteList.replace("]","");
 whiteList = whiteList.replace(/\[/g,"");
 whiteList = whiteList.replace(/\]/g,"");
 whiteList = whiteList.replace(/{/g,"");
 whiteList = whiteList.replace(/}/g,"");
 whiteList = whiteList.replace(/domains:/g,"");

//for running on console
 whiteList = whiteList.replace(/"/g,"");
 whiteList = whiteList.replace(/:/g,"");

 whiteList = whiteList.replace(/domains/g,"");

 whiteList = whiteList.split(",");

 var actions ='[{"actions":["multipleAccountsSendEmailAction","unsubscribeAction","moveSpamAction","moveInboxAction"]}]';
 /*var actions = casper.cli.get("actions");*/
 actions = actions.replace("[","");
 actions = actions.replace("]","");
 actions = actions.replace(/\[/g,"");
 actions = actions.replace(/\]/g,"");
 actions = actions.replace(/{/g,"");
 actions = actions.replace(/}/g,"");
 actions = actions.replace(/actions:/g,"");

//for running on console
 actions = actions.replace(/"/g,"");
 actions = actions.replace(/:/g,"");

 actions = actions.replace(/actions/g,"");

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

	 if(username.replace(/.*@/, "")=="outlook.com"){

		casper.then(function(){
			this.wait(2000);
		});

		casper.thenOpen(outlookurl,function(){
			this.echo("You're in CASPER.THENOPEN");
		/**
		 * With Casper.fill method we send the username values of the form
		 * With Casper.fill method we send the password values of the form
		 * @type {String}
		 */
		 this.fill('form[name="f1"]',
		 {
			//tobmaps@yahoo.com
			//spamBOT-12345678
			loginfmt: username,
			passwd: password
		},true);
		 this.wait(10000);
		});

// HERE IS GOING TO BE CALLED THE FUNCTIONS MODULES IMPORTED
// Iterate over all the actions to activate them
casper.then(function(){
	actions.forEach(function(action,index){
		if(action=="moveSpamAction"){
			console.log("Here enter to MOVESPAM outlook");
			clickInboxOutlook();
			takeIdsInboxOutlook();
			moveSpamMessagesOutlook(blackList);
		}
		if(action=="moveInboxAction"){
			console.log("Here enter to MOVEINBOX, out of Junk/spam");
			clickJunkOutlook();
			takeIdsSpamOutlook();
			moveInboxMessagesOutlook(whiteList);
		}
		if(action=="multipleAccountsSendEmailAction"){
			console.log("Here enter to SendManyMAils");
			clickInboxOutlook();
			sendManyMessagesOutlook();
		}
		if(action== "unsubscribeAction"){
			console.log("Here enter to unsubscribe");
			clickInboxOutlook();
			takeIdsInboxOutlook();
			dontClickUnsubscribeOutlook(whiteList,blackList);
		}
	});/*end forEach*/
});
/**	this.wait(10000);
 * @summary    Logout for outlook
 * If statement to check if is the last action then check account domain and logout
 * @param  {String} accountDomain type of account domain
 * @return {[type]}               [description]
 */
 clickJunkOutlook();
 clickDraftsOutlook();
 clickDeletedItemsOutlook();
 clickArchiveOutlook();
 clickInboxOutlook();
 logoutOutlook();
}/*End IF accountDomain===outlook*/
if(username.replace(/.*@/, "") == 'yahoo.com'){
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
}
/*End IF accountDomain===yahoo*/
}); /*End accounts.each*/

/**
 *
 * @summary    START OUTLOOK FUNCTIONS
 * START OUTLOOK FUNCTIONS
 *
 */
function takeIdsInboxOutlook(){
	results=[];
	casper.then(function(){
		results = casper.evaluate(function(){
			ids = [];
		/**
		 * Jquery.Each function.
		 * @return {Array}
		 */
		 $.each($("div[aria-label='conversation'] > div > div > div > div > div"),function(x,y){
			/* $.each($("div[autoid='_lvv_9'] > div"),function(x,y){*/
				ids.push($(y).attr("id"));
			});
		 return ids;
		});
	});

	casper.then(function(){
		this.echo("Mails ID: "+JSON.stringify(results));
	});
}/*End function takeIdsInboxOutlook*/

function takeIdsSpamOutlook(){
	results=[];
	casper.then(function(){
		results = this.evaluate(function(){
			ids = [];
			$.each($("div[aria-label='item'] > div > div > div > div > div"),function(x,y){
				ids.push($(y).attr("id"));
			});
			return ids;
		});
		utils.dump(results);
		this.wait(2000);
	});
	casper.then(function(){
		this.echo("Mails ID: "+JSON.stringify(results));
	});
}/*End function takeIdsInboxOutlook*/
function clickInboxOutlook(){
	casper.then(function(){
		this.waitForText("Inbox", function(){
			this.clickLabel("Inbox");
		});
		this.wait(3000);
		/*this.capture("ClickToJunt");*/
	});
}
function clickDraftsOutlook(){
	casper.then(function(){
		this.waitForText("Drafts", function(){
			this.clickLabel("Drafts");
		});
		this.wait(3000);
		/*this.capture("ClickToJunt");*/
	});
}
function clickSentItemsOutlook(){
	casper.then(function(){
		this.waitForText("Sent Items", function(){
			this.clickLabel("Sent Items");
		});
		this.wait(3000);
		/*this.capture("ClickToJunt");*/
	});
}
function clickDeletedItemsOutlook(){
	casper.then(function(){
		this.waitForText("Deleted Items", function(){
			this.clickLabel("Deleted Items");
		});
		this.wait(3000);
		/*this.capture("ClickToJunt");*/
	});
}
function clickArchiveOutlook(){
	casper.then(function(){
		this.waitForText("Archive", function(){
			this.clickLabel("Archive");
		});
		this.wait(3000);
		/*this.capture("ClickToJunt");*/
	});
}
function clickJunkOutlook(){
	casper.then(function(){
		this.waitForText("Junk Email", function(){
			this.clickLabel("Junk Email");
		});
		this.wait(3000);
		/*this.capture("ClickToJunt");*/
	});
}
function logoutOutlook(){
	/*https://outlook.live.com/owa/logoff.owa*/
	/*https://login.live.com/logout.srf?ct=1475252818&rver=6.4.6456.0&lc=8202&id=64855&ru=https:%2F%2Fblu183.mail.live.com%2Fhandlers%2FSignout.mvc%3Fservice%3DLive.Mail%26mkt%3Des-ve&mkt=es-ve*/
	casper.then(function(){
		this.waitForSelector("button[autoid='__Microsoft_O365_ShellG2_MeTile_Owa_templates_cs_0']", function(){
			this.click("button[autoid='__Microsoft_O365_ShellG2_MeTile_Owa_templates_cs_0']");
		});
	});
	casper.then(function(){
		this.wait(1000);
	});
	casper.then(function(){
		this.waitForText("Sign out",function(){
			this.clickLabel("Sign out");
		});
	});
	casper.thenOpen("https://outlook.live.com/owa/logoff.owa",function(){
		this.echo("logout yes");
	});
	casper.then(function(){
		this.wait(10000);
	});
}

function moveSpamMessagesOutlook(blackList){
/**
 * CasperJS Step to iterate over the ids emails search the email and extract the domain, if the domain match with a given blacklisted domain move the email to the Junk or Spam folder..
 */
 casper.then(function(){
	email="";
	domain="";
	emails = [];
	casper.each(results, function iterateids(self,id,index){
		self.then(function thenIterate(){
			casper.echo("Count "+(results.length-1));
			casper.echo('index '+index);
			casper.echo('#'+id+' > div');
			casper.click('#'+id+' > div');
			casper.mouse.click('#'+id+' > div');
			/*this.mouse.click('div[id="'+id+'"] > div > span[autoid="_lvv_j"]');*/
		});
		self.wait(5000);
		self.then(function(){
			this.mouse.click('span[class="bidi allowTextSelection"]');
			this.wait(5000);
			/*email = this.fetchText("a[class='_rpc_i1 o365button'] > span ");*/
		email = this.fetchText("a[class='_rpc_i1 o365button'] > span ");
		this.echo("Email "+email);
		email = email.slice(18,email.length);
			emails.push(email);
			domain = email.replace(/.*@/, "");
			this.echo("Email: "+email+" Domain: "+domain+" Emails: "+emails+ " BlackList: "+blackList);

		/**
		 * Casper.waitForSelector wait to the email document appear so I can click over the message and extract the email and find the domain.
		 */
		 this.waitForSelector("div[role='document']",function(){
			/*this.waitForSelector("div[role='document']",function(){*/
				this.mouse.click('span[class="bidi allowTextSelection"]');

				this.wait(5000);
				/*blacklist = blacklist.split(",");*/
				this.echo("BlackList of casper args: "+ blackList);
		/**
		 * If the domain is in the blacklist I click to Junk to move to junk folder.
		 * @param  {Number} blacklist.indexOf(domain)! indexOf Method to know if in the blacklist or not.
		 */
		 if(blackList.indexOf(domain)!=-1){
			this.clickLabel("Junk");
		 }
		});
		});

	});
 });
 casper.then(function(){
	this.wait(10000);
 });
}/*End function moveSpamMessagesOutlook*/
function moveInboxMessagesOutlook(whiteList){
	email="";
	domain="";
	emails = [];
	casper.then(function(){
		this.each(results, function iterateids(self,id){
			casper.then(function thenIterate(){
				this.echo('div[id="'+id+'"] > div');
				this.click('div[id="'+id+'"] > div');
				/*this.mouse.click('div[id="'+id+'"] > div > span[autoid="_lvv_j"]');*/
				casper.wait(5000);
			});
			casper.then(function(){
				this.mouse.click('span[class="bidi allowTextSelection"]');
				this.wait(5000);
					this.waitForSelector("div[role='document']",function(){
					this.mouse.click('span[class="bidi allowTextSelection"]');
					this.wait(5000);
				email = this.fetchText("a[class='_rpc_i1 o365button'] > span ");
		this.echo("Email "+email);
		email = email.slice(18,email.length);
		domain = email.replace(/.*@/, "");
					emails.push(email);
					domain = email.replace(/.*@/, "");
					this.wait(2000);
					this.echo("Email: "+email+" Domain: "+domain+" Emails: "+emails+ " WhiteList: "+whiteList);
					this.wait(5000);
					this.echo("WhiteList of casper args: "+ whiteList);
					if(whiteList.indexOf(domain)!=-1){
						this.clickLabel("Not junk");
						countOutJunk++;
					}
				});
			});
		});
	});

	casper.then(function(){
		this.wait(10000);
	});
}/*End function moveInboxMessagesOutlook*/
function sendManyMessagesOutlook(){
	casper.repeat(3,function(){
		casper.then(function(){
			this.waitForText("New", function(){
				this.clickLabel("New");
			});
			this.wait(2000);
		});

		casper.then(function(){
			this.waitForText("To", function(){
				var toaccount = Math.floor(Math.random() * objAccounts.length) + 1;
				this.sendKeys("input[aria-label='To recipients. Enter an email address or a name from your contact list.']",""+ objAccounts[toaccount-1].email+" ", {keepFocus: true});
				this.sendKeys("input[aria-label='To recipients. Enter an email address or a name from your contact list.']", casper.page.event.key.Enter , {keepFocus: true});
				this.page.sendEvent("keypress", casper.page.event.key.Enter);
				this.echo("send press enter to page");
				this.wait(1000);
			});
		});


		casper.then(function(){
			this.waitForText("To",function(){
				this.sendKeys("input[placeholder='Add a subject']", "this is killerbox");
				this.wait(1000);
			});
		});

		casper.then(function(){
			this.waitForText("To", function(){
				this.sendKeys("div[aria-label='Message body']","http://example.me \n");
			});
		});

		casper.then(function(){
			this.waitForText("To", function(){
				this.sendKeys("div[aria-label='Message body']", 'http://paisajeweb.com.ve ', {keepFocus: true});
				this.sendKeys("div[aria-label='Message body']", casper.page.event.key.Enter , {keepFocus: true});
				this.page.sendEvent("keypress", casper.page.event.key.Enter);
				this.echo("send press enter to page");
				this.wait(1000);
			});
		});

		casper.then(function(){
			this.waitForText("Send", function(){
				this.clickLabel("Send");
			});
			this.wait(2000);
		});
	});/*Casper.repeat*/
}/*End function sendManyMessagesOutlook*/
function dontClickUnsubscribeOutlook(whiteList,blackList){
casper.then(function(){
	email="";
	domain="";
	emails = [];
this.each(results, function(self,id){
	self.then(function(){
		this.echo('div[id="'+id+'"]');
		this.click('div[id="'+id+'"] > div');
		});
		this.wait(2000);
		this.mouse.click('span[class="bidi allowTextSelection"]');
		email = this.fetchText("a[class='_rpc_i1 o365button'] > span ");
		this.echo("Email "+email);
		email = email.slice(18,email.length);
		domain = email.replace(/.*@/, "");
		this.then(function(){
			this.wait(2000);
			this.mouse.click('span[class="bidi allowTextSelection"]');
			email = this.fetchText("a[class='_rpc_i1 o365button'] > span ");
			email = email.slice(18,email.length);
			domain = email.replace(/.*@/, "");

			this.waitForSelector("div[role='document']",function(){
				this.mouse.click('span[class="bidi allowTextSelection"]');
				this.wait(5000);
				email = this.fetchText("a[class='_rpc_i1 o365button'] > span ");
				email = email.slice(18,email.length);
				emails.push(email);
				domain = email.replace(/.*@/, "");
				this.wait(5000);
				this.echo("Email: "+email+" Domain: "+domain+" Emails: "+emails+ " WhiteList: "+whiteList+ " BlackList: "+blackList);
				this.wait(5000);

				var isOnWhiteList = whiteList.indexOf(domain);
				var isOnBlackList = blackList.indexOf(domain);

				this.evaluate(function(isOnWhiteList, isOnBlackList){
					alert("Evaluate - White: "+isOnWhiteList+" Black: "+isOnBlackList);
					$.each($("div[role='document'] a"), function(self,link){
						self = this;
						alert("WhiteList: "+isOnWhiteList+" blacklist: "+isOnBlackList);
						if(  $.trim( $(self).text() ) === 'unsubscribe') {
							if(isOnWhiteList != -1){
								alert("Is in white list I dont click unsubscribe");
							}else{
								alert("Not in white list");
								alert(isOnBlackList);
								if(isOnBlackList!= -1){
									alert("In black list I click unsubscribe");
									this.click(self);
								}else{
									alert("Not in white and black list I click it then");
									var decide = Math.floor(Math.random() * 2) + 1;
									if(decide === 1){
										alert("Value to decide action: "+decide);
										this.click(self);
									}else{
										alert("Value to decide action: "+decide);
									}
								}
							}
						}else{
							alert($.trim( $(self).text() ));
							this.click($(self));
						}
					});
				},isOnWhiteList, isOnBlackList);
				this.wait(5000);

			});
			this.wait(2000);
		});
	});
});
casper.then(function(){
this.wait(5000);
});
}
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
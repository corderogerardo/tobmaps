var outlookcasper = require('moveSpamAction');
/**
 * Oulook Casper's Bot used to login into account and move
 * @type {CasperJS Bot}
 */

/**
 * Import CasperJS module and create an instance with configurations.
 */
	/*clientScripts: ['jquery.min.js'],*/
	/*clientScripts: ['../../../../../tests/jquery.min.js'],*/
 var casper = require("casper").create({
	clientScripts: ['jquery.min.js'],
	verbose: true,
	logLevel: "debug",
	viewportSize:
	{
		width: 1300,
		height: 700
	},
	pageSettings:
	{
		userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.97 Safari/537.11"
	},
	localToRemoteUrlAccessEnabled: true,
	loadPlugins: true,
	XSSAuditingEnabled: true
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
 var yahoourl = "https://login.live.com/login.srf?wa=wsignin1.0&ct=1469453425&rver=6.6.6556.0&wp=MBI_SSL&wreply=https:%2F%2Foutlook.live.com%2Fowa%2F&id=292841&CBCXT=out";
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
var accounts = '[{"email":"test@gmail.com","password":"test123"},{"email":"test2@gmail.com","password":"test1234"},{"email":"test3@gmail.com","password":"test1234"},{"email":"test4@gmail.com","password":"test1234"},{"email":"test5@gmail.com","password":"test1234"},{"email":"test6@gmail.com","password":"test1234"},{"email":"test7@gmail.com","password":"test1234"},{"email":"test8@gmail.com","password":"test1234"},{"email":"test9@gmail.com","password":"test1234"},{"email":"test10@gmail.com","password":"test1234"},{"email":"test11@gmail.com","password":"test1234"},{"email":"test12@gmail.com","password":"test1234"},{"email":"test13@gmail.com","password":"test1234"},{"email":"tobmapx@outlook.com","password":"tobMAPS-123"},{"email":"ogeretle@outlook.com","password":"goMAD.123"},{"email":"mastercasper@outlook.com","password":"casper.123"},{"email":"tobmaps@yahoo.com","password":"spamBOT-12345678"},{"email":"tobmaps@yahoo.com","password":"spamBOT-12345678"},{"email":"tobmaps@yahoo.com","password":"spamBOT-12345678"},{"email":"tobmaps@yahoo.com","password":"spamBOT-12345678"}]';
accounts = accounts.replace(/\[/g,"");
accounts = accounts.replace(/]/g,"");
accounts = accounts.replace(/{/g,"");
accounts = accounts.replace(/}/g,"");
accounts = accounts.replace(/email:/g,"");
accounts = accounts.replace(/password:/g,"");

accounts = accounts.replace(/"/g,"");
accounts = accounts.replace(/:/g,"");

accounts = accounts.replace(/email/g,"");
accounts = accounts.replace(/password/g,"");


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
/*var blackList = casper.cli.get("blacklist");*/
var blackList = '[{"domains":["yahoo.com"]}]';
	blackList = blackList.replace("[","");
	blackList = blackList.replace("]","");
	blackList = blackList.replace(/\[/g,"");
	blackList = blackList.replace(/\]/g,"");
	blackList = blackList.replace(/{/g,"");
	blackList = blackList.replace(/}/g,"");
	blackList = blackList.replace(/domains:/g,"");

blackList = blackList.replace(/"/g,"");
blackList = blackList.replace(/:/g,"");

blackList = blackList.replace(/domains/g,"");

	blackList = blackList.split(",");
/**
 *	WhiteList Variable
 * The whiteList array is where we save the user domains the user specified in schedule as the selected whitelist, passed in the args when we use the meteor method.
 * @type {Array}
 */
/*var whiteList = casper.cli.get("whitelist");*/
var whiteList ='[{"domains":["outlook.com","hotmail.com"]}]';
	whiteList = whiteList.replace("[","");
	whiteList = whiteList.replace("]","");
	whiteList = whiteList.replace(/\[/g,"");
	whiteList = whiteList.replace(/\]/g,"");
	whiteList = whiteList.replace(/{/g,"");
	whiteList = whiteList.replace(/}/g,"");
	whiteList = whiteList.replace(/domains:/g,"");

whiteList = whiteList.replace(/"/g,"");
whiteList = whiteList.replace(/:/g,"");

whiteList = whiteList.replace(/domains/g,"");

	whiteList = whiteList.split(",");

/*var actions = casper.cli.get("actions");*/
var actions ='[{"actions":["multipleAccountsSendEmailAction","unsubscribeAction","moveSpamAction"]}]';
	actions = actions.replace("[","");
	actions = actions.replace("]","");
	actions = actions.replace(/\[/g,"");
	actions = actions.replace(/\]/g,"");
	actions = actions.replace(/{/g,"");
	actions = actions.replace(/}/g,"");
	actions = actions.replace(/actions:/g,"");

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
	console.log("This account "+JSON.stringify(account));
	console.log("the black list "+JSON.stringify(blackList));
	console.log("the outlookurl"+JSON.stringify(outlookurl));
	console.log("the actions "+JSON.stringify(actions));

var accountDomain = account.email.replace(/.*@/, "");
console.log(accountDomain);

if(accountDomain=="outlook.com"){
	/**
	 * Username from email to login
	 * @type {String}
	 */

	/* var username = "tobmapx@outlook.com";*/
	var username = account.email;
	/**
	 * Password from email to login
	 * @type {[type]}
	 */
	/* var password = "tobMAPS-123";*/
	var password = account.password;
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
		moveSpamMessagesOutlook(whiteList);
		console.log("Action: "+action);
		/*if(action=="moveSpamAction"){
			console.log("Here enter to MOVESPAM");

		}
		if(action=="moveInboxAction"){
			console.log("Here enter to MOVEInbox");
		}
		if(action ==="multipleAccountsSendEmailAction"){
			console.log("Here enter to SendManyMAils");
		}
		if(action === "unsubscribeAction"){
			console.log("Here enter to unsubscribe");
		}*/
	});
});


/**
 * @summary    Logout for outlook
 * If statement to check if is the last action then check account domain and logout
 * @param  {String} accountDomain type of account domain
 * @return {[type]}               [description]
 */
	casper.then(function(){
		this.echo("How many emails were in junk? "+emails.length+" Mails out of Junk: "+countOutJunk);
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
}/*End IF accountDomain===outlook*/
}); /*End accounts.each*/


/**
 * Runs the whole suite of steps and optionally executes a callback when they’ve all been done.
 * calling this method is mandatory in order to run the Casper navigation suite.
 */
casper.run(function(){
this.exit();
});
var results=[];
var ids=[];
var email="";
var domain="";
var emails=[];
/*CasperJS Functions of Scripts for Outlook*/
function moveSpamMessagesOutlook(whiteList){
casper.then(function(){
results = casper.evaluate(function(){
	ids = [];
	/**
	 * Jquery.Each function.
	 * @return {Array}
	 */
	 $.each($("div[autoid='_lvv_a'] > div"),function(x,y){
	/* $.each($("div[autoid='_lvv_9'] > div"),function(x,y){*/
		ids.push($(y).attr("id"));
	 });
	 return ids;
	});
});

casper.then(function(){
this.echo("Mails ID: "+JSON.stringify(results));
});

/**
 * CasperJS Step to iterate over the ids emails search the email and extract the domain, if the domain match with a given blacklisted domain move the email to the Junk or Spam folder..
 */
casper.then(function(){
casper.each(results, function iterateids(self,id){
	self.then(function thenIterate(){
		casper.echo('div[id="'+id+'"] > div');
		casper.click('div[id="'+id+'"] > div');
		/*this.mouse.click('div[id="'+id+'"] > div > span[autoid="_lvv_j"]');*/
	});
	self.wait(5000);
	self.then(function(){
		this.mouse.click('span[class="bidi allowTextSelection"]');
		this.wait(5000);
		email = this.fetchText("a[class='_rpc_d1 o365button'] > span ");
		email = email.slice(18,email.length);
		/**
		 * Casper.waitForSelector wait to the email document appear so I can click over the message and extract the email and find the domain.
		 */
		 this.waitForSelector("div[role='presentation']",function(){
		 /*this.waitForSelector("div[role='document']",function(){*/
			this.mouse.click('span[class="bidi allowTextSelection"]');
			this.wait(5000);
			email = this.fetchText("a[class='_rpc_d1 o365button'] > span ");
			email = email.slice(18,email.length);
			emails.push(email);
			domain = email.replace(/.*@/, "");
			this.wait(2000);
			this.echo("Email: "+email+" Domain: "+domain+" Emails: "+emails+ " BlackList: "+blackList);
			this.wait(5000);
			/*blacklist = blacklist.split(",");*/
			this.echo("BlackList of casper args: "+ blackList);
		/**
		 * If the domain is in the blacklist I click to Junk to move to junk folder.
		 * @param  {Number} blacklist.indexOf(domain)! indexOf Method to know if in the blacklist or not.
		 */
		 if(blackList.indexOf(domain)!=-1){
			this.clickLabel("Junk");
			countToJunk++;
		 }
		});
		});
});
});
 casper.then(function(){
	this.wait(10000);
 });
}/*End function*/
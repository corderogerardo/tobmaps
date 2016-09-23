var moveInboxActionO = require('./outlook/moveInboxAction');
var moveSpamActionsO = require('./outlook/moveSpamActions');
var unsubscribeActionO = require('./outlook/unsubscribeAction');
var multipleAccountsSendEmailActionO = require('./outlook/multipleAccountsSendEmailAction');

/**
 * Oulook Casper's Bot used to login into account and move
 * @type {CasperJS Bot}
 */

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

var accounts = casper.cli.get("accounts");
accounts = accounts.replace(/\[/g,"");
accounts = accounts.replace(/]/g,"");
accounts = accounts.replace(/{/g,"");
accounts = accounts.replace(/}/g,"");
accounts = accounts.replace(/email:/g,"");
accounts = accounts.replace(/password:/g,"");
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
var blackList = casper.cli.get("blacklist");
	blackList = blackList.replace("[","");
	blackList = blackList.replace("]","");
	blackList = blackList.replace(/\[/g,"");
	blackList = blackList.replace(/\]/g,"");
	blackList = blackList.replace(/{/g,"");
	blackList = blackList.replace(/}/g,"");
	blackList = blackList.replace(/domains:/g,"");
	blackList = blackList.split(",");
/**
 *	WhiteList Variable
 * The whiteList array is where we save the user domains the user specified in schedule as the selected whitelist, passed in the args when we use the meteor method.
 * @type {Array}
 */
var whiteList = casper.cli.get("whitelist");
	whiteList = whiteList.replace("[","");
	whiteList = whiteList.replace("]","");
	whiteList = whiteList.replace(/\[/g,"");
	whiteList = whiteList.replace(/\]/g,"");
	whiteList = whiteList.replace(/{/g,"");
	whiteList = whiteList.replace(/}/g,"");
	whiteList = whiteList.replace(/domains:/g,"");
	whiteList = whiteList.split(",");


/**
 *	We take the args we passed from meteorjs app.
 * @Args {args}
 */
 var meteorarguments = casper.cli.args;

/**
 *	Here start the Bots.
 */
casper.start(url, function(){

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
 * We need to test performance, error handling when execute multi-threaded
 */

if(accountDomain==="outlook.com"){
casper.thenOpen(url,function(){
	this.echo("You're in CASPER.THENOPEN");
		this.echo("The black list passed as arguments should show: "+blackList);
		this.echo("The White list passed as arguments should show: "+whiteList);

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
}
if(accountDomain==="yahoo.com"){

}

// HERE IS GOING TO BE CALLED THE FUNCTIONS MODULES IMPORTED




/**
 * If statement to check if is the last action then check account domain and logout
 * @param  {String} accountDomain type of account domain
 * @return {[type]}               [description]
 */
if(accountDomain === "outlook.com" && countActionsPerformed===actionsArr.lenght){
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
}

/**
 * Runs the whole suite of steps and optionally executes a callback when they’ve all been done.
 * calling this method is mandatory in order to run the Casper navigation suite.
 */
casper.run(function(){
this.exit();
});
/**
 * Outlook Casper's Bot that move emails from inbox to spam
 * @type {CasperJS Bot}
 */

/**
 * Import CasperJS module and create an instance with configurations.
 */
 var casper = require("casper").create({
	verbose: true,
	logLevel: "debug",
	/*viewportSize:
	{
		width: 1300,
		height: 700
	},*/
	pageSettings:
	{
		userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.97 Safari/537.11"
	},
	localToRemoteUrlAccessEnabled: true,
	loadPlugins: true,
	XSSAuditingEnabled: true

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
 var utils = require('utils');
/**
 *	We take the args we passed from meteorjs app.
 * @Args {args}
 */
 var blacklist = casper.cli.args;

/**
 * The yahoo URL where login
 * @type {String}
 */
 var url = "https://login.live.com/login.srf?wa=wsignin1.0&ct=1469453425&rver=6.6.6556.0&wp=MBI_SSL&wreply=https:%2F%2Foutlook.live.com%2Fowa%2F&id=292841&CBCXT=out";

casper.on('page.error', function(msg, trace) {
	this.echo('Error: ' + msg, 'ERROR');
	for(var i=0; i<trace.length; i++) {
		var step = trace[i];
		this.echo('   ' + step.file + ' (line ' + step.line + ')', 'ERROR');
	}
 });

/**
 * The accounts array is where we save the user and password data we passed in the args when we use the method.
 * @type {Array}
 */
/*var accounts = [
		//{user: "tobmaps@yahoo.com", pwd: "spamBOT-12345678"},
		{user: "tobmapx@outlook.com", pwd: 'tobMAPS-123'},
		//{loginfmt: 'tobmapx@outlook.com',passwd: 'tobMAPS-123'}
		];*/
var accounts = casper.cli.get("accounts");
	accounts = accounts.replace("[","");
	accounts = accounts.replace("]","");
	accounts = accounts.replace(/{/g,"");
	accounts = accounts.replace(/}/g,"");
	accounts = accounts.replace(/email:/g,"");
	accounts = accounts.replace(/password:/g,"");
	accounts = accounts.split(",");
var emails=[];
	for(var i = 0;i<accounts.length;i=i+2){
		emails.push({
			email:accounts[i],
			password:accounts[i+1]
		});
	}
/**
 *	Here starts the Bot.
 */
 casper.start();

emails.forEach(function(account) {
	/**
	 * Username from email to login
	 * @type {String}
	 */

	/* var username = account.email;*/
		var username = account.email;
	/**
	 * Password from email to login
	 * @type {[type]}
	 */
	 /*var password = account.password;*/
		var password = account.password;

 casper.thenOpen(url, function(){
	this.echo("You're in CASPER.THENOPEN");
	this.fill('form[name="f1"]',
	{
		loginfmt:username,
		passwd: password
	},true);
	this.wait(10000);
	/*this.capture('outlookC jsObjecasperThenOpen.png');*/
 });

 casper.then(function(){
	this.echo("Imprimo accounts para ver: "+accounts);
	this.wait(1000);
 });

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

 }); // end each loop

/**
 * Runs the whole suite of steps and optionally executes a callback when they’ve all been done.
 * calling this method is mandatory in order to run the Casper navigation suite.
 */
 casper.run(function(){
	this.exit();
 });
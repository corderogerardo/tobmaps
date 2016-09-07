/**
 * Yahoo Casper's Bot that move emails from inbox to spam
 * @type {CasperJS Bot}
 */

/**
 * Import CasperJS module and create an instance with configurations.
 */
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
 var whiteList = casper.cli.args;
/**
 * The yahoo URL where login
 * @type {String}
 */
 var url = "https://login.yahoo.com/config/mail?.intl=us&.done=https%3A%2F%2Fmg.mail.yahoo.com%3A443%2Fneo%2Flaunch%3F.rand%3Degtpucj7f6kvm";
/**
 * The accounts array is where we save the user and password data we passed in the args when we use the method.
 * @type {Array}
 */
 var accounts = [];
 accounts.push({user : casper.cli.get("username"), pwd : casper.cli.get("password")});

/**
 *	Here starts the Bot.
 */
 casper.start("https://login.live.com/login.srf?wa=wsignin1.0&ct=1469453425&rver=6.6.6556.0&wp=MBI_SSL&wreply=https:%2F%2Foutlook.live.com%2Fowa%2F&id=292841&CBCXT=out", function(){
	/*this.capture("outlookCasperStart.png");*/
 });

 casper.thenOpen('https://login.live.com/login.srf?wa=wsignin1.0&ct=1469453425&rver=6.6.6556.0&wp=MBI_SSL&wreply=https:%2F%2Foutlook.live.com%2Fowa%2F&id=292841&CBCXT=out', function(){
	this.echo("You're in CASPER.THENOPEN");
	this.fill('form[name="f1"]',
	{
		loginfmt: 'tobmapx@outlook.com',
		passwd: 'tobMAPS-123'
	},true);
	this.wait(10000);
 });

 casper.then(function(){
	this.waitForText("New", function(){
		this.clickLabel("New");
	});
	this.wait(1000);
 });

 casper.then(function(){
	this.waitForText("To",function(){
		this.sendKeys("input[aria-label='To recipients. Enter an email address or a name from your contact list.']", 'tobmapx@outlook.com');
		this.wait(1000);
	});
 });

 casper.then(function(){
	this.waitForText("To", function(){
		this.sendKeys("input[aria-label='To recipients. Enter an email address or a name from your contact list.']", 'tobmapx@outlook.com', {keepFocus: true});
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
	this.wait(10000);
 });

 casper.then(function(){
	this.waitForText("Couldn't send the following message",function(){
		this.echo("Error trying to send a message mail");
		this.clickLabel("Couldn't send the following message");
	});
	this.wait(5000);
	this.waitForText("Your message wasn't sent because there's a daily limit for how many messages can be sent. We saved it in your Drafts folder.",function(){
		this.echo("Error");
	});
	this.wait(2000);
 });

 casper.then(function(){
	this.wait(10000);
 });

/**
 * Runs the whole suite of steps and optionally executes a callback when they’ve all been done.
 * calling this method is mandatory in order to run the Casper navigation suite.
 */
 casper.run(function(){
	this.die("Exit casper").exit();
 });
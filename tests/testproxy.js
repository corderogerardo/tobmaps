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
	},
	localToRemoteUrlAccessEnabled: true,
	loadPlugins: true,
	XSSAuditingEnabled: true,
 });
 /*phantom.setProxy("proxy=180.177.157.62:80");*/

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

 casper.start("http://www.whatsmyip.org/",function(){
	this.then(function(){
		this.wait(10000);
	});
	this.thenOpen("http://www.speedtest.net",function(){

	});
 });

 casper.then(function(){
	this.wait(100000);
 });
casper.run(function(){
	this.exit();
 });
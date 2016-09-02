'use strict';
/**
 * Oulook Casper's Bot used to open many mails and click on links
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
var url = "https://login.live.com/login.srf?wa=wsignin1.0&ct=1469453425&rver=6.6.6556.0&wp=MBI_SSL&wreply=https:%2F%2Foutlook.live.com%2Fowa%2F&id=292841&CBCXT=out";
casper.start(url, function(){
	/*this.capture("outlookCasperStart.png");*/
});

casper.thenOpen(url, function(){
	this.echo("You're in CASPER.THENOPEN");
	this.fill('form[name="f1"]',
		{
			loginfmt: 'tobmapx@outlook.com',
			passwd: 'tobMAPS-123'
		},true);
	this.wait(10000);
	/*this.capture('outlookCasperThenOpen.png');*/
});

casper.then(function(){
	this.waitForText("this is killerbox",function(){
		this.clickLabel("this is killerbox");
		this.echo("I click on email");
	});
});

casper.then(function(){
	this.waitForSelector("div[role='document']",function(){
		this.evaluate(function(){
			$.each($("div[role='document'] a"), function(){
				this.click("div[role='document'] a");
			});
		this.wait(50000);
		});
	});
});

casper.then(function(){
	this.wait(30000);
});

/**
 * Runs the whole suite of steps and optionally executes a callback when they’ve all been done.
 * calling this method is mandatory in order to run the Casper navigation suite.
 */
casper.run(function(){
	this.exit();
});
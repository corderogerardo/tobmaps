/**
 * Outlook Casper's Bot that move emails from inbox to spam
 * @type {CasperJS Bot}
 */

/**
 * Import CasperJS module and create an instance with configurations.
 */
var casper = require('casper').create({
	clientScripts: ['../../../../../tests/jquery.min.js'],
	verbose: true,
	logLevel: 'debug',
	viewportSize:
		{
			width: 1360,
			height: 760
		},
	 pageSettings:
	 	{
		userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.97 Safari/537.11'
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

casper.on('page.error',function(msg,trace){
	this.echo('Error: '+msg,'Error');
	for(var i=0;i<trace.length;i++){
		var step = trace[i];
		this.echo(' '+step.file + '(line '+step.line+')', 'ERROR');
	}
});
/**
 * The yahoo URL where login
 * @type {String}
 */
var url = "https://login.live.com/login.srf?wa=wsignin1.0&ct=1469453425&rver=6.6.6556.0&wp=MBI_SSL&wreply=https:%2F%2Foutlook.live.com%2Fowa%2F&id=292841&CBCXT=out";
/**
 * The accounts array is where we save the user and password data we passed in the args when we use the method.
 * @type {Array}
 */
var accounts = [];
accounts.push({user : casper.cli.get("username"), pwd : casper.cli.get("password")});

/**
 *	Here starts the Bot.
 */
casper.start(url,function(){

});

/**
 * Iterate the array to process each account saved.
 */
accounts.forEach(function(account) {

	/**
	 * Username from email to login
	 * @type {String}
	 */
	var username = account.user;
	/**
	 * Password from email to login
	 * @type {[type]}
	 */
	var password = account.pwd;

/**
 * We added a new navigation step with this casperjs function that receive our
 * outlook url
 */
casper.thenOpen(url,function(){
	this.echo("You're in CASPER.THENOPEN");
		/**
		* With Casper.fill method we send the username values of the form
		* With Casper.fill method we send the password values of the form
		* @type {String}
		*/
		this.fill('form[name="f1"]',
			{
				loginfmt: username,
				passwd: password
			},true);
	this.wait(10000);
});

var ids = [];
var results;
var emails=[];
var email;
var countToJunk=0;

/**
 * Casper.then we add a new navigation step to the bot.
 * We iterate over all emails messages and click over them
 */
casper.then(function(){
	results = this.evaluate(function(){
		ids = [];
		/**
		 * Jquery.Each function.
		 * @return {Array}
		 */
		$.each($("div[autoid='_lvv_a'] > div"),function(x,y){
			ids.push($(y).attr("id"));
		});
		return ids;
	});
	utils.dump(results);
});

casper.then(function(){
	this.echo("Mails ID: "+JSON.stringify(results));
});

/**
 * CasperJS Step to iterate over the ids emails search the email and extract the domain, if the domain match with a given blacklisted domain move the email to the Junk or Spam folder..
 */
casper.then(function(){
	this.each(results, function iterateids(self,id){
		self.then(function thenIterate(){
			this.echo('div[id="'+id+'"] > div');
			this.click('div[id="'+i'use strict';d+'"] > div');
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
			this.waitForSelector("div[role='document']",function(){
				this.mouse.click('span[class="bidi allowTextSelection"]');
				this.wait(5000);
			email = this.fetchText("a[class='_rpc_d1 o365button'] > span ");
			email = email.slice(18,email.length);
			emails.push(email);
			domain = email.replace(/.*@/, "");
			this.wait(2000);
			this.echo("Email: "+email+" Domain: "+domain+" Emails: "+emails);
			this.wait(5000);
			/**
			 * If the domain is in the blacklist I click to Junk to move to junk folder.
			 * @param  {Number} blacklist.indexOf(domain)! indexOf Method to know if in the blacklist or not.
			 */
			if(blacklist.indexOf(domain)!=-1){
				this.clickLabel("Junk");
				countToJunk++;
			}
			});
		});
	});
});

/**
 * Casper.then navigation step to wait for the button to sing out
 */
casper.then(function(){
	this.echo("How many emails were in inbox? "+emails.length+" Mails move out to Junk: "+countToJunk);
	this.waitForSelector("button[autoid='__Microsoft_O365_ShellG2_MeTile_Owa_templates_cs_0']", function(){
		this.click("button[autoid='__Microsoft_O365_ShellG2_MeTile_Owa_templates_cs_0']");
	});
});
casper.then(function(){
	this.wait(1000);
});
/**
 * Casper.then navigation step to logout
 */
casper.then(function(){
		this.waitForText("Sign out",function(){
			this.clickLabel("Sign out");
		});
});

}); //End accounts.each loop

casper.then(function(){
	this.wait(10000);
});
/**
 * Runs the whole suite of steps and optionally executes a callback when they’ve all been done.
 * calling this method is mandatory in order to run the Casper navigation suite.
 */
casper.run(function(){
	this.exit();
});
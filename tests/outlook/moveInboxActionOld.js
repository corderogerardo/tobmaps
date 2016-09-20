/**
 * Oulook Casper's Bot used to login into account and move
 * @type {CasperJS Bot}
 */

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
 * The yahoo URL where login
 * @type {String}
 */
 var url = "https://login.live.com/login.srf?wa=wsignin1.0&ct=1469453425&rver=6.6.6556.0&wp=MBI_SSL&wreply=https:%2F%2Foutlook.live.com%2Fowa%2F&id=292841&CBCXT=out";

	 /**
 *	We take the args we passed from meteorjs app.
 * @Args {args}
 */
/* var whiteList = casper.cli.args;*/
var whiteList=[];
whiteList.push("outlook.com");
whiteList.push("yahoo.com");
/**
 * The accounts array is where we save the user and password data we passed in the args when we use the method.
 * @type {Array}
 */
 /*var accounts = [{user: 'tobmapx@outlook.com',pwd: 'tobMAPS-123'}];*/

 /*var accounts = casper.cli.get("accounts");
 accounts = accounts.replace("[","");
 accounts = accounts.replace("]","");
 accounts = accounts.replace(/{/g,"");
 accounts = accounts.replace(/}/g,"");
 accounts = accounts.replace(/email:/g,"");
 accounts = accounts.replace(/password:/g,"");
 accounts = accounts.split(",");
 copyaccounts = accounts;
 var accounts=[];
 for(var i = 0;i<copyaccounts.length;i=i+2){
	accounts.push({
		email:copyaccounts[i],
		password:copyaccounts[i+1]
	});
 }*/

 casper.start();

 /*accounts.forEach(function(account) {*/
	/**
	 * Username from email to login
	 * @type {String}
	 */

	 var username = "tobmapx@outlook.com";
	/* var username = account.email;*/
	/**
	 * Password from email to login
	 * @type {[type]}
	 */
	 var password = "tobMAPS-123";
	 /*var password = account.password;*/

 casper.thenOpen(url,function(){
	this.echo(username+' '+password);
	this.echo("You're in CASPER.THENOPEN");
	this.echo("The white list passed as arguments should show: "+whiteList);
	this.fill('form[name="f1"]',
	{
		loginfmt: username,
		passwd: password
	},true);
	this.wait(10000);
 });

 casper.then(function(){
	this.waitForText("Junk Email", function(){
		this.clickLabel("Junk Email");
	});
	this.wait(5000);
	/*this.capture("ClickToJunt");*/
 });

 var ids = [];
 var results;
 var emails=[];
 var email;
 var countOutJunk=0;
 casper.then(function(){
	results = this.evaluate(function(){
		ids = [];
		$.each($("div[autoid='_lvv_m'] > div > div > div > div > div"),function(x,y){
			ids.push($(y).attr("id"));
		});
		return ids;
	});
	utils.dump(results);
 });

 casper.then(function(){
	this.echo("Mails ID: "+JSON.stringify(results));
 });
 casper.then(function(){
	this.each(results, function iterateids(self,id){
		self.then(function thenIterate(){
			this.echo('div[id="'+id+'"] > div');
			this.click('div[id="'+id+'"] > div');
			/*this.mouse.click('div[id="'+id+'"] > div > span[autoid="_lvv_j"]');*/
		});
		self.wait(5000);
		self.then(function(){
			this.mouse.click('span[class="bidi allowTextSelection"]');
			this.wait(5000);
			email = this.fetchText("a[class='_rpc_d1 o365button'] > span ");
			email = email.slice(18,email.length);

			this.waitForSelector("div[role='document']",function(){
				this.mouse.click('span[class="bidi allowTextSelection"]');
				this.wait(5000);
				email = this.fetchText("a[class='_rpc_d1 o365button'] > span ");
				email = email.slice(18,email.length);
				emails.push(email);
				domain = email.replace(/.*@/, "");
				this.wait(2000);
				this.echo("Email: "+email+" Domain: "+domain+" Emails: "+emails+ " WhiteList: "+whiteList);
				this.wait(5000);
				/*whiteList = whiteList.split(",");*/
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

 casper.then(function(){
	this.wait(10000);
 });

/*}); // end for each loop*/

/**
 * Runs the whole suite of steps and optionally executes a callback when they’ve all been done.
 * calling this method is mandatory in order to run the Casper navigation suite.
 */
 casper.run(function(){
	this.exit();
 });

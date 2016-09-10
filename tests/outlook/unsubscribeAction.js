/**
 * Oulook Casper's Bot used to catch error when login
 * @type {CasperJS Bot}
 */

/**
 * Import CasperJS module and create an instance with configurations.
 */
 var casper = require("casper").create({
	/*clientScripts: ['jquery.min.js'],*/
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
 var listDomains = casper.cli.args;
 var total = listDomains.length;
 var whiteList=[];
 var blacklist=[];
 for (var i = 0; i<total/2; i++) {
	whiteList.push(listDomains[i]);
 }
 for (var i = total/2; i<=total; i++) {
	blacklist.push(listDomains[i]);
 }
/**
 * The yahoo URL where login
 * @type {String}
 */
 var url = "https://login.live.com/login.srf?wa=wsignin1.0&ct=1469453425&rver=6.6.6556.0&wp=MBI_SSL&wreply=https:%2F%2Foutlook.live.com%2Fowa%2F&id=292841&CBCXT=out";

/**
 * The accounts array is where we save the user and password data we passed in the args when we use the method.
 * @type {Array}
 */
 /*var accounts = [{user: 'tobmapx@outlook.com',pwd: 'tobMAPS-123'}];*/

 var accounts = [];
 accounts.push({user : casper.cli.get("username"), pwd : casper.cli.get("password")});

 casper.start();

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

	 casper.thenOpen(url, function(){
		this.echo("You're in CASPER.THENOPEN");
		this.echo("Domains: "+whiteList+" Black: "+blacklist);
		this.fill('form[name="f1"]',
		{
			loginfmt: username,
			passwd: password
		},true);
		this.wait(10000);
		/*this.capture('outlookCasperThenOpen.png');*/
	 });


	 var ids = [];
	 var results;
	 var emails=[];
	 var email;
	 var domain='';
	 var countNotClickUnsubscribe=0;

	 casper.then(function(){
		results = this.evaluate(function(){
			ids = [];
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

	 casper.then(function(){
		this.each(results, function(self,id){
			self.then(function(){
				this.echo('div[id="'+id+'"]');
				this.click('div[id="'+id+'"] > div');

				this.wait(2000);
				this.mouse.click('span[class="bidi allowTextSelection"]');
				email = this.fetchText("a[class='_rpc_d1 o365button'] > span ");
				email = email.slice(18,email.length);
				domain = email.replace(/.*@/, "");
				this.then(function(){
					this.wait(2000);
					this.mouse.click('span[class="bidi allowTextSelection"]');
					email = this.fetchText("a[class='_rpc_d1 o365button'] > span ");
					email = email.slice(18,email.length);
					domain = email.replace(/.*@/, "");

					this.waitForSelector("div[role='document']",function(){
						this.mouse.click('span[class="bidi allowTextSelection"]');
						this.wait(5000);
						email = this.fetchText("a[class='_rpc_d1 o365button'] > span ");
						email = email.slice(18,email.length);
						emails.push(email);
						domain = email.replace(/.*@/, "");
						this.wait(5000);
						this.echo("Email: "+email+" Domain: "+domain+" Emails: "+emails+ " WhiteList: "+whiteList+ " BlackList: "+blacklist);
						this.wait(5000);

						var isOnWhiteList = whiteList.indexOf(domain);
						var isOnBlackList = blacklist.indexOf(domain);

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

	 casper.then(function(){
		this.wait(10000);
	 });

}); // end for each loop

/**
 * Runs the whole suite of steps and optionally executes a callback when they’ve all been done.
 * calling this method is mandatory in order to run the Casper navigation suite.
 */
 casper.run(function(){
	this.exit();
 });
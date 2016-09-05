/**
 * Yahoo Casper's Bot that click randomly on links in emails
 * @type {CasperJS Bot}
 */

/**
 * Import CasperJS module and create an instance with configurations.
 */
var casper = require("casper").create({
	clientScripts: ['jquery.min.js'],
	verbose: true,
    logLevel: "debug",
	viewportSize:
		{
			width: 1350,
			height: 1200
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
utils = require("utils");
/**
 *	We take the args we passed from meteorjs app.
 * @Args {args}
 */
var whiteList = casper.cli.args;
/**
 * The yahoo URL where login
 * @type {String}
 */
var url = "https://login.yahoo.com/?.src=ym&.intl=e1&.lang=es-US&.done=https%3a//mail.yahoo.com"
/**
 * The accounts array is where we save the user and password data we passed in the args when we use the method.
 * @type {Array}
 */
var accounts = [];
accounts.push({user : casper.cli.get("username"), pwd : casper.cli.get("password")});

/**
 *	Here starts the Bot.
 */
casper.start();

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
	var stopFlag = false;
/**
	 * We added a new navigation step with this casperjs function that receive our
	 * yahoo url
	 */
	casper.thenOpen(url, function() {

		this.waitForSelector("input[name='username']", function() {
		  this.sendKeys("input[name='username']", username);
		  this.wait(1000);
		});

		this.waitForSelector("form#mbr-login-form button[type=submit][value='authtype']", function() {
		  this.click("form#mbr-login-form button[type=submit][value='authtype']");
		  this.wait(6000);
		});

    this.waitForSelector("input[name='passwd']", function() {
	  	this.sendKeys("input[name='passwd']", password);
	  	this.wait(2000);
		});

		this.waitForSelector("form#mbr-login-form button[name='signin']", function() {
		  this.click("form#mbr-login-form button[name='signin']");
		  this.wait(2000);
		});


		/**** Open message and all links ****/

		casper.then(function(){
			this.waitForText("Buzón", function() {
		  	this.clickLabel("Buzón");
		  	this.wait(2000);
		  });
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
		utils.dump(messages);
		});

		casper.then(function(){
			this.each(messages, function(self, obj){
				var tag = false;
				self.then(function(){
					this.each(whiteList, function(self, white){
						if(obj.email.replace(/.*@/, "") == white){
							tag = true;
						}
					});
					if (tag == false) {
						this.click('div[id="'+obj.message_id+'"]');
						this.wait(3000);
						casper.then(function(){
							this.evaluate(function(){
								$.each($("div.thread-body a"), function(){
									if((Math.floor((Math.random() * 2) + 1)) == 1){
										this.click("div.thread-body a");
									}
								});
							});
							this.wait(2000);
						});
						casper.then(function(){
							this.waitForText("Buzón", function() {
						  	this.clickLabel("Buzón");
						  	this.wait(5000);
						  });
						});
					}
				});
			});
		});

		/**** end ****/


		casper.thenOpen(url);

		casper.waitForSelector("div.not-you",function(){
			this.click("a#login-signout");
			this.wait(2000);
		});

	});
}); // end accounts.each loop

/**
 * Runs the whole suite of steps and optionally executes a callback when they’ve all been done.
 * calling this method is mandatory in order to run the Casper navigation suite.
 */
casper.run(function(){
	this.exit();
});
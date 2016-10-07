/**
 * Yahoo Casper's Bot that opens multiple yahoo accounts
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
 var url = "https://login.yahoo.com/config/mail?.intl=us&.done=https%3A%2F%2Fmg.mail.yahoo.com%3A443%2Fneo%2Flaunch%3F.rand%3Degtpucj7f6kvm"
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
	 * yahoo url
	 */
	 casper.thenOpen(url, function() {
		/**
		 * Casper.then we add a new navigation step to the bot.
		 */
		 casper.then(function(){
			/**
			 * With Casper.fill method we send the username values of the form
			 * @type {String}
			 */
			casper.fill('form[id="mbr-login-form"]', {
				username : username
				}, false);
			});
		/**
		 * waitForSelector Waits until the form-login button element selector expression does not exist in remote DOM to process a next step
		 */
		 this.waitForSelector("form#mbr-login-form button[type=submit][value='authtype']", function() {
			this.click("form#mbr-login-form button[type=submit][value='authtype']");
			this.wait(6000);
		 });

		 casper.then(function(){
		/**
		* With Casper.fill method we send the password values of the form
		* @type {String}
		*/
		casper.fill('form[id="mbr-login-form"]', {
			passwd : password
			}, true);
			this.wait(5000);
		});

		casper.repeat(1, function(){

			casper.then(function(){
				this.waitForText("Compose", function() {
					this.clickLabel("Compose");
					this.wait(1000);
				});
			});

			casper.waitForSelector("input[name='to-field']", function() {
				this.click("input[name='to-field']");
			});

			casper.waitForSelector("input[name='to-field']", function() {
				this.sendKeys("input[name='to-field']", "tobmaps@yahoo.com");
			});

			casper.waitForSelector("input[id='subject-field']", function() {
				this.click("input[id='subject-field']");
			});

			casper.waitForSelector("input[id='subject-field']", function() {
				this.sendKeys("input[id='subject-field']", "Send Message with links");
			});

			casper.waitForSelector("div[id='rtetext']", function() {
				this.click("input[id='rtetext']");
			});

			casper.waitForSelector("div[id='rtetext']", function() {
				this.sendKeys("div[id='rtetext']", "http://casperjs.org/ \n");
				this.sendKeys("div[id='rtetext']", "https://slimerjs.org/ ");
				this.wait(1000);
			});

			casper.then(function(){
				this.waitForText("Send", function() {
					this.clickLabel("Send");
					this.wait(5000);
				});
			});

		});

		/*casper.thenOpen(url);

		casper.waitForSelector("div.not-you",function(){
			this.click("a#login-signout");
			this.wait(3000);
		});*/

	}); // end casper.thenOpen function
}); // end accounts.each loop

/**
 * Runs the whole suite of steps and optionally executes a callback when they’ve all been done.
 * calling this method is mandatory in order to run the Casper navigation suite.
 */
 casper.run(function(){
	this.exit();
 });
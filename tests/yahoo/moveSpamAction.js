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
		width: 1360,
		height: 760
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
 	var whiteList = casper.cli.get("whiteList");
	whiteList = whiteList.replace("[","");
	whiteList = whiteList.replace("]","");
	whiteList = whiteList.replace(/\[/g,"");
	whiteList = whiteList.replace(/\]/g,"");
	whiteList = whiteList.replace(/{/g,"");
	whiteList = whiteList.replace(/}/g,"");
	whiteList = whiteList.replace(/domains:/g,"");
	whiteList = whiteList.split(","); 

	var blackList = casper.cli.get("blackList");
	blackList = blackList.replace("[","");
	blackList = blackList.replace("]","");
	blackList = blackList.replace(/\[/g,"");
	blackList = blackList.replace(/\]/g,"");
	blackList = blackList.replace(/{/g,"");
	blackList = blackList.replace(/}/g,"");
	blackList = blackList.replace(/domains:/g,"");
	blackList = blackList.split(","); 

/**
 * The yahoo URL where login
 * @type {String}
 */
 var url = "https://login.yahoo.com/config/mail?.intl=us&.done=https%3A%2F%2Fmg.mail.yahoo.com%3A443%2Fneo%2Flaunch%3F.rand%3Degtpucj7f6kvm";
/**
 * The accounts array is where we save the user and password data we passed in the args when we use the method.
 * @type {Array}
 */
 	var objAccounts = [];
 	var accounts = casper.cli.get("accounts");
	accounts = accounts.replace("[","");
	accounts = accounts.replace("]","");
	accounts = accounts.replace(/{/g,"");
	accounts = accounts.replace(/}/g,"");
	accounts = accounts.replace(/email:/g,"");
	accounts = accounts.replace(/password:/g,"");
	accounts = accounts.split(",");

	for(var i = 0;i<accounts.length;i=i+2){
		objAccounts.push({
			email:accounts[i],
			password:accounts[i+1]
		});
	}

/**
 *	Here starts the Bot.
 */
 casper.start();

/**
 * Iterate the array to process each account saved.
 */
 objAccounts.forEach(function(account) {
	/**
	 * Username from email to login
	 * @type {String}
	 */
	 var username = account.email;
	/**
	 * Password from email to login
	 * @type {[type]}
	 */
	 var password = account.password;

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

		/**
		 * Casper.then we add a new navigation step to the bot.
		 * Select messages out inbox to spam (list)
		 */
		casper.then(function(){
			this.waitForText("Inbox", function() {
		  	this.clickLabel("Inbox");
		  	this.wait(5000);
		  });
		});

		/**
		 *	Casper.then we add a new navigation step to the bot.
		 *	We iterate over all emails messages and save their ids, title and checkbox status
		 */
		 var messagesSpam;
		 casper.then(function(){
			/**
			 *	Casper.evaluate - Evaluates an expression in the current page DOM context - This case we iterate over all the messages in the inbox folder of the yahoo email account and save their ids in array ids.
			 * @type {Array objects}
			 */
			 messagesSpam = this.evaluate(function(){
				ids = [];
				/**
				 * Jquery.Each function.
				 * @return {Object}
				 */
				 $.each($("div.list-view-item"), function(x,y){
					ids.push({
						message_id: $(this).attr("id"),
						email: $('div.from', this).attr("title"),
						data_cid: $('input[title="Checkbox, not checked"]', this).attr("data-cid")
					});
				 });
				 return ids;
				});
			 utils.dump(messagesSpam);
			});

		/**
		 * Casper.then we add a new navigation step to the bot.
		 */
		 casper.then(function(){
			/**
			 * Casper.each method to Iterates over messagesSpam array items and execute a callback
			 * @return {[type]}
			 */
			 this.each(messagesSpam, function(self, obj){
				var tag = false;
				self.then(function(){
					this.each(whiteList, function(self, white){
						if(obj.email.replace(/.*@/, "") == white){
							tag = true;	
						}
					});
					if (tag == false) {
						this.click('input[data-cid="'+obj.data_cid+'"]');
					}	
				});
			});

			 casper.waitForSelector("button[id='main-btn-spam']", function() {
				this.click("button[id='main-btn-spam']");
				this.wait(20000);
			});
		});


		/**
		 * Casper.then we add a new navigation step to the bot.
		 * Select messages out spam to inbox (list)
		 */
		
		casper.then(function(){
			this.wait(35000);
		 });

		 casper.then(function(){
			this.waitForText("Spam", function() {
				this.clickLabel("Spam");
				this.wait(10000);
			});
		 });
		/**
		 *	Casper.then we add a new navigation step to the bot.
		 *	We iterate over all emails messages and save their ids, title and checkbox status
		 */
		 var messagesInbox;
		 casper.then(function(){
			/**
			 *	Casper.evaluate - Evaluates an expression in the current page DOM context - This case we iterate over all the messages in the inbox folder of the yahoo email account and save their ids in array ids.
			 * @type {Array objects}
			 */
			 messagesInbox = this.evaluate(function(){
				ids = [];
				/**
				 * Jquery.Each function.
				 * @return {Object}
				 */
				 $.each($("div.list-view-item"), function(x,y){
					ids.push({
						message_id: $(this).attr("id"),
						email: $('div.from', this).attr("title"),
						data_cid: $('input[title="Checkbox, not checked"]', this).attr("data-cid")
					});
				 });
				 return ids;
				});
			 utils.dump(messagesInbox);
			});

		/**
		 * Casper.then we add a new navigation step to the bot.
		 */
		 casper.then(function(){
			/**
			 * Casper.each method to Iterates over messagesInbox array items and execute a callback
			 * @return {[type]}
			 */
			 this.each(messagesInbox, function(self, obj){
				var tag = false;
				self.then(function(){
					this.each(blackList, function(self, black){
						if(obj.email.replace(/.*@/, "") == black){
							tag = true;
						}
					});
					if (tag == false) {
						this.click('input[data-cid="'+obj.data_cid+'"]');
					}
				});
			 });

			 casper.waitForSelector("button[id='btn-not-spam']", function() {
				this.click("button[id='btn-not-spam']");
				this.wait(20000);
			 });
			});

		 /**
		 * Casper.then we add a new navigation step to the bot.
		 * Select messages out inbox to spam (list)
		 */
		casper.then(function(){
			this.waitForText("Inbox", function() {
		  	this.clickLabel("Inbox");
		  	this.wait(5000);
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
					if (tag == true) {
						this.click('div[id="'+obj.message_id+'"]');
						this.wait(3000);
						casper.then(function(){
							this.evaluate(function(){
								$.each($("div.thread-body a"), function(){
									if($(this).text() != "unsubscribe"){
										this.click("div.thread-body a");
									}
								});
							});
							this.wait(2000);
						});
						casper.then(function(){
							this.waitForText("Inbox", function() {
								this.clickLabel("Inbox");
								this.wait(8000);
							});
						});
					}
				});
			});
		});

		/**** end ****/

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

			casper.then(function(){
				this.wait(10000);
		 	});

		});

		 /**
		 * waitForSelector waits for the div.not-you selector associate to logout button.
		 * then when the button loads we click the logout function
		 */
		
		 casper.then(function(){
			this.waitForSelector("a[aria-label='Profile']", function(){
				this.click("a[aria-label='Profile']");
			});
		 });

		 casper.then(function(){
			this.wait(10000);
		 });
		 
		 casper.then(function(){
			this.waitForText("Sign out",function(){
				this.clickLabel("Sign out");
			});
		 });

		 casper.then(function(){
			this.wait(20000);
		 });

	});// End casper.then function

}); // end for accounts.each loop

/**
 * Runs the whole suite of steps and optionally executes a callback when they’ve all been done.
 * calling this method is mandatory in order to run the Casper navigation suite.
 */
casper.run(function(){
	this.exit();
});
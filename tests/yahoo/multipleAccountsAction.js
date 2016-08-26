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

utils = require("utils");

var url = "https://login.yahoo.com/?.src=ym&.intl=e1&.lang=es-US&.done=https%3a//mail.yahoo.com"

var config = { accounts : 
	[
		{user : "tobmaps@yahoo.com", pwd : "spamBOT-12345678"},
		{user : "tobmaps@yahoo.com", pwd : "spamBOT-12345678"},
		{user : "tobmaps@yahoo.com", pwd : "spamBOT-12345678"}
	]
};

casper.start()

config.accounts.forEach(function(account) { 

	var username = account.user;
	var password = account.pwd;

	casper.thenOpen(url, function() { 

		this.waitForSelector("input[name='username']", function() {
		  this.sendKeys("input[name='username']", username);
		  this.wait(1000);
		});

		this.waitForSelector("form#mbr-login-form button[type=submit][value='authtype']", function() {
		  this.click("form#mbr-login-form button[type=submit][value='authtype']");
		  this.wait(2000);
		});

		this.waitForSelector("input[name='passwd']", function() {
		  this.sendKeys("input[name='passwd']", password);
		  this.wait(1000);
		});

		this.waitForSelector("form#mbr-login-form button[name='signin']", function() {
		  this.click("form#mbr-login-form button[name='signin']");
		  this.wait(6000);
		});

		casper.repeat(5, function(){

			casper.then(function(){
				this.waitForText("Escribir", function() {
				  this.clickLabel("Escribir");
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
				this.waitForText("Enviar", function() {
			  	this.clickLabel("Enviar");
			  	this.wait(5000);
			  });
			});

		});

		casper.thenOpen(url);

		casper.waitForSelector("div.not-you",function(){
				this.click("a#login-signout");
				this.wait(3000);
		});

	});
}); // end for loop

casper.run();
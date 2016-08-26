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

whiteList = ["outlook.com", "yahoo.com"];

var url = "https://login.yahoo.com/?.src=ym&.intl=e1&.lang=es-US&.done=https%3a//mail.yahoo.com";
var config = { accounts :
	[
		{user : "tobmaps@yahoo.com", pwd : "spamBOT-12345678"}
	]
};

casper.start();

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

		/**** Select messages out spam to inbox (list) ****/

		casper.then(function(){
			this.waitForText("Spam", function() {
		  	this.clickLabel("Spam");
		  	this.wait(5000);
		  });
		});

		var messagesSpam;
		casper.then(function(){
			messagesSpam = this.evaluate(function(){
				ids = [];
				$.each($("div.list-view-item"), function(x,y){
					ids.push({
						message_id: $(this).attr("id"),
						email: $('div.from', this).attr("title"),
						data_cid: $('input[title="Casilla de verificación: sin marcar"]', this).attr("data-cid")
					});
				});
				return ids;
			});
		utils.dump(messagesSpam);
		});

		casper.then(function(){
			this.each(messagesSpam, function(self, obj){
				var tag = false;
				self.then(function(){
					this.each(whiteList, function(self, white){
						if(obj.email.replace(/.*@/, "") == white){
							tag = true;
						}
					});
					if (tag == true) {
						this.click('input[data-cid="'+obj.data_cid+'"]');
					}
				});
			});
			casper.waitForSelector("button[id='btn-not-spam']", function() {
				this.click("button[id='btn-not-spam']");
				this.wait(5000);
			});
		});

		/**** end ****/

		casper.thenOpen(url);

		casper.waitForSelector("div.not-you",function(){
			this.click("a#login-signout");
			this.wait(2000);
		});

	});
}); // end for loop

casper.run();
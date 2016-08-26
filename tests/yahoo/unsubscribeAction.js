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

whiteList = ["outlook.com", "yahoo.com"]

var url = "https://login.yahoo.com/?.src=ym&.intl=e1&.lang=es-US&.done=https%3a//mail.yahoo.com"
var config = { accounts : 
	[
		{user : "tobmaps@yahoo.com", pwd : "spamBOT-12345678"}
	]
};

casper.start()

config.accounts.forEach(function(account) { 

	var username = account.user;
	var password = account.pwd;
	var stopFlag = false;

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
}); // end for loop

casper.run();
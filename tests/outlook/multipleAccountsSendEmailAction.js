/**
 * Outlook Casper's Bot that move emails from inbox to spam
 * @type {CasperJS Bot}
 */
exports.sendEmails = function(){

casper.repeat(10,function(){
	 casper.then(function(){
		this.waitForText("New", function(){
			this.clickLabel("New");
		});
		this.wait(2000);
	 });

	 casper.then(function(){
		this.waitForText("To", function(){
			this.sendKeys("input[aria-label='To recipients. Enter an email address or a name from your contact list.']", 'tobmapx@outlook.com ', {keepFocus: true});
			this.sendKeys("input[aria-label='To recipients. Enter an email address or a name from your contact list.']", casper.page.event.key.Enter , {keepFocus: true});
			this.page.sendEvent("keypress", casper.page.event.key.Enter);
			this.echo("send press enter to page");
			this.wait(1000);
		});
	});


	 casper.then(function(){
		this.waitForText("To",function(){
			this.sendKeys("input[placeholder='Add a subject']", "this is killerbox");
			this.wait(1000);
		});
	 });

	casper.then(function(){
		this.waitForText("To", function(){
			this.sendKeys("div[aria-label='Message body']","http://example.me \n");
		});
	});

	casper.then(function(){
		this.waitForText("To", function(){
			this.sendKeys("div[aria-label='Message body']", 'http://paisajeweb.com.ve ', {keepFocus: true});
			this.sendKeys("div[aria-label='Message body']", casper.page.event.key.Enter , {keepFocus: true});
			this.page.sendEvent("keypress", casper.page.event.key.Enter);
			this.echo("send press enter to page");
			this.wait(1000);
		});
	});

 casper.then(function(){
	this.waitForText("Send", function(){
		this.clickLabel("Send");
	});
	this.wait(2000);
 });
});/*Casper.repeat*/

casper.then(function(){
	this.waitForSelector("button[autoid='__Microsoft_O365_ShellG2_MeTile_Owa_templates_cs_0']", function(){
		this.click("button[autoid='__Microsoft_O365_ShellG2_MeTile_Owa_templates_cs_0']");
	});
});
casper.then(function(){
this.wait(5000);
});
casper.then(function(){
this.waitForText("Sign out",function(){
	this.clickLabel("Sign out");
	username ="";
	password ="";
});
});

casper.then(function(){
this.wait(10000);
});

};//End module.exports
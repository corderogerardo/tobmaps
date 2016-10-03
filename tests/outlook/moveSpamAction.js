// my module, stored in universe.js
// patching phantomjs' require()
var require = patchRequire(require);


/**
 * Outlook Casper's Bot that move emails from inbox to spam
 * @type {CasperJS Bot}
 */

var moveSpam = function(blackList){

console.log("TEST");
console.log(blackList);

var results;
var ids;
var email;
var domain;
var emails;

casper.then(function(){
results = casper.evaluate(function(){
	ids = [];
	/**
	 * Jquery.Each function.
	 * @return {Array}
	 */
	 $.each($("div[aria-label='conversation'] > div > div > div > div > div"),function(x,y){
	/* $.each($("div[autoid='_lvv_9'] > div"),function(x,y){*/
		ids.push($(y).attr("id"));
	 });
	 return ids;
	});
});

casper.then(function(){
this.echo("Mails ID: "+JSON.stringify(results));
});

/**
 * CasperJS Step to iterate over the ids emails search the email and extract the domain, if the domain match with a given blacklisted domain move the email to the Junk or Spam folder..
 */
casper.then(function(){
casper.each(results, function iterateids(self,id){
	self.then(function thenIterate(){
		casper.echo('div[id="'+id+'"] > div');
		casper.click('div[id="'+id+'"] > div');
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
		 this.waitForSelector("div[role='presentation']",function(){
		 /*this.waitForSelector("div[role='document']",function(){*/
			this.mouse.click('span[class="bidi allowTextSelection"]');
			this.wait(5000);
			email = this.fetchText("a[class='_rpc_d1 o365button'] > span ");
			email = email.slice(18,email.length);
			emails.push(email);
			domain = email.replace(/.*@/, "");
			this.wait(2000);
			this.echo("Email: "+email+" Domain: "+domain+" Emails: "+emails+ " BlackList: "+blackList);
			this.wait(5000);
			/*blacklist = blacklist.split(",");*/
			this.echo("BlackList of casper args: "+ blackList);
		/**
		 * If the domain is in the blacklist I click to Junk to move to junk folder.
		 * @param  {Number} blacklist.indexOf(domain)! indexOf Method to know if in the blacklist or not.
		 */
		 if(blackList.indexOf(domain)!=-1){
			this.clickLabel("Junk");
			countToJunk++;
		 }
		});
		});
});
});
 casper.then(function(){

	this.wait(10000);
 });
};//End module Exports

exports.moveSpam = moveSpam;
/*Move out spam to inbox*/
var moveInbox = function(whiteList){

casper.then(function(){
results = this.evaluate(function(){
	ids = [];
	$.each($("div[autoid='_lvv_l'] > div > div > div > div > div"),function(x,y){
		ids.push($(y).attr("id"));
	});
	return ids;
});
utils.dump(results);
this.wait(2000);
});

casper.then(function(){
this.echo("Mails ID: "+JSON.stringify(results));
});

casper.then(function(){
this.each(results, function iterateids(self,id){
	casper.then(function thenIterate(){
		this.echo('div[id="'+id+'"] > div');
		this.click('div[id="'+id+'"] > div');
		/*this.mouse.click('div[id="'+id+'"] > div > span[autoid="_lvv_j"]');*/
	casper.wait(5000);
	});
	casper.then(function(){
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
this.wait(10000);
});

/*	}); // end casper.repeat
}); // casper.then*/

};//End export.module

exports.moveInbox = moveInbox;

var sendEmails = function(){

casper.repeat(2,function(){
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

exports.sendEmails = sendEmails;

var unsubscribe = function(whiteList,blackList){

casper.then(function(){
results = this.evaluate(function(){
	ids = [];
	$.each($("div[aria-label='conversation'] > div > div > div > div > div"),function(x,y){
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
				this.echo("Email: "+email+" Domain: "+domain+" Emails: "+emails+ " WhiteList: "+whiteList+ " BlackList: "+blackList);
				this.wait(5000);

				var isOnWhiteList = whiteList.indexOf(domain);
				var isOnBlackList = blackList.indexOf(domain);

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
this.wait(5000);
});
}; //End exports.module

exports.unsubscribe = unsubscribe;
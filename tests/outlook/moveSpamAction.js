/**
 * Outlook Casper's Bot that move emails from inbox to spam
 * @type {CasperJS Bot}
 */

exports.moveSpam = function(){

casper.then(function(){
results = this.evaluate(function(){
	ids = [];
	/**
	 * Jquery.Each function.
	 * @return {Array}
	 */
	 $.each($("div[autoid='_lvv_a'] > div"),function(x,y){
	/* $.each($("div[autoid='_lvv_9'] > div"),function(x,y){*/
		ids.push($(y).attr("id"));
	 });
	 return ids;
	});
utils.dump(results);
});

casper.then(function(){
this.echo("Mails ID: "+JSON.stringify(results));
});

/**
 * CasperJS Step to iterate over the ids emails search the email and extract the domain, if the domain match with a given blacklisted domain move the email to the Junk or Spam folder..
 */
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
		/**
		 * Casper.waitForSelector wait to the email document appear so I can click over the message and extract the email and find the domain.
		 */
		 this.waitForSelector("div[role='document']",function(){
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

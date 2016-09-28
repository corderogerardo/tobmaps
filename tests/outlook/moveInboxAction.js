// my module, stored in universe.js
// patching phantomjs' require()
var require = patchRequire(require);

// now you're ready to go
var utils = require('utils');
/**
 * Oulook Casper's Bot used to login into account and move
 * @type {CasperJS Bot}
 */

var moveInbox = function(){
casper.then(function(){
	this.waitForText("Junk Email", function(){
		this.clickLabel("Junk Email");
	});
	this.wait(3000);
	/*this.capture("ClickToJunt");*/
});

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
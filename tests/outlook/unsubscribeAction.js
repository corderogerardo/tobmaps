// patching phantomjs' require()
var require = patchRequire(require);
/**
 * Oulook Casper's Bot used to catch error when login
 * @type {CasperJS Bot}
 */

/**
 * Import CasperJS module and create an instance with configurations.
 */
exports.unsubscribe = function(){

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
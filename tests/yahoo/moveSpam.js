exports.moveSpamMessages = function(whiteList) {
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
};
		
'use strict';

Meteor.methods({
	 addBot:function(bot){
      //Bots.remove({});
      bot.createdOn = (new Date).toTimeString();
      return Bots.insert(bot);
    }
});
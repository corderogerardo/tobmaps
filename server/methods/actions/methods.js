'use strict';

Meteor.methods({
	 addBot:function(bot){
      //Bots.remove({});
      bot.createdOn = (new Date).toTimeString();
      return Actions.insert(bot);
    }
});
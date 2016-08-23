exec = Npm.require('child_process').exec;

Meteor.methods({
	'command' : function() {

    accounts = 
    [
      {user: "tobmaps@yahoo.com", pwd: "spamBOT-12345678"},
      {user: "tobmaps@yahoo.com", pwd: "spamBOT-12345678"}
    ];

    for (var i = 0; i < accounts.length; i++) {
        var username = accounts[i]["user"];
        var password = accounts[i]["pwd"];
        line = 'casperjs ../../../../../tests/yahoo/moveSpamAction.js yahoo.com outlook.com --username="'+username+'" --password="'+password+'" --engine=slimerjs';
        console.log("In command method", line);
        Fiber = Npm.require('fibers');
        exec(line, function(error, stdout, stderr) {
          console.log('Command Method', error, stdout, stderr);
          Fiber(function() {
            //Replies.remove({});
            var replyId = Replies.insert(
              { 
                message: stdout ? JSON.stringify(stdout) : JSON.stringify(stderr), 
                time_exec: (new Date).toTimeString(),
                domain: "@yahoo.com"
              });
            return replyId;  
          }).run();
        }); 
      };
    },
    addBot:function(bot){
      //Bots.remove({});
      bot.createdOn = (new Date).toTimeString();
      return Bots.insert(bot);
    }
});
exec = Npm.require('child_process').exec;
/**
 * define server methods so that the clients will have access to server components
 * @param  {[type]} command)       {								this.unblock();				var result         [description]
 * @param  {[type]} 'commandYahoo' :                                function(line) {               console.log("In command method", line);    Fiber [description]
 * @return {[type]}                [description]
 */
Meteor.methods({
	'command' : function(line) {
    console.log("In command method", line);
    Fiber = Npm.require('fibers');
    exec(line, function(error, stdout, stderr) {
      console.log('Command Method', error, stdout, stderr);
      Fiber(function() {
        Replies.remove({});
        var replyId = Replies.insert(
          { 
            message: stdout ? JSON.stringify(stdout) : JSON.stringify(stderr), 
            time_exec: (new Date).toTimeString(),
            domain: "@Yahoo.com"
          });
        return replyId;  
      }).run();
    }); 
  }
});
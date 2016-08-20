'use strict';
var process_exec_sync = function (command) {
	 // Load future from fibers
  var Future = Npm.require("fibers/future");
  // Load exec
  var child = Npm.require("child_process");
	// Create new future
	var future = new Future();
	// Run command synchronous
	child.exec(command, function(error, stdout, stderr) {
		// return an onbject to identify error and success
		var result = {};
		// test for error
		if (error) {
			result.error = error;
		}
		// return stdout
		result.stdout = stdout;
			future.return(result);
	});
	// wait for future
	return future.wait();
};

// define server methods so that the clients will have access to server components
Meteor.methods({
	runCasperJS: function(command) {
		// This method call won't return immediately, it will wait for the
		// asynchronous code to finish, so we call unblock to allow this client
		// to queue other method calls (see Meteor docs)
		this.unblock();
		// run synchonous system command
		var result = process_exec_sync(command);
		// check for error
		if (result.error) {
			throw new Meteor.Error("exec-fail", "Error running CasperJS: " + result.error.message);
		}
		// success
		return true;
	}
});
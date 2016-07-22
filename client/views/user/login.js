
/*Events*/

Template .loginForm.events({
	"submit .js-form-login":function(event){
		event.preventDefault();
		console.log("Click on login");
        Router.go('dashboard');
	}
});
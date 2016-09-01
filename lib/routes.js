Router.configure({
    layoutTemplate: 'mainLayout'
});

/*Login*/
Router.route('/', {
	layoutTemplate:'loginLayout',
	template:'loginTobMaps',
});
/*Logout*/
Router.route('logout', function(){
	Meteor.logout();
	this.redirect('/');
});
/**
 * Register form route
 * @type {String}
 */
Router.route('register', {
	layoutTemplate:'loginLayout',
	template:'registerTobmaps',
});

/**
 * Routes for register Actions/Bots
 */
Router.route('actions', {
	template:'actionsView',
});
/**
 * Routes for register Actions/Bots
 */
Router.route('domains', {
	template:'domainsView',
});
/**
 * Routes for register Actions/Bots
 */
Router.route('lists', {
	template:'listsView',
});
Router.route('schedulecreate', {
	template:'scheduleForm',
});
//
/*Start Route*/
/*
*	Routes in navigation template.
*	folder: client/views/common/navigation/navigation.html
*/
/*Dashboard Routes*/
Router.route('/:_id', function () {
	if(Meteor.user()){
		this.render('dashboardTobMaps');	
	}
	else {
		this.render('errorOne');
	}
}, {
  name: 'user.show'
});
/*Schedule Routes*/
Router.route('/:_id/schedule/view', function() {
	if(Meteor.user()){
		this.render('scheduleView');
	}
	else {
		this.render('errorOne');
	}
}, {
  name: 'scheduleView.show'
});
Router.route('/:_id/schedule/create', function() {
	this.render('scheduleFormView');
	if(Meteor.user()){
		this.render('scheduleCreate');	
	}
	else {
		this.render('errorOne');
	}
}, {
  name: 'scheduleFormView.show'
});
/*Users Route*/
Router.route('/:_id/users/register', function() {
	if(Meteor.user()){
		this.render('register');	
	}
	else {
		this.render('errorOne');
	}
}, {
  name: 'register.show'
});
/*Routes for accounts*/
Router.route('/:_id/accounts/yahoo', function() {
	if(Meteor.user()){
		this.render('addYahoo');	
	}
	else {
		this.render('errorOne');
	}
}, {
  name: 'yahoo.show'
});
Router.route('/:_id/accounts/gmail', function() {
	if(Meteor.user()){
		this.render('addGmail');	
	}
	else {
		this.render('errorOne');
	}
}, {
  name: 'gmail.show'
});
Router.route('/:_id/accounts/outlook', function() {
	if(Meteor.user()){
		this.render('addOutlook');	
	}
	else {
		this.render('errorOne');
	}
}, {
  name: 'outlook.show'
});
Router.route('/:_id/accounts/aol', function() {
	if(Meteor.user()){
		this.render('addAol');	
	}
	else {
		this.render('errorOne');
	}
}, {
  name: 'aol.show'
});
/*Routes for IMAP/SMTP Protocols*/
Router.route('imapsmtp', {
	template:'dashboardImapSmtp',
});
/*Routes for proxies*/
Router.route('proxies', {
	template:'dashboardProxies',
});


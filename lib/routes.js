Router.configure({
    layoutTemplate: 'mainLayout',
    notFoundTemplate: 'notFound'
});

/*Login*/
Router.route('login', {
	layoutTemplate:'loginLayout',
	template:'loginTobMaps',
});
/*Logout*/
Router.route('logout', function(){
	Meteor.logout();
	this.redirect('login');
});
/**
 * Register form route
 * @type {String}
 */
Router.route('register', {
	layoutTemplate:'loginLayout',
	template:'registerTobmaps',
});
//
/*Start Route*/
/*
*	Routes in navigation template.
*	folder: client/views/common/navigation/navigation.html
*/
/*Dashboard Routes*/
Router.route('/:_id', function () {
  this.render('dashboardTobMaps');
}, {
  name: 'user.show'
});
/*Schedule Routes*/
Router.route('schedule', {
	template:'schedule',
});
Router.route('/:_id/schedule/view', function() {
	this.render('scheduleView');
}, {
  name: 'scheduleView.show'
});
Router.route('schedule/create', {
	template:'scheduleCreate',
});
/*Users Route*/
Router.route('/:_id/users/register', function() {
	this.render('register');
}, {
  name: 'register.show'
});
/*Routes for accounts*/
Router.route('/:_id/accounts/yahoo', function() {
	this.render('addYahoo');
}, {
  name: 'yahoo.show'
});
Router.route('/:_id/accounts/gmail', function() {
	this.render('addGmail');
}, {
  name: 'gmail.show'
});
Router.route('/:_id/accounts/outlook', function() {
	this.render('addOutlook');
}, {
  name: 'outlook.show'
});
Router.route('/:_id/accounts/aol', function() {
	this.render('addAol');
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

/**
 * Routes for create actions Bots
 */
Router.route('createactions', {
	template:'botCreate',
});
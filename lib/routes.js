Router.configure({
    layoutTemplate: 'mainLayout',
    notFoundTemplate: 'notFound'
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
//
/*Start Route*/
/*
*	Routes in navigation template.
*	folder: client/views/common/navigation/navigation.html
*/
/*Dashboard Routes*/
Router.route('dashboard', {
		template:'dashboardTobMaps',
});
/*Schedule Routes*/
Router.route('schedule', {
	template:'schedule',
});
Router.route('schedule/view', {
	template:'scheduleView',
});
Router.route('schedule/create', {
	template:'scheduleCreate',
});
/*Users Route*/
Router.route('users', {
	template:'profile',
});
/*Routes for accounts*/
Router.route('accounts/yahoo',{
	template:'addYahoo',
});
Router.route('accounts/gmail',{
	template:'addGmail',
});
Router.route('accounts/outlook',{
	template:'addOutlook',
});
Router.route('accounts/aol',{
	template:'addAol',
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
	template:'addBot',
});
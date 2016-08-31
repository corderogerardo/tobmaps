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
Router.route('schedule/view', {
	template:'scheduleView',
});
Router.route('schedule/create', {
	template:'scheduleFormView',
});
/*Users Route*/
Router.route('users/register', {
  template:'register',
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


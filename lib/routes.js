Router.configure({
    layoutTemplate: 'mainLayout',
    notFoundTemplate: 'notFound'
});

//
/*Start Route*/
Router.route('/', {
	template:'pageOne',
});
/*
*	Routes in navigation template.
*	folder: client/views/common/navigation/navigation.html
*/
/*Dashboard Routes*/
Router.route('dashboard', {
	template:'dashboard',
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
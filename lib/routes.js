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
Router.route('/:_id/actions', function() {
	if(Meteor.user()){
		this.render('actionsView');
	}
	else {
		this.render('errorOne');
	}
}, {
	name: 'actions.show'
});
/**
 * Routes for register Actions/Bots
 */
Router.route('/:_id/domains', function() {
	if(Meteor.user()){
		this.render('domainsView');
	}
	else {
		this.render('errorOne');
	}
}, {
	name: 'domains.show'
});
/**
 * Routes for register Actions/Bots
 */
Router.route('/:_id/lists', function() {
	if(Meteor.user()){
		this.render('listsView');
	}
	else {
		this.render('errorOne');
	}
}, {
	name: 'lists.show'
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
	if(Meteor.user()){
		this.render('scheduleFormView');
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
Router.route('/:_id/users/view', function() {
	if(Meteor.user()){
		this.render('usersTable');
	}
	else {
		this.render('errorOne');
	}
}, {
	name: 'usersView.show'
});
/*Routes for accounts*/
Router.route('/:_id/accounts/yahooNew', function() {
	if(Meteor.user()){
		this.render('yahooForm');
	}
	else {
		this.render('errorOne');
	}
}, {
	name: 'yahoo.show-add'
});
Router.route('/:_id/accounts/yahooList', function() {
	if(Meteor.user()){
		this.render('yahooTables');
	}
	else {
		this.render('errorOne');
	}
}, {
	name: 'yahoo.show-view'
});
Router.route('/:_id/accounts/gmailNew', function() {
	if(Meteor.user()){
		this.render('gmailForm');
	}
	else {
		this.render('errorOne');
	}
}, {
	name: 'gmail.show-add'
});
Router.route('/:_id/accounts/gmailList', function() {
	if(Meteor.user()){
		this.render('gmailTables');
	}
	else {
		this.render('errorOne');
	}
}, {
	name: 'gmail.show-view'
});
Router.route('/:_id/accounts/outlookNew', function() {
	if(Meteor.user()){
		this.render('outlookForm');
	}
	else {
		this.render('errorOne');
	}
}, {
	name: 'outlook.show-add'
});
Router.route('/:_id/accounts/outlookList', function() {
	if(Meteor.user()){
		this.render('outlookTables');
	}
	else {
		this.render('errorOne');
	}
}, {
	name: 'outlook.show-view'
});
Router.route('/:_id/accounts/aolNew', function() {
	if(Meteor.user()){
		this.render('aolForm');
	}
	else {
		this.render('errorOne');
	}
}, {
	name: 'aol.show-add'
});
Router.route('/:_id/accounts/aolList', function() {
	if(Meteor.user()){
		this.render('aolTables');
	}
	else {
		this.render('errorOne');
	}
}, {
	name: 'aol.show-view'
});
/*Routes for IMAP/SMTP Protocols*/
Router.route('imapsmtp', {
	template:'dashboardImapSmtp',
});
/*Routes for proxies*/
Router.route('proxies', {
	template:'dashboardProxies',
});


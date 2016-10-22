/**
 * @memberOf Router
 * @name  Routes
 * @locus lib/router
 * @summary Router runs on the client and server side, we create routes on the client, this make the app really be fast once it's loaded, 
 * when the session doesn't exist redirect to 404 response page was not found for the given url
 *
 * @param {Router.configurate} layoutTemplate
 * We used a default layout template for all routes to configure a global router option
 *
 * @param {Router.route} /:_id/module/operation
 * We put the templates defined into their respective region for the route, we used this.render option method, Usually 
 * we want to render a template when the user goes to a particular url
 * 
 */
Router.configure({
		layoutTemplate: 'mainLayout'
});
Router.route('/', {
	layoutTemplate:'loginLayout',
	template:'loginTobMaps',
});
Router.route('logout', function(){
	Meteor.logout();
	this.redirect('/');
});
Router.route('register', {
	layoutTemplate:'loginLayout',
	template:'registerTobmaps',
});
Router.route('/:_id/actions/new', function() {
	if(Meteor.user()){
		this.render('actionsFormView');
	}
	else {
		this.render('errorOne');
	}
}, {
	name: 'actions.show-add'
});
Router.route('/:_id/actions/list', function() {
	if(Meteor.user()){
		this.render('actionsView');
	}
	else {
		this.render('errorOne');
	}
}, {
	name: 'actions.show-view'
});
Router.route('/:_id/domains/new', function() {
	if(Meteor.user()){
		this.render('domainsFormView');
	}
	else {
		this.render('errorOne');
	}
}, {
	name: 'domains.show-add'
});
Router.route('/:_id/domains/list', function() {
	if(Meteor.user()){
		this.render('domainsView');
	}
	else {
		this.render('errorOne');
	}
}, {
	name: 'domains.show-view'
});
Router.route('/:_id/lists/new', function() {
	if(Meteor.user()){
		this.render('listFormView');
	}
	else {
		this.render('errorOne');
	}
}, {
	name: 'lists.show-add'
});
Router.route('/:_id/lists/list', function() {
	if(Meteor.user()){
		this.render('listsView');
	}
	else {
		this.render('errorOne');
	}
}, {
	name: 'lists.show-view'
});
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
Router.route('/:_id/schedule/activities', function() {
	if(Meteor.user()){
		this.render('scheduleActivity');
	}
	else {
		this.render('errorOne');
	}
}, {
	name: 'schedule.show-activities'
});
Router.route('/:_id/schedule/new', function() {
	if(Meteor.user()){
		this.render('scheduleFormView');
	}
	else {
		this.render('errorOne');
	}
}, {
	name: 'schedule.show-add'
});
Router.route('/:_id/schedule/view', function() {
	if(Meteor.user()){
		this.render('scheduleViewTable');
	}
	else {
		this.render('errorOne');
	}
}, {
	name: 'schedule.show-view'
});
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
Router.route('/:_id/proxies/newproxy',function() {
	if(Meteor.user()){
		this.render('proxyForm');
	}
	else {
		this.render('errorOne');
	}
}, {
	name: 'proxies.show-form'
});
Router.route('/:_id/proxies/proxyview',function() {
	if(Meteor.user()){
		this.render('proxyTable');
	}
	else {
		this.render('errorOne');
	}
}, {
	name: 'proxies.show-view'
});
Router.route('imapsmtp', {
	template:'dashboardImapSmtp',
});
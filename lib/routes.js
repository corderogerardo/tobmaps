Router.configure({
    layoutTemplate: 'mainLayout',
    notFoundTemplate: 'notFound'
});

//
/*Start Route*/
Router.route('/', {
	template:'pageOne',
});
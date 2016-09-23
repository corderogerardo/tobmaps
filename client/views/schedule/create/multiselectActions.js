/**
 * @summary Meteor Subscribe is the way we use to take the data from publications and pass to client user template.
 * @param  {[type]} ){	return Actions.find().fetch();} [description]
 * @return {[type]}            [description]
 */
 Meteor.subscribe("actions", function(){
	return Actions.find().fetch();
 });

/**
 * @summary Meteor Blaze Template multiselectActions Helpers
 * @param  {Actions} bots Get all the actions passed from publications.
 *
 */
 Template.multiselectActions.helpers({
	bots:function(){
		return Actions.find().fetch();
	}
 });
/**
 * @summary Meteor Blaze Template multiselectActions onRendered
 *
 */
Template.multiselectActions.onRendered(function () {

	var multiselect = document.querySelector('#actionsBot');
	multiselect.addEventListener('change', function() {
		console.log('Selected items:', this.selectedItems());
	});

});
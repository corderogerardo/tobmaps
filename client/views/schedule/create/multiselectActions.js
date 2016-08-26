Meteor.subscribe("bots", function(){
	return Bots.find().fetch();
});

Template.multiselectActions.helpers({
	bots:function(){
		return Bots.find().fetch();
	}
});

Template.multiselectActions.onRendered(function () {

var multiselect = document.querySelector('#actionsBot');
	multiselect.addEventListener('change', function() {
  console.log('Selected items:', this.selectedItems());
});

});
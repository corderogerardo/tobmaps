/**
 * @summary Meteor Blaze Template schedulesForm onRendered
 * I used to initialize the Select Multiple Jquery chosen-select element into the DOM.
 * [onRendered I create a configuration variable then with a for pass the configuration to the select element]
 * This can be a good place to apply any DOM manipulations you want, after the template is rendered for the first time.
 */
Template.schedulesForm.onRendered(function(){
	var config = {
				'.chosen-select'           : {},
				'.chosen-select-deselect'  : {allow_single_deselect:true},
				'.chosen-select-no-single' : {disable_search_threshold:10},
				'.chosen-select-no-results': {no_results_text:'Oops, nothing found!'},
				'.chosen-select-width'     : {width:"95%"}
		};
		for (var selector in config) {
				$(selector).chosen(config[selector]);
		}
});

/**
 * @summary    Meteor Subscriptions for Schedule View on client side.
 *
 * Actions will bring all the actions available in collection.
 * Lists will bring all the lists that the logged user has created, filtered by userId.
 * Domains will bring all the domains that the logged user has created, filtered by userId.
 */
Meteor.subscribe("actions");
Meteor.subscribe("lists");
Meteor.subscribe("domains");

/**
 * @summary Meteor Blaze Template schedulesForm Helpers
 * A helper is like an object assign to a template that we can use to pass data to the form, a helper structure is like a JSON Object.
 *
 * @var        {Array} actions
 * We use actions variable to save the definable actions to be shown to the user and be selected, we use this data of actions in the HTML template to fill a select input.
 *
 * @var        {Array} whitelist and blacklist
 * We use this variable to save the whitelists that logged user has created, and be shown to the user to be selected, we use this data of whitelists in the HTML template to fill a select input.
 *
 * @var        {Array} hours
 * We use this variable to create the static data for hours of the day from 0 to 23, we need this data be passed to the schedule form so the user will be available of select the hours the user needs to be active the Schedule.
 * We
 *
 */
Template.schedulesForm.helpers({
	actions:function(){
		return Actions.find().map(function(c){
			return{label:c.name,value:c._id};
		});
	},
	whitelist:function(){
		return Lists.find({
			$or:[
				{
				typelist:'whiteList'
				}
			]
		}).map(function(c){
			return {label:c.listname,value:c._id};
		});
	},
	blacklist:function(){
		return Lists.find({
			$or:[
				{
				typelist:'blackList'
				}
			]
		}).map(function(c){
			return {label:c.listname,value:c._id};
		});
	},
	hours: function(){
		var arr = [];
		for(var i =0;i<24;i++){
			arr.push({label:i+":00",value:i});
		}
		return arr;
	},
	minutes: function(){
		var arr = [];
		for(var i=0;i<60;i++){
			arr.push(i);
			i+=10;
		}
		return arr;
	}
});

/**
 * @summary Meteor Blaze Template actionForm Events
 * Here I create an event handler to listen then the user click on cancel button to reset form.
 */
Template.schedulesForm.events({
	'click button[type=reset]':function(event){
		event.preventDefault();
		$('.chosen-select').val('').trigger('chosen:updated');
		$('#schedulesForm').trigger('reset');
		$('#schedulesForm > button[type="submit"]').removeAttr('disabled');
	}
});
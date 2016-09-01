Meteor.subscribe("actions");
Meteor.subscribe("lists");
Meteor.subscribe("domains");

Template.scheduleForm.helpers({
	actions:function(){
		return Actions.find().map(function(c){
			return{label:c.name,value:c._id};
		});
	},
	whitelist:function(){
		return Lists.find({
			$or:[
				{
				typelist:whiteList
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
				typelist:blackList
				}
			]
		}).map(function(c){
			return {label:c.listname,value:c._id};
		});
	},
	hours: function(){
		var arr = [];
		for(var i =0;i<24;i++){
			arr.push(i);
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

Template.scheduleForm.events({
	"submit .js-form-schedule":function(event){
		event.preventDefault();
		var name = $('#nameSchedule').val();
		var description = $('#descriptionSchedule').val();
		var days = [];
		var hours = [];
		var actions = [];
		$('.switch input').each(function(index){
				days.push($(this).is(":checked"));
		});
		var omultiselect = document.querySelector('#scheduleHours');
		var multiselect = document.querySelector('#actionsBot');
		hours = omultiselect.selectedItems();
		actions = multiselect.selectedItems();
		var awakening = $('#awakening').val();
		var scheduleForm = {
			name:name,
			description:description,
			days:days,
			hours:hours,
			awakening:awakening,
			actions:actions,
		};

		Meteor.call('insertSchedule',Session.get('userId'),scheduleForm);

		$('.js-form-schedule').trigger("reset");

	}
});
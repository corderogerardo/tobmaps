Meteor.subscribe("actions");
Meteor.subscribe("lists");
Meteor.subscribe("domains");

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
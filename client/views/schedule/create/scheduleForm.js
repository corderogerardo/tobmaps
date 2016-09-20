Template.schedulesForm.rendered = function(){
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
};

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
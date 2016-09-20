
Template.listsForm.rendered = function(){
	var config = {
				'.chosen-select2'           : {},
				'.chosen-select-deselect'  : {allow_single_deselect:true},
				'.chosen-select-no-single' : {disable_search_threshold:10},
				'.chosen-select-no-results': {no_results_text:'Oops, nothing found!'},
				'.chosen-select-width'     : {width:"95%"}
		};
		for (var selector in config) {
				$(selector).chosen(config[selector]);
		}
};

Meteor.subscribe("domains");

Template.listsForm.helpers({
	listDomains:function(){
		return Domains.find().map(function (c) {
			return {label: c.domain, value: c.domain};
		});
	}
});
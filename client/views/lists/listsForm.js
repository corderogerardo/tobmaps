Meteor.subscribe("domains");

Template.listsForm.helpers({
	listDomains:function(){
		return Domains.find().map(function (c) {
			return {label: c.domain, value: c.domain};
		});
	}
});
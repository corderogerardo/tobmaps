Meteor.subscribe("domains");

Template.domainsTable.helpers({
		domains:function(){
				return Domains.find().fetch();
		}
});
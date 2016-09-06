Meteor.subscribe("domains");

Template.domainsTable.helpers({
	domains:function(){
		return Domains.find().fetch();
	}
});

Template.domainsTable.events({
	"click .js-delete-domain":function(){
		if(Meteor.user()){
			var domain_id = this._id;
			Meteor.call("removeDomain",domain_id, function(err,res){
				if(err){
					console.log("Error "+err);
					toastr.error('Hi '+Meteor.user().emails[0].address+'. '+err,'Domain could not be deleted!');
				}else{
					console.log("Success "+res);
					toastr.success('Hi '+Meteor.user().emails[0].address+'. You have deleted this Domain.','Domain deleted!');
				}
			});
		}
	}
});
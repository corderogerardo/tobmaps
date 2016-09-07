Meteor.subscribe("lists");

Template.listsTable.helpers({
	listsData:function(){
		return Lists.find().fetch();
	},
	userCanEdit : function() {
		if(Meteor.user()){
			return true;
		}else{
			return false;
		}
	}
});

Template.listsTable.events({
	"click .js-delete-list":function(){
		if(Meteor.user()){
			var list_id= this._id;
			console.log(list_id);
			Meteor.call("removeList",list_id,function(err,res){
				if(err){
					console.log("Error "+err);
					toastr.error('Hi '+Meteor.user().emails[0].address+'. '+err,'List could not be deleted!');
				}else{
					console.log("Success "+res);
					toastr.success('Hi '+Meteor.user().emails[0].address+'. You have deleted this List.','List deleted!');
				}
			});
		}
	}
});
Meteor.subscribe("actions");

Template.actionTable.helpers({
	actionsdata:function(){
		return Actions.find().fetch();
	},
	userCanEdit : function() {
		return this.userId === Meteor.userId();
	}
});

Template.actionTable.events({
	"click .js-delete-action":function(){
		if(Meteor.user()){
			var id = $(".js-delete-action").val();
			Meteor.call("removeAction",id, function(err,res){
				if(err){
					console.log("Error "+err);
					toastr.error('Hi '+Meteor.user().emails[0].address+'. '+err,'Action could not be deleted!');
				}else{
					console.log("Success "+res);
					toastr.success('Hi '+Meteor.user().emails[0].address+'. You have deleted this action.','Action deleted!');
				}
			});
		}
	}
});
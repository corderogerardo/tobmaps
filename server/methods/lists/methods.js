Meteor.methods({
	insertList:function(listf,userId){
		if(this.userId){
			listf.createdOn = new Date();
			listf.createdBy = this.userId;
			Lists.insert(listf);
		}
	},
});
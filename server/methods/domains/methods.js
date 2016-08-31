Meteor.methods({
	insertDomain:function(domf,userId){
		if(this.userId){
			var dom = Domains.findOne({
				domain:domf.domain
			});
			if(!dom){
				domf.createdOn = new Date();
				domf.createdBy = this.userId;
				return  Domains.insert(domf);
			}
		}
	}
});
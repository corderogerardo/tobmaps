Meteor.methods({
	insertDomain:function(domf){
		if(!this.userId){
			throw new Meteor.Error('not-authorized');
		}
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
	},
	updateDomain:function(domf){
		if(!this.userId){
			throw new Meteor.Error('not-authorized');
		}
		if(this.userId){
			check(domf._id,String);
			check(domf.domain,String);
		}
	},
	removeDomain:function(domf){
		if(!this.userId){
			throw new Meteor.Error('not-authorized');
		}
		if(this.userId){
			check(domf._id,String);
		}
	}
});
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
				check(domf.domain,String);
				domf.createdOn = new Date();
				domf.createdBy = this.userId;
				return  Domains.insert(domf);
			}
		}
	},
	updateDomain:function(doc){
		console.log(arguments);
		if(!this.userId){
			throw new Meteor.Error('not-authorized');
		}
		if(this.userId){
			var domainFind = Domains.findOne({domain:doc.domain});
			check(domainFind._id,String);
			check(doc.domain,String);
			return Domains.update(domainFind._id,{$set:{
				domain:doc.domain,
			}});
		}
	},
	removeDomain:function(domid){
		if(!this.userId){
			throw new Meteor.Error('not-authorized');
		}
		if(this.userId){
			check(domid,String);
			return Domains.remove(domid);
		}
	}
});
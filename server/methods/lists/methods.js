Meteor.methods({
	insertList:function(listf){
		if(!this.userId){
			throw new Meteor.Error('not-authorized');
		}
		if(this.userId){
			check(listf.listname,String);
			check(listf.typelist,String);
			check(listf.domains,Array);
			listf.createdOn = new Date();
			listf.createdBy = this.userId;
			Lists.insert(listf);
		}
	},
	updateList:function(doc){
		if(!this.userId){
			throw new Meteor.Error('not-authorized');
		}
		if(this.userId){
			check(doc.listname,String);
			check(doc.typelist,String);
			check(doc.domains,Array);
			return Lists.update(_id,{$set:{
				listname:doc.listname,
				typelist:doc.typelist,
				domains:doc.domains,
			}});
		}
	},
	removeList:function(listid){
		if(!this.userId){
			throw new Meteor.Error('not-authorized');
		}
		if(this.userId){
			check(listid,String);
			return Lists.remove(listid);
		}
	}
});
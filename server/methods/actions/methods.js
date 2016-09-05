Meteor.methods({
	addAction:function(doc){
		// Make sure the user is logged in before inserting a task
		if(!this.userId){
			throw new Meteor.Error('not-authorized');
		}
		if(this.userId){
			doc.createdOn = new Date();
			return Actions.insert(doc);
		}
	},
	updateAction:function(doc){
		// Make sure the user is logged in before inserting a task
		if(!this.userId){
			throw new Meteor.Error('not-authorized');
		}
		if(this.userId){
			var userFind = Actions.findOne({name:doc.name});
			check(userFind._id,String);
			check(doc.name, String);
			check(doc.description,String);
			check(doc.isp,String);
			check(doc.typelist,String);
				return Actions.update(userFind._id,{$set:{
					name:doc.name,
					description:doc.description,
					isp:doc.isp,
					typelist:doc.typelist,
					createdOn:new Date(),
				}});
		}
		},
		removeAction: function(id){
			if (! this.userId) {
				throw new Meteor.Error('not-authorized');
			}
			if(this.userId){
				Actions.remove(id);
			}
		}
});
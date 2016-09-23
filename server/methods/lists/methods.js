/**
 * @summary    Meteor Server Side Methods for Lists Module
 * insertList: Method used to insert new Lists, first we check if there is an user logged in, if does then check the data integrity that comes from the form object if pass validations then insert List.
 * @param      {User Object} userId from logged user
 * @param      {Action Object} from the Action Form
 * @return {Boolean} Return true if the schedule was inserted correctly, false if does not.
 *
 * removeList: Method used to remove Lists, first we check if there is an user logged in, if does then check the data integrity that comes from the form object if pass validations then Delete List.
 * @param  {String} id of the actual List
 * @return {Boolean} Return true if the schedule was inserted correctly, false if does not.
 */
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
			return Lists.insert(listf);
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
/**
 *
 * @summary    Lists Module - Server side Meteor Method for Lists
 * @module     Lists
 *
 * Here you will find the methods for:
 * 1. Add new Lists-insertList.
 * 2. Update Lists-updateList.
 * 3. Remove Lists-removeList.
 *
 * Meteor general methods.
 * @method check() from Meteor is used to validate data integrity and be sure that the data type is the same from the collection.
 *
 */
Meteor.methods({
	/**
	 * @method 1.insertList: Method used to insert new Lists, first we check if there is an user logged in, if does then check the data integrity that comes from the form object if pass validations then insert List.
	 *
	 * @param      {User Object} userId from logged user
	 * @param      {Action Object} from the Action Form
	 * @return {Boolean} Return true if the schedule was inserted correctly, false if does not.
	 *
	 */
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
	/**
	 * @method 3. removeList: Method used to remove Lists, first we check if there is an user logged in, if does then check the data integrity that comes from the form object if pass validations then Delete List.
	 * @param  {String} id of the actual List
	 * @return {Boolean} Return true if the schedule was inserted correctly, false if does not.
	 *
	 * Extra validation we search for the id of the lists inside the Schedule collection, if a list is in use you should not be able to delete the list.
	 *
	 * @Meteor exception the throw new Meteor.Error return a message to the user if the list is been used in a schedule or several.
	 *
	 */
	removeList:function(listid){
		if(!this.userId){
			throw new Meteor.Error('not-authorized');
		}
		if(this.userId){
			check(listid,String);
			var whiteSchedules = Schedules.findOne({
				whitelist:listid,
			});
			var blackSchedules = Schedules.findOne({
				blacklist:listid,
			});
				if(whiteSchedules || blackSchedules){
					throw new Meteor.Error('The List can not be deleted because is been used in a Schedule.');
				}
			return Lists.remove(listid);
		}
	}
});
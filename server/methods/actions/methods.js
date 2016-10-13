/**
 * @summary    Actions Module - Server side Meteor Method for Actions
 * @module     Actions
 *
 * Here you will find the methods for:
 * 1. Add new Actions-addAction.
 * 2. Update actions-updateAction.
 * 3. Remove Actions-removeAction.
 *
 * Meteor general methods.
 * @method check() from Meteor is used to validate data integrity and be sure that the data type is the same from the collection.
 *
 */
Meteor.methods({
	/**
	 * @method 1. addAction: Method used to insert new actions, first we check if there is an user logged in, if does then check the data integrity that comes from the form object if pass validations then insert action.
	 * @param      {User Object} userId from logged user for validations.
	 * @param      {Action Object} from the Action Form.
	 * @return {Boolean} Return true if the schedule was inserted correctly, false if does not.
	 */
	addAction:function(doc){
		// Make sure the user is logged in before inserting a task
		if(!this.userId){
			throw new Meteor.Error('not-authorized');
		}
		if(this.userId){
			check(doc.name,String);
			check(doc.actions,Array);
			check(doc.description,String);
			check(doc.isp,String);
			doc.createdOn = new Date();
			doc.createdBy = this.userId;
			return Actions.insert(doc);
		}
	},
	updateAction:function(doc){
		// Make sure the user is logged in before inserting a task
		if(!this.userId){
			throw new Meteor.Error('not-authorized');
		}
		if(this.userId){
			var actionFind = Actions.findOne({name:doc.name});
			// Check() for checking integrity type of data that comes from form client.
			check(actionFind._id,String);
			check(doc.name,String);
			check(doc.actions,Array);
			check(doc.description,String);
			check(doc.isp,String);
				return Actions.update(actionFind._id,{$set:{
					name:doc.name,
					description:doc.description,
					isp:doc.isp,
					typelist:doc.typelist,
					createdOn:new Date(),
				}});
		}
		},
		/**
		 * @method 3. removeAction: Method used to remove actions, first we check if there is an user logged in, if does then check the data integrity that comes from the form object if pass validations then Delete action.
		 * @param  {String} id of the actual action
		 * @return {Boolean}    True or False
		 */
		removeAction: function(id){
			if (! this.userId) {
				throw new Meteor.Error('not-authorized');
			}
			if(this.userId){
				check(id,String);
				var scheduleAction = Schedules.findOne({
					actions:id
				});
				if(scheduleAction){
					throw new Meteor.Error('The action can not be deleted because is been used in a Schedule.');
				}

				return Actions.remove({_id:id});
			}
		}
});
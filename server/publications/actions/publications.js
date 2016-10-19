/**
 * @memberOf Actions
 * @name  Publications
 * @locus server/publications/actions
 * @summary ActionsPublication - Server side Meteor Publications for Actions
 *
 * @param {MeteorPublication} actions
 * Here you will find the Meteor mongodb query to fetch all the actions data that belongs to the user session, to be passed to client and be used in the blaze templates.
 *
 */
Meteor.publish("actions", function(){
	if(this.userId){
		return Actions.find({
			$or:[
			{
				createdBy:this.userId,
			}
			]
		});
	}
});
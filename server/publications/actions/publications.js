/**
 * @summary    Actions Module - Server side Meteor Publications for Actions
 * @module     Actions
 *
 * Here you will find the Meteor mongodb query to fetch all the actions data that belongs to the user session.
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
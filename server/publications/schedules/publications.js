/**
 * @global
 * @memberof   Schedules
 * @name       -Publications
 * @locus server/publications/schedules
 * @summary    Schedules Module - Server side Meteor Publications for Schedules
 *
 * @param {MeteorPublication} schedules
 * Here you will find the Meteor mongodb query to fetch all the schedules data that belongs to the user session, to be passed to client and be used in the blaze templates.
 *
 */
Meteor.publish('schedules', function(){
	if(this.userId){
		return Schedules.find({
			$or:[
				{
					createdBy:this.userId
				}
			]
		});
	}
});
Meteor.publish('actionsBots', function(){
	if(this.userId){
		return Actions.find({

		});
	}
});
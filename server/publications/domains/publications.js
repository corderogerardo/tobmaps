/**
 * @summary    Domains Module - Server side Meteor Publications for Domains
 * @module     Domains
 *
 * Here you will find the Meteor mongodb query to fetch all the domains data that belongs to the user session.
 *
 */
Meteor.publish('domains', function(){
	if(this.userId){
		return Domains.find({
			$or:[
				{
					createdBy:this.userId,
				}
			]
		});
	}
});
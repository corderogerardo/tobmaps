/**
 * @memberOf Proxies
 * @name  Publications
 * @locus server/publications/proxies
 * @summary    Proxies Module - Server side Meteor Publications for Proxies
 *
 * @param {MeteorPublication} proxies
 * Here you will find the Meteor mongodb query to fetch all the actions data that belongs to the user session.
 *
 */
Meteor.publish('proxies', function(){
	if(this.userId){
		return Proxies.find({
			$or:[
			{
				createdBy:this.userId,
			}
			]
		});
	}
});
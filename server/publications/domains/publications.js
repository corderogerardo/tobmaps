/**
 * @memberOf Domains
 * @name  Publications
 * @locus server/publications/domains
 * @summary    DomainsPublication- Server side Meteor Publications for Domains
 *
 *@param {MeteorPublication} domains
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
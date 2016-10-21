/**
 * @memberOf Lists
 * @name  Publications
 * @locus server/publications/lists
 * @summary    ListsPublications - Server side Meteor Publications for Lists

 * @param {MeteorPublication} lists
 * Here you will find the Meteor mongodb query to fetch all the lists data that belongs to the user session.
 *
 */
Meteor.publish('lists', function(){
	if(this.userId){
		return Lists.find({
			$or:[
				{
					createdBy:this.userId,
				}
			]
		});
	}
});
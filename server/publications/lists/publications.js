/**
 * @summary    Lists Module - Server side Meteor Publications for Lists
 * @module     Lists
 *
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
/**
 * @memberOf Emails
 * @name  Publications
 * @locus server/publications/emails
 * @summary Emails Publications - Server side Meteor Publications for Emails
 *
 * @param {MeteorPublication} emails
 * Here you will find the Meteor mongodb query to fetch all the emails data that belogs to the user session, to be passed to the client and be used in the blaze templates.
 *
 */
Meteor.publish('emails', function(){
	if(this.userId){
		return Emails.find({
			$or:[
				{
					createdBy:this.userId,
				}
			]
		});
	}
});
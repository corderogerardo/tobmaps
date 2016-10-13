/**
 * @summary    Emails Module - Server side Meteor Publications for Emails
 * @module     Emails
 *
 * Here you will find the Meteor mongodb query to fetch all the emails data that belongs to the user session.
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
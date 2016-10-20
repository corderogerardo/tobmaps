/**
 * @memberOf Accounts
 * @name  Publications
 * @locus server/publications/accounts
 * @summary Accounts Publications - Server side Meteor Publications for Accounts
 *
 * @param {MeteorPublication} userData
 * Here you will find the Meteor mongodb query to fetch all the accounts data, to be passed to the client and be used in the blaze templates.
 *
 */
Meteor.publish("userData", function () {
	return Meteor.users.find();
});
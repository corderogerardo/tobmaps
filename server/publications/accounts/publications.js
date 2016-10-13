/**
 * @summary    Users Accounts Module - Server side Meteor Publications for Users
 * @module     UsersAccounts
 *
 * Here you will find the Meteor mongodb query to fetch all the users data, only for Admin user.
 *
 */
Meteor.publish("userData", function () {
	return Meteor.users.find();
});
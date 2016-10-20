/**
 * @global
 * @name  Emails
 * @locus lib/collections/emails
 *
 * @summary Constructor for Emails Collection -
 * Variable to assign and create the Mongo Collection Emails.
 *
 * @param {Instance} SimpleSchema
 * Emails.attachSchema defined the email object.
 */
Emails = new Mongo.Collection("emails");

Emails.attachSchema(new SimpleSchema({
	email:{
		type:String,
		regEx: SimpleSchema.RegEx.Email,
		optional:false
	},
	password:{
		type:String,
		min: 6,
		optional:false,
	},
	imap:{
		type:String,
		optional:true
	},
	typeDomain:{
		type:String,
		optional:true
	},
	accesible:{
		type:Boolean,
		optional:true
	},
	dailylimit:{
		type:String,
		optional:true
	},
	createdOn:{
		type:String,
		optional:true
	},
	createdBy:{
		type:String,
		optional:true
	}
}));
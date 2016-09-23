/**
 * Variable to assign and create the Mongo Collection Accounts.
 * @type {Mongo}
 */
Emails = new Mongo.Collection("emails");
/**
 * attachSchema: We defined the email object that we are going to allow and validate against schema.
 * @type {Object}
 */
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
	createdOn:{
		type:String,
		optional:true
	},
	createdBy:{
		type:String,
		optional:true
	}
}));
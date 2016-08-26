/**
 * Variable to assign and create the Mongo Collection Accounts.
 * @type {Mongo}
 */
Accounts = new Mongo.Collection("accounts");
/**
 * attachSchema: We defined the email object that we are going to allow and validate against schema.
 * @type {Object}
 */
Accounts.attachSchema(new SimpleSchema({
	email:{
		type:String,
		regEx: SimpleSchema.RegEx.Email,
		optional:false
	},
	password:{
		type:String,
		min: 8,
		optional:false,
	},
	imap:{
		type:Boolean,
		optional:true
	},
	user_id:{
		type:String,
		optional:false
	},
	createdOn:{
		type:Date,
		optional:true
	}
}));
/**
 * The allow method
 * Here we said what CRUD operation are we going to permit on server side if there is an user logged in
 * you can insert, update or remove.
 */


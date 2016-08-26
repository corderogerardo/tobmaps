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
		min: 8,
		optional:false,
	},
	imap:{
		type:Boolean,
		optional:true
	},
	createdOn:{
		type:Date,
		label:"Date",
		optional:true
	},
	createdBy:{
		type:String,
		label:"user_id",
		optional:true
	},
}));
/**
 * The allow method
 * Here we said what CRUD operation are we going to permit on server side if there is an user logged in
 * you can insert, update or remove.
 */
Emails.allow({
	insert: function(userId, email){
		if(Meteor.user()){
			return true;
		}else{
			return false;
		}
	},
	remove: function(){
		if(Meteor.user()){
			return true;
		}else{
			return false;
		}
	}
});
Emails = new Mongo.Collection("emails");

Emails.attachSchema(new SimpleSchema({
	email:{
		type:String,
		label:"email",
		optional:false
	},
	password:{
		type:String,
		label:"password",
		optional:false,
	},
	domain:{
		type:String,
		label:"domain",
		optional:true,
	},
	accesible:{
		type:Boolean,
		label:"Accesable",
		optional:true
	},
	createdOn:{
		type:Date,
		label:"Date",
		optional:true
	},
}));
Emails.allow({
	insert: function(email){
			return true;
	},
	remove: function(){
		if(Meteor.user()){
			return true;
		}else{
			return false;
		}
	}
});
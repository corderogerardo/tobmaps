/**
 * Variable to assign and create the Mongo Collection Schedules.
 * @type {Mongo}
 */
var Schedules = new Mongo.Collection('schedules');
/**
 * attachSchema: We defined the schedule object that we are going to allow and validate against schema.
 * @type {Object}
 */
Schedules.attachSchema(new SimpleSchema({
	name:{
		type:String,
		label:"Name",
		optional:false
	},
	description:{
		type:String,
		label:"Description",
		optional:false,
	},
	time:{
		type:[Boolean],
		label:"Time",
		optional:false,
	},
	days:{
		type:[Boolean],
		label:"Days (time)",
		optional:false,
	},
	hours:{
		type:[Boolean],
		label:"Hours (time)",
		optional:false,
	},
	awakening:{
		type:Number,
		label:"Awakening",
		optional:false
	},
	actions:{
		type:[String],
		optional:false,
	},
	loggers:{
		type:[String],
		optional:true
	},
	createdOn:{
		type:Date,
		optional:true
	},
	createdBy:{
		type:String,
		optional:true
	},
}));
/**
 * The allow method
 * Here we said what CRUD operation are we going to permit on server side if there is an user logged in
 * you can insert, update or remove.
 */
Schedules.allow({
	insert: function(userId,schedule){
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
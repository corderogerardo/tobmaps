/**
 * Variable to assign and create the Mongo Collection Schedules.
 * @type {Mongo}
 */
Schedules = new Mongo.Collection('schedules');
/**
 * attachSchema: We defined the schedule object that we are going to allow and validate against schema.
 * @type {Object}
 */
Schedules.attachSchema(new SimpleSchema({
	name:{
		type:String,
		label:"name",
		optional:false
	},
	description:{
		type:String,
		label:"description",
		optional:false,
	},
	days:{
		type:[Boolean],
		optional:false,
	},
	hours:{
		type:[String],
		optional:false,
	},
	awakening:{
		type:Number,
		label:"awakening",
		optional:false
	},
	actions:{
		type:[String],
		optional:false,
	},
	schedulelogged:{
		type:[String],
		label:'Errors',
		optional:true
	},
	createdOn:{
		type:Date,
		label:"createdOn",
		optional:true
	},
	createdBy:{
		type:String,
		label:"UserId",
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
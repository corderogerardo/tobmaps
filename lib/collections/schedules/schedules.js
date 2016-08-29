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
		label:"Days (time)",
		optional:false,
	},
	hours:{
		type:[String],
		label:"Hours (time)",
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
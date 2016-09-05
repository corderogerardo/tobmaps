/**
 * Variable to assign and create the Mongo Collection Loggers.
 * @type {Mongo}
 */
ScheduleLoggers = new Mongo.Collection("loggers");
/**
 * attachSchema: We defined the loggers object that we are going to allow and validate against schema.
 * @type {Object}
 */
ScheduleLoggers.attachSchema(new SimpleSchema({
	description:{
		type:String,
		min: 8,
		optional:false,
		min: 500
	},
	status:{
		type:Boolean,
		optional:true
	},
	time:{
		type:[Date],
		optional:true
	},
	schedule_id:{
		type:String,
		optional:true
	},
	createdOn:{
		type:Date,
		optional:true
	}
}));
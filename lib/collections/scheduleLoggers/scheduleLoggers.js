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

ScheduleLoggers.allow({
  insert: function(userId, loggers){
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

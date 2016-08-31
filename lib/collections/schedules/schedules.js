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
		type:[String],
		label:"Days (time)",
		allowedValues: ['monday', 'tuesday','wednesday','thurstday','friday','saturday','sunday'],
		optional:false,
		autoform:{
      type:"select2",
      placeholder: 'Lists of Days',
      options: [
        {label: "Monday", value: "monday"},
        {label: "Tuesday", value: "tuesday"},
        {label: "Wednesday", value: "wednesday"},
        {label: "Thurstday", value: "thurstday"},
        {label: "Friday", value: "friday"},
        {label: "Saturday", value: "saturday"},
        {label: "Sunday", value: "sunday"},
      ]
    }
	},
	hours:{
		type:[String],
		label:"Hours (time)",
		optional:false,
		autoform:{
      type:"select2",
      placeholder: 'Lists of hours',
    }
	},
	awakening:{
		type:Number,
		label:"awakening",
		optional:false
	},
	actions:{
		type:[String],
		label:"Actions (Bots)",
		optional:false,
		autoform:{
      type:"select2",
      placeholder: 'List of actions',
    }
	},
	whitelist:{
		type:String,
		label:"Lists (White)",
		optional:false,
		autoform:{
      placeholder: 'WhiteList ',
    }
	},
	blacklist:{
		type:String,
		label:"Lists (Black)",
		optional:false,
		autoform:{
      placeholder: 'BlackList ',
    }
	},
	schedulelogged:{
		type:[String],
		label:'Errors',
		optional:true,
		autoform:{
      type:"select2",
      placeholder: 'Comma spaced list of occupations',
    }
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
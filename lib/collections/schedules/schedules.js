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
		label:"Name",
		optional:false
	},
	description:{
		type:String,
		label:"Description",
		optional:false,
	},
	days:{
		type:[String],
		label:"Days (time)",
		autoform:{
			placeholder: 'Lists of Days',
			afFieldInput:{
				type:"select",
				multiple:"multiple",
				class:"chosen-select"
			},
			options: [
			{label: "Monday", value: "monday"},
			{label: "Tuesday", value: "tuesday"},
			{label: "Wednesday", value: "wednesday"},
			{label: "Thurstday", value: "thurstday"},
			{label: "Friday", value: "friday"},
			{label: "Saturday", value: "saturday"},
			{label: "Sunday", value: "sunday"},
			]
		},
		optional:false,
	},
	hours:{
		type:[String],
		label:"Hours (time)",
		optional:false,
		autoform:{
			placeholder: 'Lists of hours',
			afFieldInput:{
				type:"select",
				multiple:"multiple",
				class:"chosen-select"
			},
		}
	},
	awakening:{
		type:Number,
		label:"Awakening",
		optional:false
	},
	actions:{
		type:String,
		label:"Actions (Bots)",
		optional:false,
		autoform:{
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
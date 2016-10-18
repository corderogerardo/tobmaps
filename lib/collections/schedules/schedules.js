/**
 * @global
 * @name  Schedules
 * @locus lib/collections/schedules
 *
 * @summary    Constructor for Schedules Collection
 * Variable to assign and create the Mongo Collection Schedules.
 * attachSchema: We defined the schedule object.
 *
 */
 Schedules = new Mongo.Collection('schedules');
 Schedules.attachSchema(new SimpleSchema({
	name:{
		type:String,
		label:"Name",
		optional:false
	},
	description:{
		type:String,
		label:"Description",
		autoform: {
			rows: 5
		},
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
	state:{
		type:Boolean,
		label:"State",
		optional:true
	}
 }));
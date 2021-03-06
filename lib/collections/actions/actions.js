/**
 * @global
 * @name  Actions
 * @locus lib/collections/actions
 *
 * @summary  ActionsCollection - Constructor for Actions Collection
 * Variable to assign and create the Mongo Collection Actions.
 *
 * @param {Instance} SimpleSchema
 * Actions.attachSchema We defined the action object.
 *
 */

 Actions = new Mongo.Collection("actions");
 Actions.attachSchema(new SimpleSchema({
	name:{
		type:String,
		label:"Name",
		max:200,
		optional:false
	},
	actions: {
		type: [String],
		label: "Definable Actions",
		optional:false,
		autoform:{
			placeholder: 'Definable Actions',
			afFieldInput:{
				type:"select",
				multiple:"multiple",
				class:"chosen-select"
			}
		}
	},
	description:{
		type: String,
		label: "Description",
		max:500,
		optional:false
	},
	isp:{
		type: String,
		allowedValues: ['all', 'outlook','yahoo','gmail','aol'],
		autoform: {
			options: [
			{label: "All", value: "all"},
			{label: "Outlook", value: "outlook"},
			{label: "Yahoo", value: "yahoo"},
			{label: "Gmail", value: "gmail"},
			{label: "AOL", value: "aol"}
			]
		},
		optional:false
	},
	createdOn: {
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
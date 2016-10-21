/**
 * @global
 * @name  Lists
 * @locus lib/collections/lists
 *
 * @summary   ListsCollection Constructor for Lists Collection
 * Variable to assign and create the Mongo Collection Lists.
 * @param {Instance} SimpleSchema
 * Lists.attachSchema We defined the list object.
 */

Lists = new Mongo.Collection("lists");
Lists.attachSchema(new SimpleSchema({
	listname:{
		type:String,
		label:"List name",
		max:200,
		optional:false
	},
	typelist: {
		type: String,
		allowedValues: ['whiteList', 'blackList'],
		autoform: {
			options: [
			{label: "White List", value: "whiteList"},
			{label: "Black List", value: "blackList"}
			]
		},
		optional:false
	},
	domains: {
		type: [String],
		label:"Domains",
		optional:false,
		autoform:{
			placeholder: 'List of Domains',
			afFieldInput:{
				type:"select",
				multiple:"multiple",
				class:"chosen-select"
			}
		}
		},
		createdOn: {
			type:Date,
			optional:true
		},
		createdBy: {
			type:String,
			optional:true
		}
}));
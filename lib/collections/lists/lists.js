/**
 * Variable to assign and create the Mongo Collection Domains.
 * @type {Mongo}
 */

Lists = new Mongo.Collection("lists");

/**
 * attachSchema: We defined the domain object that we are going to allow and validate against schema.
 * @type {Object}
 */

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
				class:"chosen-select2"
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
/**
 * @summary    Constructor for Domains Collection
 * Variable to assign and create a new instance Mongo Collection Domains.
 * @type {Mongo}
 */

 Domains = new Mongo.Collection("domains");

/**
 * attachSchema: We defined the domain object that we are going to allow and validate against schema.
 * @type {Object}
 */

 Domains.attachSchema(new SimpleSchema({
	domain:{
		type:String,
		label:"Domain name",
		max:200,
		autoform: {
			afFieldInput: {
				type: 'textarea',
				rows: 5
			}
		},
		optional:false
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
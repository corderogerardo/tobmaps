/**
 * @global
 * @name  Domains
 * @locus lib/collections/domains
 *
 * @summary   DomainsCollection Constructor for Domains Collection
 * Variable to assign and create a new instance Mongo Collection Domains.
 *
 * @param {Instance} SimpleSchema
 * Domains.attachSchema We defined the action object.
 *
 */

Domains = new Mongo.Collection("domains");
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
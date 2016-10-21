/**
 * @global
 * @name  Proxies
 * @locus lib/collections/proxies
 *
 * @summary    Constructor for Proxy Collection
 * Variable to assign and create the Mongo Collection Proxy.
 *
 * @param {Instance} SimpleSchema
 * Proxies.attachSchema We defined the action object.
 */
 Proxies = new Mongo.Collection('proxies');
 Proxies.attachSchema(new SimpleSchema({
	name:{
		type:String,
		label:"Name",
		optional:false
	},
	ip:{
		type:String,
		label:"IP",
		optional:false
	},
	port:{
		type:String,
		label:"Port",
		optional:false
	},
	type:{
		type: String,
		allowedValues: ['auto','http', 'socks5','system','none'],
		autoform: {
			options: [
			{label: "auto", value: "auto"},
			{label: "http", value: "http"},
			{label: "socks5", value: "socks5"},
			{label: "system", value: "system"},
			{label: "none", value: "none"},
			]
		},
		optional:false
	},
	user:{
		type:String,
		label:"Username",
		optional:true
	},
	pass:{
		type:String,
		label:"Password",
		optional:true
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
/**
 * @summary    Constructor for Proxy Collection
 * Variable to assign and create the Mongo Collection Proxy.
 * @type {Mongo}
 */
 Proxies = new Mongo.Collection('proxies');
/**
 * attachSchema: We defined the Proxy object that we are going to allow and validate against schema.
 * @type {Object}
 */
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
		allowedValues: ['http', 'socks5','none'],
		autoform: {
			options: [
			{label: "http", value: "http"},
			{label: "socks5", value: "socks5"},
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
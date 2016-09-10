/**
 * Variable to assign and create the Mongo Collection Actions.
 * @type {Mongo}
 */

 Actions = new Mongo.Collection("actions");

/**
 * attachSchema: We defined the bot object that we are going to allow and validate against schema.
 * @type {Object}
 */

 Actions.attachSchema(new SimpleSchema({
	name: {
		type: String,
		label: "Name: If theis actions is for one specific ISP, please write it here.",
		allowedValues: ['moveInboxAction', 'moveSpamAction','unsubscribeAction','multipleAccountsSendEmailAction'],
		autoform: {
			options: [
			{label: "Move from spam to inbox according to a white lists of domains.", value: "moveInboxAction"},
			{label: "Move from inbox to spam according to a black lists of domains.", value: "moveSpamAction"},
			{label: "Open all emails on inbox click over all the links except if exists one with unsubscribe Text.", value: "unsubscribeAction"},
			{label: "Open many emails and send many emails messages Test purposes.", value: "multipleAccountsSendEmailAction"},
			]
		},
		optional:false
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
	typelist: {
		type: String,
		allowedValues: ['all','whiteList', 'blackList'],
		autoform: {
			options: [
			{label: "White & Black", value: "all"},
			{label: "White List", value: "whiteList"},
			{label: "Black List", value: "blackList"}
			]
		},
		optional:false
	},
	createdOn: {
		type:Date,
		label:"createdOn",
		optional:true
	},
 }));
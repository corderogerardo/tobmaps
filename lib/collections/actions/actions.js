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
    label: "Name: If this actions is for one specific ISP, please write it here.",
    max: 200,
    optional:false
  },
  description:{
    type: String,
    label: "Description",
    max: 1000,
    optional:false
  },
  isp:{
    type: String,
    label: "ISP. Example: All, outlook, yahoo, gmail",
    max: 1000,
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
   createdOn: {
    type:Date,
    label:"createdOn",
    optional:true
  },
}));
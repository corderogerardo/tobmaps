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
    label: "name",
    max: 200,
    optional:false
  },
  description:{
    type: String,
    label: "description",
    max: 1000,
    optional:false
  },
  path:{
    type: String,
    label: "path",
    max: 1000,
    optional:false
  },
   createdOn: {
    type:Date,
    label:"createdOn",
    optional:true
  },
}));
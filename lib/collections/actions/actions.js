/**
 * Variable to assign and create the Mongo Collection Actions.
 * @type {Mongo}
 */

var Actions = new Mongo.Collection("actions");

/**
 * attachSchema: We defined the bot object that we are going to allow and validate against schema.
 * @type {Object}
 */

Actions.attachSchema(new SimpleSchema({
  name: {
    type: String,
    label: "Action",
    max: 200,
    optional:false
  },
  description:{
    type: String,
    label: "Description",
    max: 1000,
    optional:false   
  }, 
  path:{
    type: String,
    label: "Path",
    max: 1000,
    optional:false   
  },
  schedules:{
    type:[String],
    optional:false
  },
}));

/**
 * The allow method
 * Here we said what CRUD operation are we going to permit on server side if there is an user logged in
 * you can insert, update or remove.
 */

Actions.allow({
  insert: function(userId, account){
    if(Meteor.user()){
      return true;
    }else{
      return false;
    }
  },
  remove: function(){
    if(Meteor.user()){
      return true;
    }else{
      return false;
    }
  }
});
/**
 * Variable to assign and create the Mongo Collection Domains.
 * @type {Mongo}
 */

Domains = new Mongo.Collection("domains");

/**
 * attachSchema: We defined the domain object that we are going to allow and validate against schema.
 * @type {Object}
 */

Domains.attachSchema(new SimpleSchema({
  type: {
    type: String,
    allowedValues: ['yahoo.com', 'gmail.com', 'outlook.com', 'aol.com'],
    autoform: {
      options: [
        {label: "Yahoo", value: "yahoo.com"},
        {label: "Gmail", value: "gmail.com"},
        {label: "Outlook", value: "outlook.com"},
        {label: "AOL", value: "aol.com"}
      ]
    },
    optional:false
  },
  list: {
    type: String,
    allowedValues: ['whiteList', 'blackList'],
    autoform: {
      options: [
        {label: "White List", value: "whiteList"},
        {label: "BlackList", value: "blackList"}
      ]
  },
    optional:false
  },
  schedule_id: {
    type: String,
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

/**
 * The allow method
 * Here we said what CRUD operation are we going to permit on server side if there is an user logged in
 * you can insert, update or remove.
 */

Domains.allow({
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
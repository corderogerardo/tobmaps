// this collection stores all the comments
Bots = new Mongo.Collection("bots");


// set up a schema controlling the allowable 
// structure of bots objects
Bots.attachSchema(new SimpleSchema({
  action: {
    type: String,
    label: "Action",
    max: 200
  },
  description:{
    type: String,
    label: "Description",
    max: 1000   
  },
  typeDomain:{
    type: String,
    label: "Type Domain",
    max: 1000   
  }, 
  path:{
    type: String,
    label: "Path",
    max: 1000   
  },
}));
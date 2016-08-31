Meteor.methods({
	 addAction:function(doc,userId){
      if(this.userId){
      	doc.createdOn = new Date();
  	    return Actions.insert(doc);
     }
    }
});
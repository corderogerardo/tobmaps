/**
 * @summary    Meteor Server Side Methods for Proxies Module
 * addProxy: Method used to insert new proxies, first we check if there is an user logged in, if does then check the data integrity that comes from the form object if pass validations then insert action.
 * @param      {User Object} userId from logged user
 * @param      {Proxy Object} from the Proxy Form
 * @return {Boolean} Return true if the proxy was inserted correctly, false if does not.
 *
 * removeProxy: Method used to remove proxies, first we check if there is an user logged in, if does then check the data integrity that comes from the form object if pass validations then Delete proxy.
 * @param  {String} id of the actual proxy
 * @return {Boolean}    True or False
 */
Meteor.methods({
	addProxy:function(doc){
		// Make sure the user is logged in before inserting a task
		if(!this.userId){
			throw new Meteor.Error('not-authorized');
		}
		if(this.userId){
			check(doc.name,String);
			check(doc.ip,String);
			check(doc.port,String);
			check(doc.type,String);
			doc.createdOn = new Date();
			doc.createdBy = this.userId;
			return Proxies.insert(doc);
		}
	},
	updateProxy:function(doc){
		// Make sure the user is logged in before inserting a task
		if(!this.userId){
			throw new Meteor.Error('not-authorized');
		}
		if(this.userId){
			var proxyFind = Proxies.findOne({name:doc.name});
			// Check() for checking integrity type of data that comes from form client.
			check(proxyFind._id,String);
			check(doc.name,String);
			check(doc.ip,String);
			check(doc.port,String);
			check(doc.type,String);
				return Proxies.update(proxyFind._id,{$set:{
					name:doc.name,
					description:doc.description,
					isp:doc.isp,
					typelist:doc.typelist,
					createdOn:new Date(),
				}});
		}
		},
		removeProxy: function(id){
			if (! this.userId) {
				throw new Meteor.Error('not-authorized');
			}
			if(this.userId){
				check(id,String);
				return Proxies.remove({_id:id});
			}
		}
});
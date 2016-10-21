/**
 * @memberOf Proxies
 * @name  Methods
 * @locus server/methods/proxies
 * @summary    ProxiesMethods Server side Meteor Method for Proxies
 *
 * Here you will find the methods for:
 * 1. Add new Proxies-addProxy.
 * 2. Update Proxies-updateProxy.
 * 3. Remove Proxies-removeProxy.
 *
 * @param {MeteorMethod} addProxy
 * Method used to insert new proxies, first we check if there is an user logged in, if does then check the data integrity that comes from the form object if pass validations then insert action.
 * @param      {String} userId
 * userId from logged user
 * @param      {Object} formProxy
 * from the Proxy Form Template.
 * @return {Boolean} Return true if the proxy was inserted correctly, false if does not.
 *
 * @param {MeteorMethod} removeProxy
 * Method used to remove proxies, first we check if there is an user logged in, if does then check the data integrity that comes from the form object if pass validations then Delete proxy.
 * @param  {String} id of the actual proxy
 * @return {Boolean}    True or False
 *
 * @param {MeteorMethod} check()
 * from Meteor is used to validate data integrity and be sure that the data type is the same from the collection.
 *
 *
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
/**
 * @summary    Meteor Server Side Methods for Domains Module
 * insertDomain: Method used to insert new actions, first we check if there is an user logged in, if does then check the data integrity that comes from the form object if pass validations then insert Domain.
 * @param      {User Object} userId from logged user
 * @param      {Domain Object} from the Domain Form
 * @return {Boolean} Return true if the Domain was inserted correctly, false if does not.
 *
 * removeDomain: Method used to remove Domains, first we check if there is an user logged in, if does then check the data integrity that comes from the form object if pass validations then Delete Domain.
 * @param  {String} id of the actual Domain
 * @return {Boolean} Return true if the Domain was inserted correctly, false if does not.
 */
Meteor.methods({
	insertDomain:function(domf){
		if(!this.userId){
			throw new Meteor.Error('not-authorized');
		}
		if(this.userId){
			var user = this.userId;
			var domains = domf.domain.replace(/\s/g,"").split(",");
			domains.forEach(function (domain) {
				var dom;
				if(/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(domain)){
					dom = Domains.find({
						$or:[{
						domain:domain,
						createdBy:user
						}]
					},{skip: 0, limit: 1}).map(function(c){
			return {domain:c.domain, domain:c.domain}
		});
					console.log(dom.length);
					console.log(domain);
					console.log(/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(domain));
				}
				if(/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(domain) && dom.length===0){
					/*console.log("Is valid? "+ /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(domain));*/
					check(domain,String);
					var domin = {
						domain:domain,
						createdOn:new Date(),
						createdBy:user,
					};
					/*console.log(domin);*/
					return Domains.insert(domin);
				}
			});
			return true;
		}
	},
	updateDomain:function(doc){
		console.log(arguments);
		if(!this.userId){
			throw new Meteor.Error('not-authorized');
		}
		if(this.userId){
			var domainFind = Domains.findOne({domain:doc.domain});
			check(domainFind._id,String);
			check(doc.domain,String);
			return Domains.update(domainFind._id,{$set:{
				domain:doc.domain,
			}});
		}
	},
	removeDomain:function(domid){
		if(!this.userId){
			throw new Meteor.Error('not-authorized');
		}
		if(this.userId){
			check(domid,String);
			var domain = Domains.findOne({
				_id:domid
			}).domain;
			var domainList = Lists.findOne({
				domains:domain
			});
			if(domainList){
				throw new Meteor.Error('The Domain can not be deleted because is been used in Lists.');
			}
			return Domains.remove(domid);
		}
	}
});
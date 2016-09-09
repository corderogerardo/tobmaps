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
					dom = Domains.findOne({
						domain:domain
					});
				}
				if(/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(domain) && !dom){
					/*console.log("Is valid? "+ /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(domain));*/
					check(domain,String);
					var domin = {
						domain:domain,
						createdOn:new Date(),
						createdBy:user,
					};
					/*console.log(domin);*/
					return  Domains.insert(domin);
				}
			});
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
			return Domains.remove(domid);
		}
	}
});
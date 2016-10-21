/**
 * @memberOf Proxies
 * @name  proxyForm-Hooks
 * @locus client/view/proxies/create
 *
 * @summary Object for AutoForm Hooks of proxyForm
 *
 * @param  {var} hooksProxies
 * I listen for submit event of a form,
 * then I iterate over the selected items the (tags) get
 * their order, after that create an array with t
 * he real order position that where selected the actions,
 *  and update the object with the real actions positions.
 *  Finally I call the meteor method to pass the form object(insertDoc), if there are no errors send a
 *  success message to user, if there are errors send an error message
 *
 * @param {AutoForm.hooks} proxyForm
 */
var hooksProxies = {
	onSubmit:function(insertDoc){
		Meteor.call('addProxy',insertDoc, function(error,result){
			if(error){
				toastr.error('Hi '+Meteor.user().emails[0].address+'. '+err,'Proxy could not be saved!');
			}
			if(result){
				toastr.success('Hi '+Meteor.user().emails[0].address+'. You have saved a Proxy.','Proxy saved!');
			}
		});

		$('#proxyForm').trigger('reset');
		$('#proxyForm > button[type="submit"]').removeAttr('disabled');
		return false;
	}
};
AutoForm.hooks({
	proxyForm:hooksProxies
});

/**
 * @memberOf Domains
 * @name  domainsForm-Hooks
 * @locus client/view/domains/create
 * @summary Object for AutoForm Hooks of domainsForm
 *
 * @param  {var} hooksDomains
 * Listen for submit event of a form,
 * We call the meteor method to pass the form object(insertDoc), if there are no errors send a
 * success message to user, if there are errors send an error message
 *
 * @param {AutoForm.hooks} domainsForm
 * Meteor AutoForm Hooks for domainsForm form
 * domainsForm is the form and the hooksDomains is the
 * object create before this.
 */
var hooksDomains = {
	onSubmit:function(insertDoc){
		Meteor.call('insertDomain',insertDoc, function(error,result){
			if(error){
				toastr.error('Hi '+Meteor.user().emails[0].address+'. '+err,'Domains could not be saved!');
			}
			if(result){
				toastr.success('Hi '+Meteor.user().emails[0].address+'. You have saved some domains.','Domains saved!');

			}
		});
		$('#domainsForm').trigger('reset');
		$('#domainsForm > button[type="submit"]').removeAttr('disabled');
		return false;
	}
};
/**

 */
AutoForm.hooks({
	domainsForm:hooksDomains
});

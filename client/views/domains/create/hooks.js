/**
 * @summary Object for AutoForm Hooks of domainsForm
 *
 * [hooksObjects
 * We listen for submit event of a form,
 *  We call the meteor method to pass the form object(insertDoc), if there are no errors send a
 *  success message to user, if there are errors send an error message]
 * @type {Object}
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
 * @summary Meteor AutoForm Hooks for domainsForm form
 * [domainsForm is the form and the hooksDomains is the
 * object create before this.]
 * @type {Objectd}
 */
AutoForm.hooks({
	domainsForm:hooksDomains
});

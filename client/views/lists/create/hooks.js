/**
 * @memberOf Lists
 * @name  listsForm-Hooks
 * @locus client/view/lists/create
 * @summary Object for AutoForm Hooks of listsForm
 *
 * @param  {var} hooksLists
 * Listen for submit event of a form,
 * then we iterate over the selected items the (tags) get
 * their order, after that create an array with the real order position that where selected the lists,
 * and update the object with the real lists positions.
 * Finally we call the meteor method to pass the form object(insertDoc), if there are no errors send a
 * success message to user, if there are errors send an error message
 *
 * @param {AutoForm.hooks} listsForm
 * Meteor AutoForm Hooks for listsForm form
 * listsForm is the form and the hooksLists is the
 * object create before this.
 *
 */
var hooksLists = {
	onSubmit:function(insertDoc){
		Meteor.call('insertList',insertDoc, function(error,result){
			if(error){
				toastr.error('Hi '+Meteor.user().emails[0].address+'. '+err,'List could not be saved!');
			}
			if(result){
				toastr.success('Hi '+Meteor.user().emails[0].address+'. You have saved a list.','List saved!');

			}
		});
		$('.chosen-select').val('').trigger('chosen:updated');
		$('#listsForm').trigger('reset');
		$('#listsForm > button[type="submit"]').removeAttr('disabled');
		return false;
	}
};
/**

 * @type {[type]}
 */
AutoForm.hooks({
	listsForm:hooksLists
});

/**
 * @global
 * @memberOf Actions
 * @name  -HooksforActionForm
 * @summary Object for AutoForm Hooks of actionForm template.
 *
 * hooksObjects
 * I listen for submit event of a form,
 * then I iterate over the selected items the (tags) get
 * their order, after that create an array with t
 * he real order position that where selected the actions,
 * and update the object with the real actions positions.
 * Finally I call the meteor method to pass the form object(insertDoc), if there are no errors send a
 * success message to user, if there are errors send an error message
 *
 * Meteor AutoForm Hooks for actionForm form
 * actionForm is the form and the hooksActions is the
 * object create before this.
 */
var hooksActions = {
	onSubmit:function(insertDoc){
		var values = [];
		$('.search-choice > a').each(function(index,value){
			values.push($(value).attr('data-option-array-index'));
		});
		var realactions = [];
		for(var i=0;i<values.length;i++){
			realactions.push(insertDoc.actions[values[i]]);
		}
		insertDoc.actions=realactions;
		Meteor.call('addAction',insertDoc, function(error,result){
			if(error){
				toastr.error('Hi '+Meteor.user().emails[0].address+'. '+err,'Action could not be saved!');
			}
			if(result){
				toastr.success('Hi '+Meteor.user().emails[0].address+'. You have saved an action.','Action saved!');

			}
		});
		$('.chosen-select').val('').trigger('chosen:updated');
		$('#actionForm').trigger('reset');
		$('#actionForm > button[type="submit"]').removeAttr('disabled');
		return false;
	}
};
AutoForm.hooks({
	actionForm:hooksActions
});

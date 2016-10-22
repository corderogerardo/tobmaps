/**
 * @memberof Schedules
 * @name  schedulesForm-Hooks
 * @locus client/view/schedule/create
 * @summary Object for Hooks of form schedulesForm
 *
 * @param  {var} hooksSchedule
 * I listen for submit event of a form,
 * then I iterate over the selected items the (tags) get
 * their order, after that create an array with t
 * he real order position that where selected the actions,
 *  and update the object with the real actions positions.
 *  Finally I call the meteor method to pass the form object(insertDoc), if there are no errors send a
 *  success message to user, if there are errors send an error message]
 *
 *	@param {AutoForm.hooks} schedulesForm
 * Meteor AutoForm Hooks for schedulesForm form
 * schedulesForm is the form and the hooksObjects is the
 * object create before this.
 */
var hooksSchedule = {
	onSubmit:function(insertDoc){
		console.log(insertDoc);
		Meteor.call('insertSchedule',insertDoc, function(error,result){
			if(error){
				toastr.error('Hi '+Meteor.user().emails[0].address+'. '+err,'Schedule could not be saved!');
			}
			if(result){
				toastr.success('Hi '+Meteor.user().emails[0].address+'. You have saved a Schedule.','Schedule saved!');

			}
		});
		$('.chosen-select').val('').trigger('chosen:updated');
		$('#schedulesForm').trigger('reset');
		$('#schedulesForm > button[type="submit"]').removeAttr('disabled');
		return false;
	},
};
/**

 */
AutoForm.hooks({
	schedulesForm:hooksSchedule
});
